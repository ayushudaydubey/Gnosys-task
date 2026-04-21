import roundsModel from "../models/round.model.js";
import { updateFinalEvaluation } from "../services/evaluationService.js";


export const submitRound = async (req, res) => {
  const { candidateId, type, feedback, rating ,aiScore} = req.body;

  const round = await roundsModel.create({
    candidate: candidateId,
    type,
    feedback,
    rating,
    aiScore
  });


  await updateFinalEvaluation(candidateId);

  res.json({
    success: true,
    data: round,
  });
};