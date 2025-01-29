from fastapi import FastAPI, HTTPException
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.text import Tokenizer
from fastapi.middleware.cors import CORSMiddleware
from crud import create_response_record
from predict import predict_text_class
from dataset import fetch_data
from dotenv import load_dotenv
from pydantic import BaseModel
from datetime import datetime
from bson import ObjectId
import uvicorn
import os


load_dotenv()
PORT = int(os.getenv("PORT", "5001"))

# Initialize FastAPI
app = FastAPI()

# Allow origins for CORS
origins = ["*"]  # Allow all origins for now

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Load the saved model
MODEL_PATH = "best_model.keras"
model = load_model(MODEL_PATH)
train_dataset = fetch_data()
# Load tokenizer (Ensure this is available)
tokenizer = Tokenizer(num_words=5000, oov_token="<OOV>") 
tokenizer.fit_on_texts(train_dataset)

class TextRequest(BaseModel):
    user_id: str
    text: str

@app.get("/")
def read_root():
    return {"Hello": "World"}

# FastAPI Route
@app.post("/predict/")
async def analyze_text(request: TextRequest):
    try:
        sequence = tokenizer.texts_to_sequences([request.text])
    
        # Handle empty or unknown words case
        if not sequence or not sequence[0]:  
            raise HTTPException(status_code=400, detail="Input text contains only unknown words!")
        
        # Save to database
        timestamp = datetime.now().isoformat()
        result = predict_text_class(sequence, model)
        print(result)
        record = {
            "user_id": ObjectId(request.user_id),
            "mental_state": result["mental_state"],
            "confidence_score": result["confidence"],
            "created_at": timestamp,
        }

        record_id = await create_response_record(record)
        print(f"Record saved with ID: {record_id}")  # Log the record ID returned

        if not isinstance(record_id, (str, int)):
            raise ValueError("Invalid record ID returned from database.")
        
    except Exception as e:
        # Catch any other errors and return them as HTTP exceptions
        raise HTTPException(status_code=500, detail=f"Error during prediction: {str(e)}")
    
    return {"id": record_id, "mental_state": result["mental_state"], "confidence": result["confidence"]}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=PORT)
