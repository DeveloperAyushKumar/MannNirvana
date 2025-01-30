import ImageRecord from './face.model.js'; 

const getAllEmotions = async(req, res) => {
    const user_id  = req.query.user_id; 

    try {
        const topRecords = await ImageRecord.find({ user_id }) 
            .limit(100);  
        if (topRecords.length === 0) {
            return res.status(404).json({ message: 'No records found for this user.' });
        }

        res.status(200).json(topRecords);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching top records.' });
    }
}

export default getAllEmotions;