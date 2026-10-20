import { app } from "./app.js";
import { appConfig } from "./configs/index.js";
import { db } from "./models/index.js";

let isShuttingDown = false;
await db.connectDatabase();

const server = app.listen(appConfig.port, () => {
    console.log(`Server is running on port: ${appConfig.port}\n`)
})

const shutDown = async (signal: string, exitCode: number = 0) => {
    if (isShuttingDown){
        return;
    }
    
    isShuttingDown = true;
    console.log(`Received: ${signal}, shutting down`);

    const shutDownTimer = setTimeout(() => {
        console.error("Shut down timed out!");
        server.closeAllConnections();
        process.exit(1);
    }, 30000)

    try {
        await new Promise<void>((resolve, reject) => {
            server.close((error) => {
                if(error) {
                    reject(error);
                    return;
                }
                resolve();
            });
            server.closeIdleConnections();
        })
    }
    catch (error){
        console.error("Error closing HTTP server:", error);
        exitCode = 1;
    }

    try {
        await db.disconnectDatabase();
    }
    catch (error){
        console.error("Error disconnecting database:", error);
        exitCode = 1;
    }
    finally {
        clearTimeout(shutDownTimer);
        process.exitCode = exitCode;
    }
}

process.on("SIGTERM", () => shutDown('SIGTERM'));
process.on("SIGINT", () => shutDown('SIGINT'));

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    shutDown('uncaughtException', 1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    shutDown('unhandledRejection', 1);
});

export {
    server
}
