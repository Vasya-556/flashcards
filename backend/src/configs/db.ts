import { config } from "../utils/index.js";

const username = config.setEnv("DB_USERNAME");
const password = config.setEnv("DB_PASSWORD");
const name = config.setEnv("DB_NAME");
const url = `mongodb+srv://${username}:${password}@cluster0.3re500s.mongodb.net/?compressors=zlib`

export {
    username,
    password,
    name,
    url
}
