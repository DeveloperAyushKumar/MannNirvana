import emotionRecord from "./emotion.model.js";

const CHATBOT_URL = process.env.CHATBOT_URL

const getResponse = async(req, res) => {
    const user_id  = req.body.user_id; 
    const text = req.body.text;

    try {
        const response = await fetch(`${CHATBOT_URL}/generate-response/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: user_id,
                text: text
            })
        });

        const responseData = await response.json();
        
        const emotion = await fetch(`${CHATBOT_URL}/analyze-text/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: user_id,
                text: text
            })
        });

        const emotionData = await emotion.json();
        
        const newRecord = await emotionRecord.create({
            user_id: user_id,
            score: emotionData.response.score,
            emotions: emotionData.response.sentiment
        });

        res.status(200).json({ message: 'Emotions fetched successfully', response: responseData.response})
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