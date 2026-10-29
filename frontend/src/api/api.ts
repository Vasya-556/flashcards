import { appConfig } from "../configs";
import { AppError } from "../utils/index";

type args = {
    url: string,
    method: "post" | "get" | "put" | "delete";
    body?: Record<string, unknown>;
}

const fetchAPI = async (args: args) => {
    let response: Response;
    try {
        response = await fetch(`${appConfig.backendURL}${args.url}`, {
            method: args.method,
            headers: {
                "Content-Type": "application/json",
            },
            body: args.body === undefined
                ? undefined
                : JSON.stringify(args.body),
            credentials: "include",
        })
    }
    catch {
        throw new AppError.AppError("Unable to connect to server");
    }

    let message;

    try {
        message = await response.json()
    }
    catch {
        throw new AppError.AppError("Invalid response from the server", response.status);
    }

    if (!response.ok){
        let errorMessage;
        if (appConfig.isProd){
            errorMessage = "Oops something went wrong on our side"
        }
        else {
            if (typeof message.error === "string"){
                errorMessage = message.error
            }
            else {
                errorMessage = "No error message";
            }
        }
        throw new AppError.AppError(errorMessage, response.status);
    }

    return message;
}

export {
    fetchAPI
}
