import { Router } from "express";
import { deckControllers } from "../controllers/index.js";

const router = Router();

router.get("/", deckControllers.getDeck);
router.post("/", deckControllers.postDeck);
router.patch("/:id", deckControllers.updateDeck);
router.delete("/:id", deckControllers.deleteDeck);

export {
    router
}