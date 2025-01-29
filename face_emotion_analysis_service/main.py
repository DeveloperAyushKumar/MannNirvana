import os
import shutil
import uvicorn
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from crud import create_image_record
from emotion_recognition import analyze_emotions, compute_score
from utils import generate_unique_filename
from dotenv import load_dotenv
from bson import ObjectId
os.environ["CUDA_VISIBLE_DEVICES"] = "-1" 

load_dotenv()

PORT = int(os.getenv("PORT", "5000"))

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

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/analyse-image/")
async def analyze_image(file: UploadFile = File(...),
    user_id: str = Form(...)):
    # Check if file is received
    if not file:
        raise HTTPException(status_code=400, detail="No file uploaded")

    # Check the file type (optional, e.g., check for image file)
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file is not an image")

    # Save the file to disk
    unique_filename = generate_unique_filename(file.filename)
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    try:
        with open(file_path, "wb") as f:
            shutil.copyfileobj(file.file, f)
        print(f"File saved to {file_path}")
        
        # Analyze emotions
        emotions = analyze_emotions(file_path)
        print("Emotions detected:", emotions)
        
        # Convert numpy float32 values to Python float
        emotions = {key: float(value) for key, value in emotions.items()}

        if not isinstance(emotions, dict):
            raise ValueError("Emotions analysis did not return a dictionary.")

        score = compute_score(emotions)
        max_emotion = max(emotions, key=emotions.get)
        print("Score:", score, type(score))  # Log the score returned

        if not isinstance(score, (int, float)):
            raise ValueError("Score calculation did not return a valid numeric value.")
        
        # Save to database
        timestamp = datetime.now().isoformat()
        record = {
            "filename": file.filename,
            "score": score,
            "user_id": ObjectId(user_id),
            "emotions": max_emotion,
            "created_at": timestamp,
        }

        record_id = await create_image_record(record)
        print(f"Record saved with ID: {record_id}")  # Log the record ID returned

        if not isinstance(record_id, (str, int)):
            raise ValueError("Invalid record ID returned from database.")
        
    except Exception as e:
        print(f"Error occurred: {str(e)}")  # Log the specific error
        raise HTTPException(status_code=400, detail=f"Error processing image: {str(e)}")
    
    finally:
        # Always attempt to delete the file
        if os.path.exists(file_path):
            try:
                os.remove(file_path)
                print(f"File {file_path} removed after processing.")
            except Exception as cleanup_error:
                print(f"Error removing file: {str(cleanup_error)}")  # Log the file removal error
    
    return {"id": record_id, "score": score, "emotions": emotions}

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Emotion Recognition API!"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=PORT)
