import { Router } from "express";
import { cardControllers } from "../controllers/index.js";
import { 
    authMiddleware,
    uploadMiddleware,
 } from "../middlewares/index.js";

const router = Router();

router.use(authMiddleware.requireAuth);

router.get("/:deckId/:cardId", cardControllers.getCard);
router.get("/:deckId", cardControllers.getCards);
router.post("/:deckId", cardControllers.postCard);
router.patch("/:deckId/:cardId", cardControllers.updateCard);
router.patch("/:deckId/:cardId/increase", cardControllers.increaseProgress);
router.patch("/:deckId/:cardId/decrease", cardControllers.decreaseProgress);
router.delete("/:deckId/:cardId", cardControllers.deleteCard);
router.post("/:deckId/import", uploadMiddleware.upload.single("cards"), cardControllers.importCards);

export {
    router
}