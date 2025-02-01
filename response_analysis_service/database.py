import motor.motor_asyncio
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB = os.getenv("MONGO_DB")

# MongoDB client
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
database = client[MONGO_DB]

# Function to check the connection
# async def check_connection():
#     try:
#         # Ping the MongoDB server to check connection
#         await client.admin.command('ping')
#         print(f"Connected to MongoDB database: {MONGO_DB} at {MONGO_URI}")
#     except Exception as e:
#         print(f"Error connecting to MongoDB: {e}")

# Run the check_connection function
# asyncio.run(check_connection())

