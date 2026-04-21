

import roundsModel from "../models/round.model.js";
import evaluationModel from "../models/evaluation.model.js";

export const updateFinalEvaluation = async (candidateId) => {
  const rounds = await roundsModel.find({ candidate: candidateId });

  if (!rounds.length) return;

  // Collect only finite numeric ratings to avoid NaN when some rounds don't have a rating
  const ratings = rounds
    .map((r) => Number(r.rating))
    .filter((v) => Number.isFinite(v));

  if (!ratings.length) {
    // No numeric ratings yet — set finalScore to null and status to Pending
    await evaluationModel.findOneAndUpdate(
      { candidate: candidateId },
      { finalScore: null, status: 'Pending' },
      { upsert: true, returnDocument: 'after' }
    );
    return;
  }

  const total = ratings.reduce((sum, val) => sum + val, 0);
  const avg = total / ratings.length;

  // If avg is not a finite number for any reason, treat as not evaluated
  if (!Number.isFinite(avg)) {
    await evaluationModel.findOneAndUpdate(
      { candidate: candidateId },
      { finalScore: null, status: 'Pending' },
      { upsert: true, returnDocument: 'after' }
    );
    return;
  }

  const status = avg >= 6 ? 'Selected' : 'Rejected';

  await evaluationModel.findOneAndUpdate(
    { candidate: candidateId },
    {
      finalScore: avg,
      status,
    },
    { upsert: true, returnDocument: 'after' }
  );
};