import mongoose from 'mongoose';

const imageRecordSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    score: {
        type: String,
        required: true,
    },
    emotions: {
        type: String, 
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

// ImageRecord Model
const ImageRecord = mongoose.model('image_records', imageRecordSchema);

export default ImageRecord;