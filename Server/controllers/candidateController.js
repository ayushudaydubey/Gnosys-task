
import candidateModel from "../models/candidate.model.js";
import evaluationModel from "../models/evaluation.model.js";
import roundsModel from "../models/round.model.js";
import screeningModel from "../models/screening.model.js";
import { uploadToImageKit } from "../services/upload.service.js";

// POST /api/candidates
export const createCandidate = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    
    const existingCandidate = await candidateModel.findOne({ email });

    if (existingCandidate) {
      return res.status(400).json({
        success: false,
        message: "Candidate with this email already exists",
      });
    }

  
    let resumeUrl = "";
    if (req.file) {
      resumeUrl = await uploadToImageKit(req.file);
    }

    const candidate = await candidateModel.create({
      name,
      email,
      phone,
      resume: resumeUrl,
    });

   
    await screeningModel.create({
      candidate: candidate._id,
      status: "Pending",
    });

  
    res.json({
      success: true,
      data: candidate,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET /api/candidates
export const getCandidates = async (req, res) => {
  // Return newest candidates first
  const candidates = await candidateModel.find().sort({ createdAt: -1 });

  res.json({
    success: true,
    data: candidates,
  });
};

// GET /api/candidates/:id
export const getCandidateById = async (req, res) => {
  const { id } = req.params;

  const candidate = await candidateModel.findById(id);

  const screening = await screeningModel.findOne({ candidate: id });

  const rounds = await roundsModel.find({ candidate: id });

  const evaluation = await evaluationModel.findOne({ candidate: id });

  res.json({
    candidate,
    screening,
    rounds,
    evaluation,
  });
};

