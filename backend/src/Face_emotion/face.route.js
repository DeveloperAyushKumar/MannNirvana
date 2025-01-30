import express from "express";
import getAllEmotions from "./face.controller.js";

const router =express.Router();

// fetching all emotions
router.route("/").get(getAllEmotions)

export default router;