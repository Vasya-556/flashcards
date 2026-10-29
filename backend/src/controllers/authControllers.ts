import type { Request, Response, NextFunction } from "express";
import { authServices } from "../services/index.js";

const login = async(req: Request, res: Response, next: NextFunction) => {
    const { idToken } = req.body;
    if (!idToken){
        return res.status(400).json({ error: "Google id is required"});
    }

    try {
        const auth = await authServices.login(idToken);
        if (auth === null) {
            return res.status(400).json({ error: "Google id was not found"});
        }
        req.session.userId = auth._id.toString();
        req.session.save((error) => {
            if(error) {
                return next(error)
            }
            return res.status(200).json(auth);
        })
    }
    catch (error) {
        next(error);
    }
}

const logout = async(req: Request, res: Response, next: NextFunction) => {
    try {
        req.session.destroy((error) => {
            if(error){
                return next(error)
            }
        });
        res.clearCookie("session")
        return res.status(200).json({ message: "User logged out" });
    }
    catch (error) {
        next(error);
    }
}

const me = async(req: Request, res: Response, next: NextFunction) => {
    try {
        if(req.session.userId){
            const auth = await authServices.me(req.session.userId);
            if (auth){
                return res.status(200).json(auth);
            }
            return res.status(401).json({ error: "User not found" });
        }
        return res.status(401).json({ error: "User not authenticated" });
    }
    catch (error) {
        next(error);
    }
}

export {
    login,
    logout,
    me
}