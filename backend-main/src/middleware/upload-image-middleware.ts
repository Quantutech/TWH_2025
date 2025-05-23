import { NextFunction, Request, Response } from "express";
import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";
import sharp from "sharp";

export const UPLOAD_DIR = path.join(process.cwd(), "uploads");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

export const uploadImageMiddleware = async (
	req: any,
	res: Response,
	next: NextFunction,
) => {
	const { profileSlug } = req.user;

	const form = new IncomingForm({
		uploadDir: UPLOAD_DIR,
		keepExtensions: true,
		allowEmptyFiles: false,
		filename: (name, ext, part) =>
			`${Date.now()}_${part.originalFilename?.trim()}`,
	});

	form.on("file", (field, file) => {
		const fileExt = path.extname(file.originalFilename?.toLowerCase() || "");

		if (!ALLOWED_EXTENSIONS.includes(fileExt)) {
			return res.status(400).json({
				error: "Invalid file type. Only images or videos are allowed.",
			});
		}

		const filePath = file.filepath;
		const originalFileName = path.basename(
			file.originalFilename?.trim() ?? "file",
			fileExt,
		);
		const compressedImageName = `${profileSlug}_${originalFileName}_${Date.now()}.webp`;
		const compressedImagePath = path.join(UPLOAD_DIR, compressedImageName);

		const fileStream = fs.createReadStream(filePath);

		try {
			const sharpStream = sharp()
				.resize(800, 800, { fit: "inside", withoutEnlargement: true })
				.webp({ quality: 50 });

			const output = fs.createWriteStream(compressedImagePath);
			fileStream.pipe(sharpStream).pipe(output);

			output.on("finish", () => {
				req.body.compressedImageName = compressedImageName;
				req.body.compressedImagePath = compressedImagePath;

				fs.unlink(filePath, (err) => {
					if (err) throw err;
				});
				next();
			});

			output.on("error", () => {
				return res
					.status(500)
					.json({ error: "Error during image compression" });
			});
		} catch (error) {
			return res.status(500).json({ error: "Error during image compression" });
		}
	});

	form.parse(req);
};
