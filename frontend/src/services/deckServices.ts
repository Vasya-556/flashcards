import { fetchAPI } from "../api/api";

const baseUrl = "/deck";

const getDeck = (deckId: string) => {
    return fetchAPI({
        url: `${baseUrl}/${deckId}`,
        method: "GET"
    });
};

const getDecks = () => {
    return fetchAPI({
        url: `${baseUrl}`,
        method: "GET"
    });
};

const createDeck = (name: string) => {
    return fetchAPI({
        url: `${baseUrl}`,
        method: "POST",
        body: { name: name },
    });
};

const updateDeck = (deckId: string, name: string) => {
    return fetchAPI({
        url: `${baseUrl}/${deckId}`,
        method: "PATCH",
        body: { name: name },
    });
};

const deleteDeck = (deckId: string) => {
    return fetchAPI({
        url: `${baseUrl}/${deckId}`,
        method: "DELETE",
    });
};

export {
    getDeck,
    getDecks,
    createDeck,
    updateDeck,
    deleteDeck,
};