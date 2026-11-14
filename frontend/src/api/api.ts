import { appConfig } from "../configs";
import { AppError } from "../utils/index";
import { useAuth } from "../stores";

type args = {
    url: string,
    method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
    body?: Record<string, unknown> | FormData;
}

const fetchAPI = async (args: args) => {
    let csrfToken = useAuth.getState().csrfToken;

    if (args.method !== "GET" && !csrfToken) {
        try {
            const csrfResponse = await fetch(`${appConfig.backendURL}/auth/csrf`, {
                method: "get",
                credentials: "include",
            });
            
            const csrfMessage = await csrfResponse.json();

            if (!csrfResponse.ok || typeof csrfMessage.csrfToken !== "string") {
                throw new AppError.AppError("Unable to obtain CSRF token", csrfResponse.status);
            }

            useAuth.getState().setCsrfToken(csrfMessage.csrfToken);
            csrfToken = useAuth.getState().csrfToken;
        }
        catch (error) {
            if (error instanceof AppError.AppError){
                throw error;
            }
            throw new AppError.AppError("Unable to connect to server");
        }
    }

    let response: Response;
    try {
        response = await fetch(`${appConfig.backendURL}${args.url}`, {
            method: args.method,
            headers: {
                ...(args.body instanceof FormData
                    ? {}
                    : {"Content-Type": "application/json"}
                ),
                ...(args.method !== "GET" && csrfToken
                    ? {"X-CSRF-TOKEN": csrfToken}
                    : {}
                ),
            },
            body: args.body instanceof FormData
                ? args.body
                : args.body === undefined
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
