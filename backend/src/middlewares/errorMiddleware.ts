import type { 
    Request, 
    Response, 
    NextFunction 
} from "express";
import { AppError } from "../utils/index.js";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent){
        next(err);
        return;
    }

    if (err instanceof AppError.AppError) {
        res.status(err.statusCode).json({
            error: err.message
        })
        return
    }

    res.status(500).json({error: "Internal server error"});
}

export {
    errorHandler
}
