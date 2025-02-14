import axios from "axios";
import emotionRecord from "./emotion.model.js";

const CHATBOT_URL = process.env.CHATBOT_URL

const getResponse = async(req, res) => {
    const user_id  = req.body.user_id; 
    const text = req.body.text;

    try {
        const response = await axios.post(`${CHATBOT_URL}/generate-response/`, {
            user_id: user_id,
            text: text
        });

        const emotion = await axios.post(`${CHATBOT_URL}/analyze-text/`, {
            user_id: user_id,
            text: text
        });

        const newRecord = await emotionRecord.create({
            user_id: user_id,
            score: emotion.data.response.score,
            emotions: emotion.data.response.sentiment
        });

        res.status(200).json({ message: 'Emotions fetched successfully', response: response.data.response})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching top records.' });
    }
}

const getAllemotions = async(req, res) => {
    const user_id  = req.body.user_id; 

    try {
        const emotions = await emotionRecord.find({user_id: user_id}).sort({created_at: -1}).limit(100);

        res.status(200).json({ message: 'Emotions fetched successfully', emotions: emotions})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching top records.' });
    }
}

export { getResponse, getAllemotions };