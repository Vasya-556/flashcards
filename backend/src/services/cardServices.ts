import { 
    cardModel,
    deckModel
 } from "../models/index.js";

const getCard = async(
    userId: string,
    deckId: string,
    cardId: string,
) => {
    const deck = await deckModel.Deck.findOne({ _id: deckId, owner: userId });
    
    if(!deck){
        return null;
    }

    const card = await cardModel.Card.findOne({ _id: cardId, deck: deck._id });
    
    return card;
}

const getCards = async(
    userId: string,
    deckId: string,
) => {
    const deck = await deckModel.Deck.findOne({ _id: deckId, owner: userId });

    if(!deck){
        return null;
    }

    const cards = await cardModel.Card.find({ deck: deck._id});
    return cards
}

const postCard = async(
    userId: string,
    deckId: string,
    data: {
        front: string;
        back: string;
        alwaysShowFront?: boolean
    }
) => {
    const deck = await deckModel.Deck.findOne({ _id: deckId, owner: userId });
    
    if(!deck){
        return null;
    }

    const card = await cardModel.Card.create({
        ...data,
        deck: deck._id
    })

    return card;
}

const patchCard = async(
    userId: string,
    deckId: string,
    cardId: string,
    data: {
        front?: string;
        back?: string;
        alwaysShowFront?: boolean
    }
) => {
    const deck = await deckModel.Deck.findOne({ _id: deckId, owner: userId });
    
    if(!deck){
        return null;
    }

    const card = await cardModel.Card.findOneAndUpdate(
        { _id: cardId, deck: deck._id },
        { $set: data },
        { runValidators: true, returnDocument: "after" }
    )

    return card;
}

const changeProgress = async(
    userId: string,
    deckId: string,
    cardId: string,
    amount: 1 | -1
) => {
    const deck = await deckModel.Deck.findOne({ _id: deckId, owner: userId });
    
    if(!deck){
        return null;
    }

    const card = await cardModel.Card.findOne({ _id: cardId, deck: deck._id });
    
    if(!card){
        return null;
    }
    
    card.set({ progress: card.progress + amount})
    return card.save();
}

const deleteCard = async(
    userId: string,
    deckId: string,
    cardId: string,
) => {
    const deck = await deckModel.Deck.findOne({ _id: deckId, owner: userId });
    
    if(!deck){
        return null;
    }

    const card = await cardModel.Card.findOneAndDelete({ _id: cardId, deck: deck._id });
    return card;
}

export {
    getCard,
    getCards,
    postCard,
    patchCard,
    changeProgress,
    deleteCard,
}