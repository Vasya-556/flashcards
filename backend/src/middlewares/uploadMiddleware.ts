import multer from "multer";
import path from 'path';
import fs from 'fs';
import { randomUUID } from "crypto";
import type { Request } from "express";
import type { FileFilterCallback } from "multer";
import { AppError } from "../utils/index.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsRoot = path.join(__dirname, '..', '..', "uploads");

const ALLOWED_MIME_TYPES = ['application/json'];
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3 MB

const ensureDir = (dir: string) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true})
    }
};

const makeStorage = (subFolder: string) =>
    multer.diskStorage({
        destination: (req, res, cb) => {
            const dir = path.join(uploadsRoot, subFolder);
            ensureDir(dir);
            cb(null, dir);
        },
        filename: (req, file, cb) => {
            const extension = path.extname(file.originalname).toLowerCase() || ".json"; 
            const unique = `${randomUUID()}.${extension}`;
            cb(null, unique);
        }
    });

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)){
        cb(new AppError.AppError(400, "Only json files are allowed"));
        return;
    }
    cb(null, true);
};

const upload = multer({
    storage: makeStorage("cards"),
    fileFilter: fileFilter,
    limits: {
        files: 1,
        fileSize: MAX_FILE_SIZE,
        fieldNestingDepth: 3,
    }
});

export {
    upload,
};