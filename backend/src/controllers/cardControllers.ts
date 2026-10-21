import type { Request, Response, NextFunction } from "express";
import { cardServices } from "../services/index.js";

const getCard = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const card = await cardServices.getCard();
        return res.status(200).json(card);
    }
    catch (error) {
        next(error)
    }
}

const postCard = async(req: Request, res: Response, next: NextFunction) => {
    const {front, back} = req.body;
    
    if (!front || !back){
        return res.status(400).json({ error: "Front and back of a card is required"});
    }

    try {
        const card = await cardServices.postCard(front, back);
        return res.status(201).json({ message: "Card was created", card: card})
    }
    catch (error) {
        next(error)
    }
}

const updateCard = async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const {front, back} = req.body;

    if (!id || Array.isArray(id)){
        return res.status(400).json({ error: "Valid card id required"});
    }

    if (!front && !back){
        return res.status(400).json({ error: "Front or back are required"});
    }

    try {
        const card = await cardServices.patchCard(id, front, back);
        if (!card){
            return res.status(404).json({ message: "Card was not found"});
        }
        return res.status(200).json({ message: "Card was updated", card: card});
    }
    catch(error){
        next(error);
    }
}

const deleteCard = async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    if (!id || Array.isArray(id)){
        return res.status(400).json({ error: "Valid card id required"});
    }

    try {
        const card = await cardServices.deleteCard(id);
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
    postCard,
    updateCard,
    deleteCard,
}