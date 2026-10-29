import type { 
    Request, 
    Response, 
    NextFunction 
} from "express";
import { authServices } from "../services/index.js";

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.session.userId;
    
    if (userId === null || !userId){
        return res.status(401).json({ message: "Unauthorized"})
    }

    const user = await authServices.me(userId);

    if (user === null || !user){
        return res.status(401).json({ message: "Unauthorized"})
    }

    next();
}

export {
    requireAuth
}