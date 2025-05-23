import { NextFunction, Response, Request } from "express";
import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";

export const UPLOAD_DIR = path.join(process.cwd(), "uploads");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const ALLOWED_EXTENSIONS = [".html"];

export const uploadHtmlMiddleware = (
	req: Request & { user?: any; body?: any; file?: any },
	res: Response,
	next: NextFunction
) => {
	const { profileSlug } = req.user || { profileSlug: "default" };

	const form = new IncomingForm({
		uploadDir: UPLOAD_DIR,
		keepExtensions: true,
		allowEmptyFiles: false,
		filename: (name, ext, part) =>
			`${profileSlug}_${Date.now()}_${part.originalFilename?.trim()}`,
	});

	form.parse(req, (err, fields, files) => {
		if (err) {
			return res.status(500).json({ error: "File upload error", details: err });
		}

		const uploadedFile = Array.isArray(files.file)
			? files.file[0]
			: files.file;

		if (!uploadedFile) {
			return res.status(400).json({ error: "File is required." });
		}

		const fileExt = path.extname(
			uploadedFile.originalFilename?.toLowerCase() || ""
		);

		if (!ALLOWED_EXTENSIONS.includes(fileExt)) {
			fs.unlink(uploadedFile.filepath, () => { });
			return res.status(400).json({
				error: "Invalid file type. Only HTML files are allowed!",
			});
		}

		req.body = fields;
		req.file = uploadedFile;
		req.body.uploadedHtmlName = path.basename(uploadedFile.filepath);
		req.body.uploadedHtmlPath = uploadedFile.filepath;

		next();
	});
};
