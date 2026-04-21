import mongoose from "mongoose";

const evaluationSchema = new mongoose.Schema({
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' },
  finalScore: Number,
  status: { type: String, enum: ['Selected', 'Rejected'] }
});


const evaluationModel  = mongoose.model('Evaluation', evaluationSchema);

export default  evaluationModel