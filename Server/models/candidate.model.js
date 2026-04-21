import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    resume: {
      type: String, 
      required: true,
    },
  },
  { timestamps: true }
);


const candidateModel  = mongoose.model('Candidate', candidateSchema);

export default  candidateModel