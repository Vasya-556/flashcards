import { config } from "../utils/index.js";

const origin = config.setEnv("FRONTEND_URL") ?? "http://localhost:5173";
const isProd = config.setEnv("IS_PRODUCTION") === "true";
const port = config.setEnv("PORT") ?? 8000;
const protocol = config.setEnv("PROTOCOL")?? "http";

export {
    origin,
    isProd,
    port,
    protocol
}
