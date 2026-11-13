import { 
    describe, 
    it,
    expect,
    afterEach,
    beforeEach,
 } from "vitest";
import { 
    createRoot,
    Root
 } from "react-dom/client";
import { 
    cleanup, 
    act, 
    waitFor
} from "@testing-library/react";
import { vi } from "vitest";
import { deckServices } from "../src/services";
import { MemoryRouter } from "react-router-dom";

import Button from "../src/components/button/Button";
import DeckList from "../src/components/deckList/DeckList";
import EditCard from "../src/components/editCard/EditCard";
import Header from "../src/components/header/Header";
import Input from "../src/components/input/Input";
import LoadingFallback from "../src/components/loadingFallback/LoadingFallback";
import Logout from "../src/components/logout/Logout";
import NewCard from "../src/components/newCard/NewCard";

vi.spyOn(deckServices, "getDecks").mockResolvedValue([]);
let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    root = createRoot(container);
})

afterEach(async () => {
    cleanup();
    localStorage.clear();

    await act(async () => {
        root.unmount();
    })
    vi.unstubAllGlobals();
})

describe("Render components", () => {
    it("Button", async () => {
        await act(async () => {
            root.render(<Button
                text="test"
                category="blue"
            />)
        })

        await waitFor(() => {
            expect(container.querySelector("button")?.textContent).toBe("test");
        })
    });

    it("Edit card", async () => {
        await act(async () => {
            root.render(<EditCard 
                deckId="" 
                cardId="" 
                onCardEdit={() => {}}
                initialFront=""
                initialBack=""
                initialAlwaysShowFront={true}
            />)
        })

        await waitFor(() => {
            expect(container.querySelector("form")).not.toBeNull();
        })
    });

    it("Deck list", async () => {
        await act(async () => {
            root.render(
                <MemoryRouter>
                    <DeckList/>
                </MemoryRouter>
            );
        })

        await waitFor(() => {
            expect(container.querySelector("div")).not.toBeNull();
        })
    });

    it("Header", async () => {
        vi.stubGlobal("matchMedia", (query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: () => {}, // deprecated
            removeListener: () => {}, // deprecated
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: false,
        }));
        await act(async () => {
            root.render(
                <MemoryRouter>
                    <Header/>
                </MemoryRouter>
            )
        })

        await waitFor(() => {
            expect(container.querySelector("button")).not.toBeNull();
        })
    });

    it("Input", async () => {
        await act(async () => {
            root.render(<Input
                label="test"
                category="default"
            />)
        })

        await waitFor(() => {
            expect(container.querySelector("label")?.textContent).toBe("test");
        })
    });

    it("Loading fallback", async () => {
        await act(async () => {
            root.render(<LoadingFallback/>)
        })

        await waitFor(() => {
            expect(container.querySelector("div")).not.toBeNull();
        })
    });

    it("Logout", async () => {
        await act(async () => {
            root.render(
                <MemoryRouter>
                    <Logout/>
                </MemoryRouter>
            );
        })

        await waitFor(() => {
            expect(container.querySelector("button")).not.toBeNull();
        })
    });

    it("New card", async () => {
        await act(async () => {
            root.render(<NewCard deckId="" onCardCreate={() => {}} formRef={null}/>)
        })

        await waitFor(() => {
            expect(container.querySelector("form")).not.toBeNull();
        })
    });
});