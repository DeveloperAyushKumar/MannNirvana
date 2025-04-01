from textblob import TextBlob
from nltk.sentiment import SentimentIntensityAnalyzer
import nltk
import os
import uvicorn
import nest_asyncio
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from fastapi.responses import JSONResponse
from datetime import datetime
from pydantic import BaseModel

# Download required NLTK data
nltk.download('vader_lexicon')

# Initialize Sentiment Analyzer
sia = SentimentIntensityAnalyzer()

def analyze_sentiment(text: str):
    """Analyzes the sentiment of a given text using VADER and TextBlob."""
    vader_score = sia.polarity_scores(text)['compound']
    blob = TextBlob(text)
    textblob_score = blob.sentiment.polarity
    final_score = (vader_score + textblob_score) / 2
    
    if final_score > 0.05:
        sentiment = "Positive"
    elif final_score < -0.05:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"

    return {"sentiment": sentiment, "score": final_score}

# Load environment variables
load_dotenv()

PORT = int(os.getenv("PORT", "5000"))
SESSION_EXPIRY = int(os.getenv("SESSION_EXPIRY", "3600"))

# Apply the asyncio patch
nest_asyncio.apply()

# Initialize FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextRequest(BaseModel):
    user_id: str
    text: str

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Sentiment Analysis API!"}

@app.post("/analyze-text")
async def analyze_text(request: TextRequest):
    try:
        text = request.text
        response = analyze_sentiment(text)
        
        # Log response
        timestamp = datetime.now().isoformat()
        record = {
            "user_id": request.user_id,
            "text": text,
            "response": response,
            "created_at": timestamp,
        }
        return JSONResponse(status_code=200, content={"response": response})
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing text: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=PORT)