import mongoose from 'mongoose';

const emotionRecordSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
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
const emotionRecord = mongoose.model('emotion_records', emotionRecordSchema);

export default emotionRecord;