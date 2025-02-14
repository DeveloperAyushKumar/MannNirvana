import express from "express";
import getResponse from "./bot.controller.js";

const router =express.Router();

// fetching all emotions
router.route("/generate-response/").post(getResponse);

export default router;