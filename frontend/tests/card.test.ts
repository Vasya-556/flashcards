import { 
    describe, 
    it,
    expect,
    beforeAll
 } from "vitest";
import { cardServices } from "../src/services";
import { appConfig } from "../src/configs";
import { cardTypes } from "../src/types";

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

describe("Card services", () => {
    it("CRUD", async () => {
        const deckId = "123456789012345678901234";
        const front = "Front " + Date.now();
        const back = "Back " + Date.now();

        const data: cardTypes.CardInput = {
            front: front,
            back: back,
            alwaysShowFront: false,
        }

        const createCard = await cardServices.createCard(deckId, data);

        expect(createCard.card._id).toBeDefined();

        const cardId = createCard.card._id;
        
        const fetchedCard = await cardServices.getCard(deckId, cardId);

        expect(fetchedCard.front).toBe(front);

        const cards = await cardServices.getCards(deckId);

        expect(cards.some(
            (card: { _id: string}) => card._id === cardId
        )).toBe(true);

        const updatedFront = `${front} updated`;
        
        await cardServices.updateCard(deckId, cardId, { front: updatedFront });
        
        const updatedCard = await cardServices.getCard(deckId, cardId);

        expect(updatedCard.front).toBe(updatedFront);

        await cardServices.deleteCard(deckId, cardId);
        
        const deletedCard = await cardServices.getCard(deckId, cardId);

        expect(deletedCard).toBeNull();
    });
});