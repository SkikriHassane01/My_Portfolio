from flask import Flask, request, jsonify, send_from_directory
import torch
import os
from dotenv import load_dotenv
import requests
from model import load_model
from dataset import load_data
from utils import encode_labels
import random
from flask_cors import CORS
import nltk

nltk.download('punkt')
app = Flask(__name__, static_folder='../FrontEnd/dist', static_url_path='/')
CORS(app)
# Load environment variables
load_dotenv()

# Load the model and data
try:
    patterns, tags, intents = load_data('./Data/intents.json')
    labels, label_encoder = encode_labels(tags)
    tokenizer, model, device = load_model(num_labels=len(set(labels)))
    model_state = torch.load('chatbot_model.pth')
    model.load_state_dict(model_state)
    model.eval()
except FileNotFoundError as e:
    print(f"Error loading files: {e}")
    print("Please make sure all required files are in the correct directory.")
except Exception as e:
    print(f"An error occurred during initialization: {e}")

def query_azure_openai(query):
    api_key = os.getenv('API_KEY')
    endpoint = os.getenv('ENDPOINT')
    headers = {
        "Content-Type": "application/json",
        "api-key": api_key
    }
    payload = {
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": query}
        ],
        "temperature": 0.7,
        "top_p": 0.95,
        "max_tokens": 150
    }
    response = requests.post(endpoint, headers=headers, json=payload)
    if response.status_code == 200:
        data = response.json()
        return data['choices'][0]['message']['content'].strip()
    else:
        return f"Error: {response.status_code}, {response.text}"

def get_intent_response(query):
    encoding = tokenizer.encode_plus(query, add_special_tokens=True, return_tensors='pt', max_length=128, padding="max_length", truncation=True)
    input_ids = encoding['input_ids'].to(device)
    attention_mask = encoding['attention_mask'].to(device)
    
    with torch.no_grad():
        outputs = model(input_ids=input_ids, attention_mask=attention_mask).logits
        predicted_probs = torch.softmax(outputs, dim=1)
        confidence, predicted_class = torch.max(predicted_probs, dim=1)
    
    confidence_threshold = 0.9
    predicted_tag = label_encoder.inverse_transform([predicted_class.item()])[0]
    
    if confidence.item() < confidence_threshold:
        return query_azure_openai(query)
    
    for intent in intents['intents']:
        if intent['tag'] == predicted_tag:
            return random.choice(intent['responses'])
    
    return "Sorry, I don't understand."

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message')
    
    if not user_message:
        return jsonify({"error": "No message provided"}), 400
    
    try:
        response = get_intent_response(user_message)
        return jsonify({"response": response})
    except Exception as e:
        print(f"Error processing message: {e}")
        return jsonify({"error": "An error occurred while processing your message"}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
