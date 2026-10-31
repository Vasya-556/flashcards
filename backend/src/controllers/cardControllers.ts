import type { Request, Response, NextFunction } from "express";
import { cardServices } from "../services/index.js";

const getCard = async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.session.userId;
    const deckId = req.params.deckId;
    const cardId = req.params.cardId;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (!deckId || typeof deckId !== "string") {
        return res.status(401).json({ message: "Deck id was not provided" });
    }

    if (!cardId || typeof cardId !== "string") {
        return res.status(401).json({ message: "Card id was not provided" });
    }

    try {
        const card = await cardServices.getCard(userId, deckId, cardId);
        return res.status(200).json(card);
    }
    catch (error) {
        next(error)
    }
}

const getCards = async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.session.userId;
    const deckId = req.params.deckId;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (!deckId || typeof deckId !== "string") {
        return res.status(401).json({ message: "Deck id was not provided" });
    }
    
    try {
        const card = await cardServices.getCards(userId, deckId);
        return res.status(200).json(card);
    }
    catch (error) {
        next(error)
    }
}

const postCard = async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.session.userId;
    const deckId = req.params.deckId;
    const { front, back, alwaysShowFront } = req.body;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (!deckId || typeof deckId !== "string") {
        return res.status(401).json({ message: "Deck id was not provided" });
    }

    if (typeof front !== "string" || typeof back !== "string" || typeof alwaysShowFront !== "boolean"){
        return res.status(401).json({ message: "Fields front, back and always show front are required" });
    }

    const data = {
        front,
        back,
        alwaysShowFront
    }

    try {
        const card = await cardServices.postCard(userId, deckId, data);
        return res.status(201).json({ message: "Card was created", card: card})
    }
    catch (error) {
        next(error)
    }
}

const updateCard = async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.session.userId;
    const deckId = req.params.deckId;
    const cardId = req.params.cardId;
    const { front, back, alwaysShowFront } = req.body;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (!deckId || typeof deckId !== "string") {
        return res.status(401).json({ message: "Deck id was not provided" });
    }

    if (!cardId || typeof cardId !== "string") {
        return res.status(401).json({ message: "Card id was not provided" });
    }

    const data: {
        front?: string;
        back?: string;
        alwaysShowFront?: boolean;
    } = {};
    
    if (front !== undefined) {
        if (typeof front !== "string"){
            return res.status(400).json({ message: "Invalid front value" });
        }
        data.front = front;
    }

    if (back !== undefined) {
        if (typeof back !== "string"){
            return res.status(400).json({ message: "Invalid back value" });
        }
        data.back = back;
    }

    if (alwaysShowFront !== undefined) {
        if (typeof alwaysShowFront !== "boolean"){
            return res.status(400).json({ message: "Invalid alwaysShowFront value" });
        }
        data.alwaysShowFront = alwaysShowFront;
    }

    if (Object.keys(data).length === 0){
        return res.status(400).json({ message: "No fields to update" });
    }

    try {
        const card = await cardServices.patchCard(userId, deckId, cardId, data);
        if (!card){
            return res.status(404).json({ message: "Card was not found"});
        }
        return res.status(200).json({ message: "Card was updated", card: card});
    }
    catch(error){
        next(error);
    }
}

const changeProgress = async(req: Request, res: Response, next: NextFunction, amount: 1 | -1) => {
    const userId = req.session.userId;
    const deckId = req.params.deckId;
    const cardId = req.params.cardId;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (!deckId || typeof deckId !== "string") {
        return res.status(401).json({ message: "Deck id was not provided" });
    }

    if (!cardId || typeof cardId !== "string") {
        return res.status(401).json({ message: "Card id was not provided" });
    }

    try {
        const card = await cardServices.changeProgress(userId, deckId, cardId, amount);
        if (!card){
            return res.status(404).json({ message: "Card was not found"});
        }
        return res.status(200).json(card);
    }
    catch (error) {
        next(error)
    }
}

const increaseProgress = async(req: Request, res: Response, next: NextFunction) => {
    return changeProgress(req, res, next, 1);
}

const decreaseProgress = async(req: Request, res: Response, next: NextFunction) => {
    return changeProgress(req, res, next, -1);
}

const deleteCard = async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.session.userId;
    const deckId = req.params.deckId;
    const cardId = req.params.cardId;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (!deckId || typeof deckId !== "string") {
        return res.status(401).json({ message: "Deck id was not provided" });
    }

    if (!cardId || typeof cardId !== "string") {
        return res.status(401).json({ message: "Card id was not provided" });
    }

    try {
        const card = await cardServices.deleteCard(userId, deckId, cardId);
        if (!card){
            return res.status(404).json({ message: "Card was not found"});
        }
        return res.status(200).json({ message: "Card was deleted"});
    }
    catch(error){
        next(error)
    }
}

export {
    getCard,
    getCards,
    postCard,
    updateCard,
    changeProgress,
    increaseProgress,
    decreaseProgress,
    deleteCard,
}