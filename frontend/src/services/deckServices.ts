import { fetchAPI } from "../api/api";

const baseUrl = "/deck";

const getDeck = (deckId: string) => {
    return fetchAPI({
        url: `${baseUrl}/${deckId}`,
        method: "get"
    });
};

const getDecks = () => {
    return fetchAPI({
        url: `${baseUrl}`,
        method: "get"
    });
};

const createDeck = (name: string) => {
    return fetchAPI({
        url: `${baseUrl}`,
        method: "post",
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
        method: "delete",
    });
};

export {
    getDeck,
    getDecks,
    createDeck,
    updateDeck,
    deleteDeck,
};