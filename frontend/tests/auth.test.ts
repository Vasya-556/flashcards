import { 
    describe, 
    it,
    expect,
 } from "vitest";
import { authServices } from "../src/services";
import { appConfig } from "../src/configs";

const loginWithCookie = async () => {
    const response = await fetch(
        `${appConfig.backendURL}/auth/login`,
        {
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idToken: "test"
            })
        }
    );
    expect(response.status).toBe(200);

    const cookies = response.headers.getSetCookie();

    if(cookies.length === 0) {
        return
    }

    const cookie = cookies.map(value => value.split(";")[0]).join("; ");

    const originalFetch = globalThis.fetch;

    globalThis.fetch = (input, init = {}) => {
        const headers = new Headers(init.headers);
        headers.set("Cookie", cookie);

        return originalFetch(input, {
            ...init,
            headers,
        });
    }
};

describe("Auth services", () => {
    it("Login, me, logout", async () => {
        const credentials: Record<string, unknown> = {
            idToken: "test"
        }
        await authServices.login(credentials);
    });

    it("Me", async () => {
        await loginWithCookie();
        
        const user = await authServices.me();
    
        expect(user).toBeDefined();
    })

    it("Logout", async () => {
        await loginWithCookie();

        await authServices.logout();

        const loggedOutUser = authServices.me();
        await expect(loggedOutUser).rejects.toThrow();
    })
});