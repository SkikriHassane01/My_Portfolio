import json
from torch.utils.data import Dataset
class IntentDataset(Dataset):
    def __init__(self, patterns, labels, tokenizer):
        self.patterns = patterns
        self.labels = labels  # tags
        self.tokenizer = tokenizer
        
    def __len__(self):
        return len(self.patterns)
    
    # to retrieves a specific item from the dataset based on the index provide
    def __getitem__(self, idx):
        text = self.patterns[idx]
        label = self.labels[idx]
        encoding = self.tokenizer.encode_plus(
            text,
            add_special_tokens = True,
            return_tensors = 'pt',
            max_length =128,
            padding = "max_length",
            truncation = True
        )
        return encoding['input_ids'].squeeze(), encoding['attention_mask'].squeeze(), label
        """
        - encoding['input_ids']: The numerical representation of the tokenized input text
        - encoding['attention_mask']: A mask indicating which tokens should be attended to (1 for actual tokens, 0 for padding).
        """
        
def load_data(intent_file):
    with open(intent_file, 'r') as f:
        intents = json.load(f)
        
    patterns = []
    tags = []
    
    for intent in intents['intents']:
        for pattern in intent['patterns']:
            patterns.append(pattern)
            tags.append(intent['tag'])
            
    return patterns, tags, intents