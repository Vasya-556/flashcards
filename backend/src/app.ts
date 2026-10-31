import express from "express";
import type { Request, Response} from "express";
import cors from "cors";
import { 
    appConfig,
    authConfig,
    dbConfig,
 } from "./configs/index.js";
import helmet from "helmet";
import { errorMiddleware } from "./middlewares/index.js";
import { 
    deckRoutes,
    cardRoutes,
    authRoutes,
 } from "./routes/index.js";
import session from 'express-session'
import MongoStore, { createWebCryptoAdapter } from 'connect-mongo'

const app = express();

const corsOptions = {
    origin: [appConfig.origin],
    credentials: true,
}

const sessionStore = session({
    name: appConfig.isProd ? "__Host-Http-session" : "session",
    secret: authConfig.secret,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
        mongoUrl: dbConfig.url,
        cryptoAdapter: createWebCryptoAdapter({
            secret: authConfig.secret,
        }),
        dbName: dbConfig.name,
        touchAfter: authConfig.touchAfter,
    }),
    cookie: {
        secure: appConfig.isProd,
        httpOnly: true,
        sameSite: "lax",
        maxAge: authConfig.maxAge,
        path: "/",
    }
})

if (appConfig.isProd){
    app.set('trust proxy', 1);
}

app.use(cors(corsOptions));
app.use(express.json({
    limit: "5mb"
}));
app.use(helmet());
app.use(sessionStore)
app.disable("x-powered-by");

app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ message: "ok"})
})

app.use("/deck", deckRoutes.router);
app.use("/card", cardRoutes.router);
app.use("/auth", authRoutes.router);

app.use(errorMiddleware.errorHandler);

export {
    app
}
