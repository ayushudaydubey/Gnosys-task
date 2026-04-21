import imagekit from "../config/imagekit.js";

export const uploadToImageKit = async (file) => {
  const result = await imagekit.upload({
    file: file.buffer, 
    fileName: Date.now() + "-" + file.originalname,
    folder: "/resumes",
  });

  return result.url; 
};