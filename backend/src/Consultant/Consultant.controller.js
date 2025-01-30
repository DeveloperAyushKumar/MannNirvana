import Consultant from "./Consultant.model.js";
const getAllConsultants = async (req, res) => {
    try {
        const consultants = await Consultant.find();
        res.status(200).json( consultants );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getConsultant = async (req, res) => {
    try {
        const consultant = await Consultant.findById(req.params.id);
        if (!consultant) {
            return res.status(404).json({ message: "Consultant not found" });
        }
        res.status(200).json( consultant );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const createConsultant = async (req, res) => {
    try {
        const consultant = new Consultant(req.body);
        await consultant.save();
        res.status(201).json( consultant );
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
export { createConsultant,getAllConsultants, getConsultant };