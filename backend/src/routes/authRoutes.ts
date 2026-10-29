import { Router } from "express";
import { authControllers } from "../controllers/index.js";

const router = Router();

router.post("/login", authControllers.login);
router.post("/logout", authControllers.logout);
router.get("/me", authControllers.me);

export {
    router
}