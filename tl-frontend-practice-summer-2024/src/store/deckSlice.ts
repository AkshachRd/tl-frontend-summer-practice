import { StateCreator } from "zustand";
import { nanoid } from "nanoid";

import { CardSlice } from "./cardSlice";

type Deck = {
  id: string;
  name: string;
  cardIds: string[];
};

export type DeckSlice = {
  decks: Deck[];
  moveCard: (deckId: string, fromIndex: number, toIndex: number) => void;
  moveDeck: (fromIndex: number, toIndex: number) => void;
  addDeck: (name: string) => void;
  editDeck: (id: string, name: string) => void;
  deleteDeck: (id: string) => void;
  getDeck: (id: string) => Deck | undefined;
};

export const createDeckSlice: StateCreator<
  DeckSlice & CardSlice,
  [],
  [],
  DeckSlice
> = (set, get) => ({
  decks: [],
  moveCard: (deckId: string, fromIndex: number, toIndex: number) =>
    set((state) => {
      const deck = state.getDeck(deckId);
      const cardIds = deck?.cardIds;

      if (
        cardIds === undefined ||
        cardIds.length < 2 ||
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex > cardIds.length ||
        toIndex > cardIds.length
      ) {
        return {};
      }

      const newCardIds = [...cardIds];

      [newCardIds[toIndex], newCardIds[fromIndex]] = [
        cardIds[fromIndex],
        cardIds[toIndex],
      ];

      return {
        decks: state.decks.map((newDeck) =>
          newDeck.id === deckId ? { ...newDeck, cardIds: newCardIds } : newDeck
        ),
      };
    }),
  moveDeck: (fromIndex: number, toIndex: number) =>
    set((state) => {
      const newDecks = [...state.decks];

      if (
        newDecks.length < 2 ||
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex > newDecks.length ||
        toIndex > newDecks.length
      ) {
        return {};
      }

      [newDecks[toIndex], newDecks[fromIndex]] = [
        state.decks[fromIndex],
        state.decks[toIndex],
      ];

      return { decks: newDecks };
    }),
  addDeck: (name: string) =>
    set((state) => ({
      decks: [{ id: nanoid(), name, cardIds: [] }, ...state.decks],
    })),
  editDeck: (id: string, name: string) =>
    set((state) => ({
      decks: state.decks.map((deck) =>
        deck.id === id ? { ...deck, name } : deck
      ),
    })),
  deleteDeck: (id: string) =>
    set((state) => ({ decks: state.decks.filter((deck) => deck.id !== id) })),
  getDeck: (id: string) => get().decks.find((deck) => deck.id === id),
});
