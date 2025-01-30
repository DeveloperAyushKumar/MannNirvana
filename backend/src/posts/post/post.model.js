import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    // user: { type: Number, required: true }, //dummy for testing 
    authorName :{
        type :String ,
    },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: "User",
    }, 
    image: {
        type: String, // URL or path
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of user IDs who liked the post
    comments: [commentSchema], // Embedded comments array

}, { timestamps: true });

export const Post= mongoose.model("Post", postSchema);
export const Comment= mongoose.model("Comment", commentSchema);
