import mongoose from "mongoose";


const roundSchema = new mongoose.Schema({
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' },
  type: { type: String, enum: ['HR', 'Technical', 'Task'] },
  feedback: String,
  rating: Number,

  
  aiScore: {
    type: Number,
    default: null
  }
});
const roundModel =  mongoose.model('Round', roundSchema);

export default roundModel