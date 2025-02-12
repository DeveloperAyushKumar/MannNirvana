import express from "express";
import { verifyToken } from "../../../utils/token.js";
import { 
    commentPost, 
    createPost, 
    deletePost, 
    editPost, 
    getAllPost, 
    getNews, 
    getPost,
    detectHateSpeech, 
    likePost 
} from "./post.controller.js";

const router = express.Router();

// Get news feed (Public)
router.get('/news', getNews);

// Get all posts (Public)
router.get("/", getAllPost);

// Get a single post by ID (Public)
router.get("/:id", getPost);

// Edit a post (Protected)
router.put("/:id", verifyToken, editPost);

// Delete a post (Protected)
router.delete("/:id", verifyToken, deletePost);

// Add a comment to a post (Protected)
router.post("/add-comment/:id", verifyToken, commentPost);

// Like a post (Protected)
router.post("/like-post/:id", verifyToken, likePost);

// Posting a new post (Protected)
router.post("/create-post", verifyToken, createPost);

// Detect Hate speech
router.post("/detect-hate-speech", verifyToken, detectHateSpeech);

export default router;
