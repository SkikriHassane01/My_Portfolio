from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split


def encode_labels(tags):
    le = LabelEncoder()
    labels = le.fit_transform(tags)
    return labels, le

def split_data(patterns, labels):
    return train_test_split(patterns, labels, test_size = 0.2, random_state=42)