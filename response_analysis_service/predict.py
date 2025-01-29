from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np



MAX_SEQUENCE_LENGTH = 100  # Use same length as training

label_map = {
0: 'Personality disorder',
1: 'Bipolar',
2: 'Depression',
3: 'Anxiety',
4: 'schizophrenia',
5: 'mentalillness',
6: 'Stress',
7: 'Suicidal',
8: 'Normal'
}


# Prediction function with try-except for error handling
def predict_text_class(sequence, model):
    # Pad sequence to the required length
    padded_sequence = pad_sequences(sequence, maxlen=MAX_SEQUENCE_LENGTH, padding='post', truncating='post')

    # Make prediction
    prediction = model.predict(padded_sequence)

    # Get predicted class and probability
    predicted_class = int(np.argmax(prediction, axis=1)[0])
    probability = float(np.max(prediction))  # Convert to standard Python float

    return {"mental_state": label_map[predicted_class], "confidence": round(probability * 100, 2)}

