import { Router } from "express";
import { cardControllers } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/index.js";

const router = Router();

router.get("/", authMiddleware.requireAuth, cardControllers.getCard);
router.post("/", authMiddleware.requireAuth, cardControllers.postCard);
router.patch("/:id", authMiddleware.requireAuth, cardControllers.updateCard);
router.delete("/:id", authMiddleware.requireAuth, cardControllers.deleteCard);

export {
    router
}