import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Grow-Xcd",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

const fileFilter = (req, file, cb) => {
  if (!["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)) {
    return cb(new Error("File is not an image"));
  }
  return cb(null, true);
};

const singleUpload = multer({ storage, fileFilter }).single('image');

const uploadSingleImage = (req, res, next) => {
  singleUpload(req, res, (err) => {
    if (err) {
      console.error(err);
      if (err.message === "File is not an image") {
        return res.status(400).json({ error: 'Selected file is not an image' });
      }
      return res.status(500).json({ error: 'An error occurred during file upload' });
    }
    return next();
  });
};

export { uploadSingleImage };