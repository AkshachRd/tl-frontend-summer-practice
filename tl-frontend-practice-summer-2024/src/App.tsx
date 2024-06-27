import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DeckPage from "@/pages/deck";
import PricingPage from "@/pages/pricing";
import DecksPage from "@/pages/decks";
import TrainPage from "@/pages/train";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<DecksPage />} path="/decks" />
      <Route element={<TrainPage />} path="/train/:deckId" />
      <Route element={<DeckPage />} path="/decks/:deckId" />
    </Routes>
  );
}

export default App;
