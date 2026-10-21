import type { Request, Response, NextFunction } from "express";
import { deckServices } from "../services/index.js";

const getDeck = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const deck = await deckServices.getDeck();
        return res.status(200).json(deck);
    }
    catch (error) {
        next(error)
    }
}

const postDeck = async(req: Request, res: Response, next: NextFunction) => {
    const {cards, owner} = req.body;
    
    if (!cards || !owner){
        return res.status(400).json({ error: "Cards and owner required"});
    }

    try {
        const deck = await deckServices.postDeck(cards, owner);
        res.status(201).json({ message: "Deck was created", deck: deck})
    }
    catch (error) {
        next(error)
    }
}

const updateDeck = async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const {cards, owner} = req.body;

    if (!id || Array.isArray(id)){
        return res.status(400).json({ error: "Valid deck id required"});
    }

    if (!cards && !owner){
        return res.status(400).json({ error: "Cards or owner required"});
    }

    try {
        const deck = await deckServices.patchDeck(id, cards, owner);
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
    const id = req.params.id

    if (!id || Array.isArray(id)){
        return res.status(400).json({ error: "Valid deck id required"});
    }

    try {
        const deck = await deckServices.deleteDeck(id);
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
    postDeck,
    updateDeck,
    deleteDeck,
}