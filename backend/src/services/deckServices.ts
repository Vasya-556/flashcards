import { deckModel } from "../models/index.js";

const getDeck = async () => {
    const decks = await deckModel.Deck.find();
    
    return decks
}

const postDeck = async (cards: string[], owner: string) => {
    const deck = new deckModel.Deck({
        cards,
        owner
    })

    return await deck.save();
}

const patchDeck = async (id: string, cards?: string[], owner?: string) => {
    if (cards === undefined && owner === undefined) {
        return await deckModel.Deck.findById(id);
    }

    const data: {cards?: string[], owner?: string} = {};

    if (cards !== undefined){
        data.cards = cards;
    }

    if (owner !== undefined){
        data.owner = owner;
    }

    const deck = await deckModel.Deck.findByIdAndUpdate(id, data, {returnDocument: "after"});

    return deck;
}

const deleteDeck = async (id: string) => {
    const deck = await deckModel.Deck.findByIdAndDelete(id);

    return deck
}

export {
    getDeck,
    postDeck,
    patchDeck,
    deleteDeck,
}