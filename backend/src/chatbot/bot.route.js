import express from "express";
import { getResponse, getAllemotions } from "./bot.controller.js";

const router =express.Router();

// fetching all emotions
router.route("/generate-response/").post(getResponse);
router.route("/get-emotion/").post(getAllemotions);

export default router;