from mongoengine import (
    Document, StringField, ReferenceField, DateTimeField, 
    ListField, DictField
)
from datetime import datetime
from bson import ObjectId


# User Model
class User(Document):
    id = StringField(primary_key=True, default=lambda: str(ObjectId()))
    name = StringField(required=True)
    email = StringField(required=True)
    phone = StringField(required=True)
    password = StringField(required=True)
    created_at = DateTimeField(default=datetime.now)
    updated_at = DateTimeField()


# ImageRecord Model
class ImageRecord(Document):
    id = StringField(primary_key=True, default=lambda: str(ObjectId()))
    user_id = ReferenceField(User)  # Reference to the User document
    filename = StringField(required=True)
    score = StringField(required=True)
    emotions = DictField()  # Store emotions as a dictionary
    created_at = DateTimeField(default=datetime.now)
    updated_at = DateTimeField()

# Response Model
class Response(Document):
    id = StringField(primary_key=True, default=lambda: str(ObjectId()))
    user_id = ReferenceField(User)  # Reference to the User document
    mental_state = StringField(required=True)
    confidence_score = StringField(required=True)
    created_at = DateTimeField(default=datetime.now)
    updated_at = DateTimeField()