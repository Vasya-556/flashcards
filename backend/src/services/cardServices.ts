import { cardModel } from "../models/index.js";

const getCard = async() => {
    const cards = await cardModel.Card.find();
    
    return cards;
}

const postCard = async(front: string, back: string) => {
    const card = new cardModel.Card({
        front,
        back,
    })
    
    return await card.save();
}

const patchCard = async(id: string, front: string, back: string) => {
    if (front === undefined && back === undefined) {
        return await cardModel.Card.findById(id);
    }
    
    const data: {front?: string, back?: string} = {};
    
    if (front !== undefined){
        data.front = front;
    }

    if (back !== undefined){
        data.back = back;
    }
    
    const card = await cardModel.Card.findByIdAndUpdate(id, data, {returnDocument: "after"});
    
    return card;
}

const deleteCard = async(id: string) => {
    const card = await cardModel.Card.findByIdAndDelete(id);
    return card;
}

export {
    getCard,
    postCard,
    patchCard,
    deleteCard
}