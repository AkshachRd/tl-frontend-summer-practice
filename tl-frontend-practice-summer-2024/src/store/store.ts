import { create } from "zustand";

import { DeckSlice, createDeckSlice } from "./deckSlice";
import { CardSlice, createCardSlice } from "./cardSlice";

export const useBoundStore = create<DeckSlice & CardSlice>()((...a) => ({
  ...createDeckSlice(...a),
  ...createCardSlice(...a),
}));
