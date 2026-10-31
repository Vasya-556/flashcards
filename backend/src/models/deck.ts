import mongoose from "mongoose";

const deckSchema = new mongoose.Schema({
    owner: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        required: true,
        type: String,
    }
})

const Deck = mongoose.model("Deck", deckSchema);

export {
    Deck
}