import candidateModel from "../models/candidate.model.js";
import evaluationModel from "../models/evaluation.model.js";
import screeningModel from "../models/screening.model.js";

export const getDashboard = async (req, res) => {
  // Fetch candidates newest first so dashboard shows recent hires first
  const candidates = await candidateModel.find().sort({ createdAt: -1 });

  const data = await Promise.all(
    candidates.map(async (candidate) => {
      const screening = await screeningModel.findOne({ candidate: candidate._id });
      const evaluation = await evaluationModel.findOne({ candidate: candidate._id });

      return {
        name: candidate.name,
        email: candidate.email,
        stage: screening?.status || "Pending",
        score: evaluation?.finalScore || 0,
        status: evaluation?.status || "Pending",
      };
    })
  );

  res.json({ success: true, data });
};