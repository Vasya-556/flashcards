import { fetchAPI } from "../api/api";
import { useAuth } from "../stores";
import { authTypes } from "../types";
import { AppError } from "../utils";

const baseUrl = "/auth"

const login = async (credentials: Record<string, unknown>): Promise<authTypes.User> => {
    const response = await fetchAPI({
        url: `${baseUrl}/login`,
        method: "post",
        body: credentials
    });

    const csrfResponse = await fetchAPI({
        url: `${baseUrl}/csrf`,
        method: "get",
    })

    if (typeof csrfResponse.csrfToken !== "string"){
        throw new AppError.AppError("Unable to obtain CSRF token");
    }

    useAuth.getState().setCsrfToken(csrfResponse.csrfToken);

    return response;
}

const logout = (): Promise<unknown> => {
    const response = fetchAPI({
        url: `${baseUrl}/logout`,
        method: "post",
    })

    useAuth.getState().removeCsrfToken();

    return response;
}

const me = (): Promise<authTypes.User> => {
    return fetchAPI({
        url: `${baseUrl}/me`,
        method: "get",
    })
}

export {
    login,
    logout,
    me
}