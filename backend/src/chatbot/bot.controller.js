import emotionRecord from "./emotion.model.js";

const CHATBOT_URL = process.env.CHATBOT_URL
const SENTIMENT_URL = process.env.SENTIMENT_URL

const system = "[System] You are a compassionate and supportive mental health consultant.  - Your goal is to provide emotional support, coping strategies, and encouragement.  - Always respond with empathy and positivity.  - Offer mindfulness techniques, breathing exercises, and self-care suggestions.  - Do NOT diagnose conditions or prescribe medication.  - If the user expresses severe distress, gently recommend professional help. - Try to keep small responses as user is doing converstion with you"

const getResponse = async(req, res) => {
    const user_id  = req.body.user_id; 
    const text = req.body.text;

    try {
        const response = await fetch(`${CHATBOT_URL}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_input: system + text
            })
        });

        const responseData = await response.json();
        // console.log(responseData);
        
        const emotion = await fetch(`${SENTIMENT_URL}/analyze-text/`, {
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