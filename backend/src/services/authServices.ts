import { OAuth2Client } from "google-auth-library";
import { authConfig } from "../configs/index.js";
import { userModel } from "../models/index.js";

const login = async(idToken: string) => {
    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: authConfig.googleClientId
    });
    
    const payload = ticket.getPayload();
    if (payload === null || payload === undefined){
        return null
    }
    const userId = payload['sub'];

    const query = { googleId: userId };
    const options = { 
        upsert: true, 
        returnDocument: "after" as const
    };

    const user = await userModel.User.findOneAndUpdate(query, query, options);
    return user;
}

const me = async(userId: string) => {
    const query = { _id: userId };
    const user = await userModel.User.findOne(query);
    return user    
}

export {
    login,
    me
}