from database import database

response_collection = database["response_records"]  

# Create a new record
async def create_response_record(record: dict) -> str:
    result = await response_collection.insert_one(record)
    return str(result.inserted_id)
