import { Card } from "./card";

export type Deck = {
    id: string;
    name: string;
    cards: Card[];
};
 
export const createDeck = (name: string): Deck => ({id: `${new Date().getTime()}`, name, cards: []});
export const moveCard = (deck: Deck, fromIndex: number, toIndex: number): Deck => {
    if (
        deck.cards.length < 2 ||
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex > deck.cards.length ||
        toIndex > deck.cards.length
    ) {
        return deck;
    }

    const newCards = [...deck.cards];

    [newCards[toIndex], newCards[fromIndex]] = [deck.cards[fromIndex], deck.cards[toIndex]];

    return {
        ...deck,
        cards: newCards
    };
};
export const editDeck = (deck: Deck, name: string): Deck => ({
    ...deck,
    name
});
export const getCard = (deck: Deck, id: string): Card | undefined => deck.cards.find((card) => card.id === id);
export const deleteCard = (deck: Deck, id: string): Deck => ({ 
    ...deck,
    cards: deck.cards.filter((card) => card.id !== id)
});
  