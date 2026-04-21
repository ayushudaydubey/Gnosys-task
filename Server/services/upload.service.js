import imagekit from "../config/imagekit.js";

export const uploadToImageKit = async (file) => {
  try {
    
    const base64 = Buffer.from(file.buffer).toString('base64')

    const result = await imagekit.upload({
      file: base64,
      fileName: `${Date.now()}-${file.originalname}`,
      folder: '/resumes',
   
      
      useUniqueFileName: true,
    })

    return result.url
  } catch (err) {
    console.error('ImageKit upload error:', err)
    throw err
  }
}