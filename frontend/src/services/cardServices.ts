import { fetchAPI } from "../api/api";
import { cardTypes } from "../types";

const baseUrl = "/card";

const getCard = (deckId: string, cardId: string) => {
    return fetchAPI({
        url: `${baseUrl}/${deckId}/${cardId}`,
        method: "get",
    });
};

const getCards = (deckId: string) => {
    return fetchAPI({
        url: `${baseUrl}/${deckId}`,
        method: "get",
    });
};

const createCard = (deckId: string, card: cardTypes.CardInput) => {
    return fetchAPI({
        url: `${baseUrl}/${deckId}`,
        method: "post",
        body: card
    });
};

const updateCard = (deckId: string, cardId: string, card: Partial<cardTypes.CardInput>) => {
    return fetchAPI({
        url: `${baseUrl}/${deckId}/${cardId}`,
        method: "PATCH",
        body: card
    });
};

const increaseProgress = (deckId: string, cardId: string) => {
    return fetchAPI({
        url: `${baseUrl}/${deckId}/${cardId}/increase`,
        method: "PATCH",
    });
};

const decreaseProgress = (deckId: string, cardId: string) => {
    return fetchAPI({
        url: `${baseUrl}/${deckId}/${cardId}/decrease`,
        method: "PATCH",
    });
};

const deleteCard = (deckId: string, cardId: string) => {
    return fetchAPI({
        url: `${baseUrl}/${deckId}/${cardId}`,
        method: "delete",
    });
};

export {
    getCard,
    getCards,
    createCard,
    updateCard,
    increaseProgress,
    decreaseProgress,
    deleteCard
};