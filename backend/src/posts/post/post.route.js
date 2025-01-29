import express from "express";
import { commentPost, createPost, deletePost, editPost, getAllPost, getPost, likePost } from "./post.controller.js";

const router =express.Router();

// posting a post
router.route("/").post(createPost)


// get a post
router.route("/:id").get(getPost)
// edit a post
router.route("/:id").put(editPost)

// delete a post
router.route("/:id").delete(deletePost)

// get all post
router.route("/").get(getAllPost)
//add comment
router.route("/comment/:id").post(commentPost)
// like a post
router.route("/like/:id").post(likePost)

export default router;