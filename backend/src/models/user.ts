import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    googleId: {
        required: true,
        unique: true,
        type: String,
    },
})

const User = mongoose.model("User", userSchema);

export {
    User
}