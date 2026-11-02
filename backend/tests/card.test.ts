import {
    describe,
    it,
    expect,
    beforeAll,
    afterAll,
} from "vitest";
import { cardServices, deckServices } from "../src/services/index.js";
import { cardModel, deckModel } from "../src/models/index.js";
import mongoose from "mongoose";
import { db } from "../src/models/index.js";

const userId = new mongoose.Types.ObjectId().toString();
let deckId: string;
const nonExistingId= new mongoose.Types.ObjectId().toString();
const cardData = {
    front: "Front",
    back: "Back",
    alwaysShowFront: true,
}
const updatedCardData = {
    front: "Front 2",
    back: "Back 2",
    alwaysShowFront: false,
}

beforeAll(async () => {
    await db.connectDatabase();
    const deck = await deckServices.postDeck(userId, "Test deck")
    deckId = deck._id.toString();
})

afterAll(async () => {
    await cardModel.Card.deleteMany({
        deck: deckId
    });
    await deckServices.deleteDeck(userId, deckId);
    await db.disconnectDatabase();
});

const getCardId = async (): Promise<string> => {
    const created = await cardServices.postCard(userId, deckId, cardData);
    
    if(!created){
        throw new Error("Card creation failed");
    }

    return created._id.toString();
}

describe("Cards", () => {
    it("Create a card", async () => {
        const card = await cardServices.postCard(userId, deckId, cardData);

        expect(card?.front).toBe(cardData.front);
    });

    it("Get a card", async () => {
        const cardId = await getCardId();
        const card = await cardServices.getCard(userId, deckId, cardId);

        expect(card?._id.toString()).toBe(cardId);
    });

    it("Get a card with incorrect card id", async () => {
        const card = await cardServices.getCard(userId, deckId, nonExistingId);

        expect(card).toBeNull();
    });

    it("Get a card with incorrect deck id", async () => {
        const cardId = await getCardId();

        const card = await cardServices.getCard(userId, nonExistingId, cardId);
        
        expect(card).toBeNull();
    });

    it("Get a card with incorrect user id", async () => {
        const cardId = await getCardId();

        const card = await cardServices.getCard(nonExistingId, deckId, cardId);
        
        expect(card).toBeNull();
    });

    it("Get all cards", async () => {
        const cards = await cardServices.getCards(userId, deckId);

        expect(Array.isArray(cards)).toBe(true);
        expect(cards).not.toBeNull();
    });

    it("Update a card", async () => {
        const cardId = await getCardId();

        const updated = await cardServices.patchCard(userId, deckId, cardId, updatedCardData);
        expect(updated?.front).toBe(updatedCardData.front);
    });

    it("Update a card with incorrect card id", async () => {
        const updated = await cardServices.patchCard(userId, deckId, nonExistingId, updatedCardData);
        expect(updated).toBeNull();
    });

    it("Update a card with incorrect deck id", async () => {
        const cardId = await getCardId();

        const updated = await cardServices.patchCard(userId, nonExistingId, cardId, updatedCardData);
        expect(updated).toBeNull();
    });

    it("Update a card with incorrect user id", async () => {
        const cardId = await getCardId();

        const updated = await cardServices.patchCard(nonExistingId, deckId, cardId, updatedCardData);
        expect(updated).toBeNull();
    });

    it("Delete a card", async () => {
        const cardId = await getCardId();

        const deleted = await cardServices.deleteCard(userId, deckId, cardId);

        expect(deleted?._id.toString()).toBe(cardId);
        expect(await cardServices.getCard(userId, deckId, cardId)).toBeNull();
    });

    it("Delete a card with incorrect card id", async () => {
        const cardId = await getCardId();

        const deleted = await cardServices.deleteCard(userId, deckId, nonExistingId);

        expect(deleted).toBeNull();
    });

    it("Delete a card with incorrect deck id", async () => {
        const cardId = await getCardId();

        const deleted = await cardServices.deleteCard(userId, nonExistingId, cardId);

        expect(deleted).toBeNull();
    });

    it("Delete a card with incorrect user id", async () => {
        const cardId = await getCardId();

        const deleted = await cardServices.deleteCard(nonExistingId, deckId, cardId);

        expect(deleted).toBeNull();
    });

    it("Change progress", async () => {
        const cardId = await getCardId();

        await cardServices.changeProgress(userId, deckId, cardId, 1);
        let card = await cardServices.getCard(userId, deckId, cardId);

        expect(card?.progress).toBe(1);

        await cardServices.changeProgress(userId, deckId, cardId, -1);
        card = await cardServices.getCard(userId, deckId, cardId);

        expect(card?.progress).toBe(0);
    });
});