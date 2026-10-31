import { 
    cardModel,
    deckModel
 } from "../models/index.js";

const getDeck = async (
    owner: string,
    deckId: string,
) => {
    const deck = await deckModel.Deck.findOne({ _id: deckId, owner: owner });
    
    return deck;
}

const getDecks = async (
    owner: string,
) => {
    const decks = await deckModel.Deck.find({ owner: owner });
    
    return decks
}

const postDeck = async (
    owner: string,
    name: string,
) => {
    const deck = new deckModel.Deck({
        owner,
        name,
    })

    return await deck.save();
}

const patchDeck = async (
    owner: string,
    deckId: string,
    name: string,
) => {
    const deck = await deckModel.Deck.findOneAndUpdate(
        { _id: deckId, owner: owner },
        { name: name },
        { returnDocument: "after", runValidators: true}
    )

    return deck;
}

const deleteDeck = async (
    owner: string,
    deckId: string,
) => {
    const deck = await deckModel.Deck.findOneAndDelete({ _id: deckId, owner: owner });

    if (!deck) {
        return null;
    }

    await cardModel.Card.deleteMany({ deck: deck._id });

    return deck
}

export {
    getDeck,
    getDecks,
    postDeck,
    patchDeck,
    deleteDeck,
}