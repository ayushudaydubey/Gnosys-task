import express from "express";
import { submitRound } from "../controllers/round.controller.js";


const router = express.Router();

// Submit round feedback
router.post("/", submitRound);

export default router;