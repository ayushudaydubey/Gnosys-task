import express from "express";
import { upload } from "../middleware/upload.js";
import {
  createCandidate,
  getCandidateById,
  getCandidates,
} from "../controllers/candidateController.js";
import { validateCandidate } from "../middleware/validateCandidate.js";
import { handleValidation } from "../middleware/handleValidation.js";



const router = express.Router();

// ✅ Add Candidate (with validation + file upload)
router.post(
  "/",
  upload.single("resume"),   // file first
  validateCandidate,         // then validate fields
  handleValidation,          // then check errors
  createCandidate            // finally controller
);

// Get all candidates
router.get("/", getCandidates);

// Get candidate details
router.get("/:id", getCandidateById);

export default router;