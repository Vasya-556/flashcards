import { 
    describe, 
    it,
    expect,
    afterEach,
    beforeEach,
 } from "vitest";
import { 
    EditDeck,
    Home,
    Learn,
    Login,
    NewDeck,
    NotFound
 } from "../src/pages";
import { 
    createRoot,
    Root
 } from "react-dom/client";
import { 
    cleanup, 
    act, 
    waitFor
} from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { authConfig } from "../src/configs";

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    root = createRoot(container);
});

afterEach(async () => {
    cleanup();
    localStorage.clear();

    await act(async () => {
        root.unmount();
    });
});

describe("Render pages", () => {
    it("Edit deck", async () => {
        await act(async () => {
            root.render(
                <MemoryRouter>
                    <EditDeck/>
                </MemoryRouter>
            );
        });

        await waitFor(() => {
            expect(container.querySelector("form")).not.toBeNull();
        });
    });

    it("Home", async () => {
        await act(async () => {
            root.render(
                <MemoryRouter>
                    <Home/>
                </MemoryRouter>
            );
        });

        await waitFor(() => {
            expect(container.querySelector("div")).not.toBeNull();
        });
    });

    it("Learn", async () => {
        await act(async () => {
            root.render(
                <MemoryRouter initialEntries={["/learn/test-deck-id"]}>
                    <Routes>
                        <Route path="/learn/:id" element={<Learn />} />
                    </Routes>
                </MemoryRouter>
            );
        });

        await waitFor(() => {
            expect(container.querySelector("a")).not.toBeNull();
        });
    });

    it("Login", async () => {
        await act(async () => {
            root.render(
                <GoogleOAuthProvider 
                    clientId={authConfig.googleClientId}
                >
                    <Login/>
                </GoogleOAuthProvider>
            )
        });

        await waitFor(() => {
            expect(container.querySelector("div")).not.toBeNull();
        });
    });

    it("New deck", async () => {
        await act(async () => {
            root.render(<NewDeck/>)
        });

        await waitFor(() => {
            expect(container.querySelector("form")).not.toBeNull();
        });
    });

    it("Not found", async () => {
        await act(async () => {
            root.render(<NotFound/>)
        });

        await waitFor(() => {
            expect(container.querySelector("h1")).not.toBeNull();
        });
    });
});