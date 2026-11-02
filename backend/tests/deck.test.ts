import {
    describe,
    it,
    expect,
    beforeAll,
    afterAll,
} from "vitest";
import { deckServices } from "../src/services/index.js";
import { 
    deckModel,
    cardModel,
 } from "../src/models/index.js";
import mongoose from "mongoose";
import { db } from "../src/models/index.js";

const ownerId = new mongoose.Types.ObjectId().toString();
const nonExistingId= new mongoose.Types.ObjectId().toString();
const deckName = "Test deck";
const updatedName = "Updated";

beforeAll(async () => {
    await db.connectDatabase();
})

afterAll(async () => {
    await deckModel.Deck.deleteMany({
        owner: ownerId
    });
    await db.disconnectDatabase();
});

describe("Decks", () => {
    it("Create a deck", async () => {
        const deck = await deckServices.postDeck(ownerId, deckName);

        expect(deck.name).toBe(deckName);
        expect(deck.owner.toString()).toBe(ownerId);
    });

    it("Get deck", async () => {
        const created = await deckServices.postDeck(ownerId, deckName);

        const deck = await deckServices.getDeck(ownerId, created._id.toString());

        expect(deck?._id.toString()).toBe(created._id.toString());
    });

    it("Get deck with incorrect id", async () => {
        const deck = await deckServices.getDeck(ownerId, nonExistingId);
        
        expect(deck).toBeNull();
    });

    it("Get another user deck", async () => {
        const deck = await deckServices.getDeck(nonExistingId, nonExistingId);
        
        expect(deck).toBeNull();
    });

    it("Get all decks", async () => {
        const decks = await deckServices.getDecks(ownerId);
        
        expect(Array.isArray(decks)).toBe(true);
        expect(decks).not.toBeNull();
    });

    it("Update a deck", async () => {
        const created = await deckServices.postDeck(ownerId, deckName);
        
        const updated = await deckServices.patchDeck(ownerId, created._id.toString(), updatedName);

        expect(updated?.name).toBe(updatedName);
    });

    it("Update deck of another user", async () => {
        const created = await deckServices.postDeck(ownerId, deckName);
        
        const updated = await deckServices.patchDeck(nonExistingId, created._id.toString(), updatedName);

        expect(updated).toBeNull();
    });

    it("Update non existing deck", async () => {
        const updated = await deckServices.patchDeck(ownerId, nonExistingId, updatedName);
        
        expect(updated).toBeNull();
    });

    it("Delete a deck", async () => {
        const created = await deckServices.postDeck(ownerId, deckName);
        
        const deleted = await deckServices.deleteDeck(ownerId, created._id.toString());
        
        expect(deleted?._id.toString()).toBe(created._id.toString());
        expect(await deckServices.getDeck(ownerId, created._id.toString())).toBeNull();
    });

    it("Delete another user deck", async () => {
        const created = await deckServices.postDeck(ownerId, deckName);
        
        const deleted = await deckServices.deleteDeck(nonExistingId, created._id.toString());
        
        expect(deleted).toBeNull();
        expect(await deckServices.getDeck(ownerId, created._id.toString())).not.toBeNull();
    });

    it("Delete non existing deck", async () => {
        const deleted = await deckServices.deleteDeck(ownerId, nonExistingId);
        
        expect(deleted).toBeNull();
    });

    it("Delte cards when deleting deck", async () => {
        const created = await deckServices.postDeck(ownerId, deckName);
        
        await cardModel.Card.create({deck: created._id,front: "1",back: "2",});

        await deckServices.deleteDeck(ownerId, created._id.toString());

        expect(await cardModel.Card.countDocuments({ deck: created._id})).toBe(0);
    });
});