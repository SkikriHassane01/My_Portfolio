"""
    initializes and loads the Hugging Face model (DistilBERT) for text classification.
"""

import torch
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification


def load_model(num_labels):
    tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')
    model = DistilBertForSequenceClassification.from_pretrained('distilbert-base-uncased', num_labels=num_labels)
    
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model.to(device)
    
    return tokenizer, model, device