import { fetchAPI } from "../api/api";
import { authTypes } from "../types";

const baseUrl = "/auth"

const login = (credentials: Record<string, unknown>): Promise<authTypes.User> => {
    return fetchAPI({
        url: `${baseUrl}/login`,
        method: "post",
        body: credentials
    })
}

const logout = (): Promise<unknown> => {
    return fetchAPI({
        url: `${baseUrl}/logout`,
        method: "post",
    })
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