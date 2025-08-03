import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import { Request } from "express";

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../Files/image");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, `image-${uniqueSuffix}${extension}`);
  },
});

// File filter: only allow images
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Only images (jpeg, jpg, png, gif) are allowed!"));
  }
};

const upload = multer({ storage, fileFilter }).single("image");

// Upload function with image optimization using sharp
export const uploadFile = (req: Request, res: any): Promise<string> =>
  new Promise((resolve, reject) => {
    upload(req, res, async (err: any) => {
      if (err) {
        return reject(err);
      }

      if (!req.file) {
        return resolve("default.jpg"); // or reject if required
      }

      const filePath = path.join(uploadDir, req.file.filename);
      const optimizedPath = path.join(
        uploadDir,
        "optimized-" + req.file.filename
      );

      try {
        // Resize/compress image using sharp (e.g., max width 800px)
        await sharp(filePath)
          .resize(800)
          .jpeg({ quality: 80 })
          .toFile(optimizedPath);

        // Delete original file after optimization
        fs.unlinkSync(filePath);

        // Resolve with optimized filename
        resolve("optimized-" + req.file.filename);
      } catch (error) {
        reject(error);
      }
    });
  });
