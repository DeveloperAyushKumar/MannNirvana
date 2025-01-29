from datasets import load_dataset

def fetch_data():
    # Load only the train split
    train_dataset = load_dataset("Kanakmi/mental-disorders", split="train")

    # Extract only the "text" column
    texts = train_dataset["text"]
    return texts


