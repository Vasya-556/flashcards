import { 
    describe, 
    it,
    expect,
    afterEach,
    beforeEach,
 } from "vitest";
import { 
    EditCard,
    DeckList,
    Header,
    Logout,
    NewCard,
 } from "../src/components";
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
})

describe("Render components", () => {
    it("Edit card", async () => {
        await act(async () => {
            root.render(<EditCard deckId="" cardId="" onCardEdit={() => {}}/>)
        })

        await waitFor(() => {
            expect(container.querySelector("form")).not.toBeNull();
        })
    });

    it("Deck list", async () => {
        await act(async () => {
            root.render(<DeckList/>)
        })

        await waitFor(() => {
            expect(container.querySelector("div")).not.toBeNull();
        })
    });

    it("Header", async () => {
        await act(async () => {
            root.render(
                <MemoryRouter>
                    <Header/>
                </MemoryRouter>
            )
        })

        await waitFor(() => {
            expect(container.querySelector("a")).not.toBeNull();
        })
    });

    it("Logout", async () => {
        await act(async () => {
            root.render(<Logout/>)
        })

        await waitFor(() => {
            expect(container.querySelector("button")).not.toBeNull();
        })
    });

    it("New card", async () => {
        await act(async () => {
            root.render(<NewCard deckId="" onCardCreate={() => {}}/>)
        })

        await waitFor(() => {
            expect(container.querySelector("form")).not.toBeNull();
        })
    });
});