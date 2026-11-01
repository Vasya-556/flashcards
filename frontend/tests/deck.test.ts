import { 
    describe, 
    it,
    expect,
    beforeAll
 } from "vitest";
import { deckServices } from "../src/services";
import { appConfig } from "../src/configs";

beforeAll(async () => {
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
});

describe("deck services", () => {
    it("CRUD", async () => {
        const name = "Test deck " + Date.now();

        const createDeck = await deckServices.createDeck(name);

        expect(createDeck.deck._id).toBeDefined();
        expect(createDeck.deck.name).toBeDefined();

        const deckId = createDeck.deck._id;

        const fetchedDeck = await deckServices.getDeck(deckId);

        expect(fetchedDeck.name).toBe(name);

        const decks = await deckServices.getDecks();

        expect(decks.some(
            (deck: { _id: string}) => deck._id === deckId
        )).toBe(true);

        const updatedName = `${name} updated`;

        await deckServices.updateDeck(deckId, updatedName);

        const updatedDeck = await deckServices.getDeck(deckId);

        expect(updatedDeck.name).toBe(updatedName);

        await deckServices.deleteDeck(deckId);

        const deletedDeck = await deckServices.getDeck(deckId);

        expect(deletedDeck).toBeNull();
    });
});