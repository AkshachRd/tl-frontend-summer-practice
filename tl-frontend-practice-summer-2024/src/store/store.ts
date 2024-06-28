import { create } from "zustand";

import { DeckSlice, createDeckSlice } from "./deck-slice";
import { CardSlice, createCardSlice } from "./card-slice";

export const useBoundStore = create<DeckSlice & CardSlice>()((...a) => ({
  ...createDeckSlice(...a),
  ...createCardSlice(...a),
}));
