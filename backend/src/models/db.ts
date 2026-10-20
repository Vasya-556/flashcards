import { dbConfig, appConfig } from "../configs/index.js";
import mongoose from "mongoose";
import { AppError } from "../utils/index.js";

const connectDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(dbConfig.url);
        console.log("Database connected");
    }
    catch (error) {
        if (!appConfig.isProd){
            console.error(error);
        }
        throw new AppError.AppError(500, "Database connection error");
    }
}

const disconnectDatabase = async (): Promise<void> => {
    try {
        await mongoose.disconnect();
        console.log("Database disconnected");
    }
    catch (error) {
        if (!appConfig.isProd){
            console.error(error);
        }
        throw new AppError.AppError(500, "Database disconnection error");
    }
}

export {
    connectDatabase,
    disconnectDatabase,
}