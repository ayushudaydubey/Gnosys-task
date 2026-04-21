import express from "express";
import { updateScreening } from "../controllers/screening.controller.js";


const router = express.Router();

// Update screening status
router.patch("/:candidateId", updateScreening);

export default router;