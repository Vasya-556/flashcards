import { Router } from "express";
import { deckControllers } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/index.js";

const router = Router();

router.use(authMiddleware.requireAuth);

router.get("/:deckId", deckControllers.getDeck);
router.get("/", deckControllers.getDecks);
router.post("/", deckControllers.postDeck);
router.patch("/:deckId", deckControllers.updateDeck);
router.delete("/:deckId", deckControllers.deleteDeck);

export {
    router
}