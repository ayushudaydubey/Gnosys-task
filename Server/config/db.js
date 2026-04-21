import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
          tls: true,

    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB Error:", error.message);

  }
};

export default connectDB;