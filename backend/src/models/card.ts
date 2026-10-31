import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    front: {
        required: true,
        type: String
    },
    back: {
        required: true,
        type: String
    },
    alwaysShowFront: {
        required: true,
        type: Boolean,
        default: false,
    },
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    deck: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Deck",
    }
})

const Card = mongoose.model("Card", cardSchema);

export {
    Card
}