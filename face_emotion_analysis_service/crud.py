from database import database

image_collection = database["image_records"]

# Create a new record
async def create_image_record(record: dict) -> str:
    result = await image_collection.insert_one(record)
    return str(result.inserted_id)
