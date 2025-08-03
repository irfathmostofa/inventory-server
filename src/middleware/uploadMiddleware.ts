import multer from "multer";
import path from "path";
import sharp from "sharp";
import fs from "fs";

// Multer Storage - Save to Memory (buffer)
const storage = multer.memoryStorage();

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG allowed."), false);
  }
};

export const upload = multer({ storage, fileFilter });

// Function to Process Image with Sharp and Save Optimized File
export const optimizeAndSaveImage = async (
  buffer: Buffer,
  filename: string
) => {
  const outputPath = path.join(__dirname, "../../uploads", filename);

  await sharp(buffer)
    .resize(800, 800, { fit: "inside" }) // Resize max to 800x800, maintain aspect ratio
    .jpeg({ quality: 80 }) // Compress to 80% quality (adjustable)
    .toFile(outputPath);

  return `/uploads/${filename}`;
};
