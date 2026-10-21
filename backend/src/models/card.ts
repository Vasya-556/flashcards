import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    front: {
        require: true,
        type: String
    },
    back: {
        require: true,
        type: String
    },
})

const Card = mongoose.model("Card", cardSchema);

export {
    Card
}