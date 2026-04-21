import screeningModel from "../models/screening.model.js";

// PUT /api/screening/:candidateId
export const updateScreening = async (req, res) => {
  const { candidateId } = req.params;
  const { status, remarks } = req.body;

  const screening = await screeningModel.findOneAndUpdate(
    { candidate: candidateId },
    { status, remarks },
    { new: true }
  );

  res.json({
    success: true,
    data: screening,
  });
};