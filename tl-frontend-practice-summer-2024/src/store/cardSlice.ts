import { StateCreator } from "zustand";
import { nanoid } from "nanoid";

import { DeckSlice } from "./deckSlice";

import { Card } from "@/model/card";

export type CardSlice = {
  cards: Card[];
  addCard: (deckId: string, frontside: string, backside: string) => void;
  editCard: (id: string, frontside: string, backside: string) => void;
  deleteCard: (id: string) => void;
  getCard: (id: string) => Card | undefined;
  getCards: (ids: string[]) => Card[];
};

export const createCardSlice: StateCreator<
  DeckSlice & CardSlice,
  [],
  [],
  CardSlice
> = (set, get) => ({
  cards: [],
  addCard: (deckId: string, frontside: string, backside: string) => {
    const cardId = nanoid();

    return set((state) => ({
      cards: [...state.cards, { id: cardId, frontside, backside }],
      decks: state.decks.map((deck) =>
        deck.id === deckId
          ? { ...deck, cardIds: [...deck.cardIds, cardId] }
          : deck
      ),
    }));
  },
  editCard: (id: string, frontside: string, backside: string) =>
    set((state) => ({
      cards: state.cards.map((card) =>
        card.id === id ? { ...card, frontside, backside } : card
      ),
    })),
  deleteCard: (id: string) =>
    set((state) => ({ cards: state.cards.filter((card) => card.id !== id) })),
  getCard: (id: string) => get().cards.find((card) => card.id === id),
  getCards: (ids: string[]) =>
    get().cards.filter((card) => ids.includes(card.id)),
});
