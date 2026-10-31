import type { Request, Response, NextFunction } from "express";
import { deckServices } from "../services/index.js";

const getDeck = async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.session.userId;
    const deckId = req.params.deckId;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (!deckId || typeof deckId !== "string") {
        return res.status(401).json({ message: "Deck id was not provided" });
    }

    try {
        const deck = await deckServices.getDeck(userId, deckId);
        return res.status(200).json(deck);
    }
    catch (error) {
        next(error)
    }
}

const getDecks = async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decks = await deckServices.getDecks(userId);
        return res.status(200).json(decks);
    }
    catch (error) {
        next(error)
    }
}

const postDeck = async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.session.userId;
    const { name } = req.body;
    
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (typeof name !== "string" || !name.trim()){
        return res.status(400).json({ message: "Deck name is required" });
    }

    try {
        const deck = await deckServices.postDeck(userId, name.trim());
        res.status(201).json({ message: "Deck was created", deck: deck})
    }
    catch (error) {
        next(error)
    }
}

const updateDeck = async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.session.userId;
    const deckId = req.params.deckId;
    const { name } = req.body;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (typeof name !== "string" || !name.trim()){
        return res.status(400).json({ message: "Deck name is required" });
    }

    if (!deckId || typeof deckId !== "string") {
        return res.status(401).json({ message: "Deck id was not provided" });
    }

    try {
        const deck = await deckServices.patchDeck(userId, deckId, name.trim());
        if (!deck){
            return res.status(404).json({ message: "Deck was not found"});
        }
        return res.status(200).json({ message: "Deck was updated", deck: deck});
    }
    catch(error){
        next(error);
    }
}

const deleteDeck = async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.session.userId;
    const deckId = req.params.deckId;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (!deckId || typeof deckId !== "string") {
        return res.status(401).json({ message: "Deck id was not provided" });
    }

    try {
        const deck = await deckServices.deleteDeck(userId, deckId);
        if (!deck){
            return res.status(404).json({ message: "Deck was not found"});
        }
        return res.status(200).json({ message: "Deck was deleted"});
    }
    catch(error){
        next(error)
    }
}

export {
    getDeck,
    getDecks,
    postDeck,
    updateDeck,
    deleteDeck,
}