import { NextFunction, Request, Response } from 'express';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const ALLOWED_EXTENSIONS = ['.mp4'];

export const uploadMp4Middleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const form = new IncomingForm({
    uploadDir: UPLOAD_DIR,
    keepExtensions: true,
    allowEmptyFiles: false,
    filename: (name, ext, part) =>
      `${Date.now()}_${part.originalFilename?.trim()}`,
  });

  form.on('file', (field, file) => {
    const fileExt = path.extname(file.originalFilename?.toLowerCase() || '');

    if (!ALLOWED_EXTENSIONS.includes(fileExt)) {
      return res.status(400).json({
        error: 'Invalid file type. Only images or videos are allowed.',
      });
    }

    const filePath = file.filepath;
    const originalFileName = path.basename(
      file.originalFilename?.trim() ?? 'file',
      fileExt
    );
    const newFileName = `${originalFileName.trim()}_${Date.now()}${fileExt}`;
    const newFilePath = path.join(UPLOAD_DIR, newFileName);

    fs.rename(filePath, newFilePath, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error saving video file' });
      }
      req.body.videoFileName = newFileName;
      next();
    });
  });

  form.parse(req);
};
