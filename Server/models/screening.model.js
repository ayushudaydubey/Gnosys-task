import mongoose from "mongoose";


const screeningSchema = new mongoose.Schema({
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' },
  status: {
    type: String,
    enum: ['Pending', 'Shortlisted', 'Rejected'],
    default: 'Pending'
  },
  remarks: String
});

const screeningModel  = mongoose.model('Screening', screeningSchema);

export default  screeningModel