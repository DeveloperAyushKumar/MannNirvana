import mongoose from "mongoose";
const consultantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    about : {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    speciality: {
        type: [String],
        required: true,
        trim: true,
    },
    rating: {
        type: Number,
        
    },
    reviews: {
        type: [String],
        
    },
    
   
}, { timestamps: true });

const Consultant = mongoose.model("Consultant", consultantSchema);
export default Consultant;
