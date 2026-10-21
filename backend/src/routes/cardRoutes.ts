import { Router } from "express";
import { cardControllers } from "../controllers/index.js";

const router = Router();

router.get("/", cardControllers.getCard);
router.post("/", cardControllers.postCard);
router.patch("/:id", cardControllers.updateCard);
router.delete("/:id", cardControllers.deleteCard);

export {
    router
}