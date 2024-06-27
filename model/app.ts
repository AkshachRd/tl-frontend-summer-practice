import { Deck } from "./deck";

export type AppState = {
    decks: Deck[];
};

export const moveDeck = (state: AppState, fromIndex: number, toIndex: number): AppState => {
    if (
        state.decks.length < 2 ||
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex > state.decks.length ||
        toIndex > state.decks.length
    ) {
        return state;
    }
    
    const newDecks = [...state.decks];

    [newDecks[toIndex], newDecks[fromIndex]] = [state.decks[fromIndex], state.decks[toIndex]];

    return { decks: newDecks };
};
export const getDeck = (state: AppState, id: string): Deck | undefined => state.decks.find((deck) => deck.id === id);
export const deleteDeck = (state: AppState, id: string): AppState =>
    ({ ...state, decks: state.decks.filter((deck) => deck.id !== id) });
