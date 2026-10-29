import { Router } from "express";
import { deckControllers } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/index.js";

const router = Router();

router.get("/", authMiddleware.requireAuth, deckControllers.getDeck);
router.post("/", authMiddleware.requireAuth, deckControllers.postDeck);
router.patch("/:id", authMiddleware.requireAuth, deckControllers.updateDeck);
router.delete("/:id", authMiddleware.requireAuth, deckControllers.deleteDeck);

export {
    router
}