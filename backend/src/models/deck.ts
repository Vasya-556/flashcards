import mongoose from "mongoose";

const deckSchema = new mongoose.Schema({
    cards: [{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card"
    }],
    owner: {
        required: true,
        type: String,
    }
})

const Deck = mongoose.model("Deck", deckSchema);

export {
    Deck
}