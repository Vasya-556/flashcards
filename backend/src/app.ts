import express from "express";
import type { Request, Response} from "express";
import cors from "cors";
import { appConfig } from "./configs/index.js";
import helmet from "helmet";
import { errorMiddleware } from "./middlewares/index.js";

const app = express();

const corsOptions = {
    origin: [appConfig.origin],
    credentials: false,
}

app.use(cors(corsOptions));
app.use(express.json({
    limit: "5mb"
}));
app.use(helmet());
app.disable("x-powered-by");

app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ message: "ok"})
})

app.use(errorMiddleware.errorHandler);

export {
    app
}
