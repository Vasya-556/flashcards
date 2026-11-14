import { fetchAPI } from "../api/api";
import { cardTypes } from "../types";

const baseUrl = "/card";

const getCard = (deckId: string, cardId: string) => {
    return fetchAPI({
        url: `${baseUrl}/${deckId}/${cardId}`,
        method: "GET",
    });
};

const getCards = (deckId: string) => {
    return fetchAPI({
        url: `${baseUrl}/${deckId}`,
        method: "GET",
    });
};

const createCard = (deckId: string, card: cardTypes.CardInput) => {
    return fetchAPI({
        url: `${baseUrl}/${deckId}`,
        method: "POST",
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
        method: "DELETE",
    });
};

const importCards = (deckId: string, data: File) => {
    const formData = new FormData();
    formData.append("cards", data);

    return fetchAPI({
        url: `${baseUrl}/${deckId}/import`,
        method: "POST",
        body: formData,
    })
}

export {
    getCard,
    getCards,
    createCard,
    updateCard,
    increaseProgress,
    decreaseProgress,
    deleteCard,
    importCards,
};