import { config } from "../utils/index.js";

const secret = config.setEnv("SESSION_SECRET");
const googleClientId = config.setEnv("GOOGLE_CLIENT_ID");
const touchAfter = 24 * 60 * 60;
const maxAge = 24 * 60 * 60 * 1000;

export {
    secret,
    googleClientId,
    touchAfter,
    maxAge,
}