from deepface import DeepFace

# Analyze emotions in the image
def analyze_emotions(image_path: str) -> dict:
    analysis = DeepFace.analyze(img_path=image_path, actions=["emotion"])
    
    # Since analyze returns a list, we take the first element of the list.
    emotions = analysis[0]["emotion"]
    
    # Now emotions is a dictionary, and we can return it directly.
    return emotions

# Compute a score based on emotions
def compute_score(emotions: dict) -> float:
    # Example scoring: Assign higher weights to positive emotions
    score = (
        emotions.get("happy", 0) * 0.5
        + emotions.get("neutral", 0) * 0.3
        - emotions.get("sad", 0) * 0.2
        - emotions.get("angry", 0) * 0.3
    )
    
    return float(round(max(0, score), 2))  # Ensure score is non-negative
