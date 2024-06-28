import { Route, Routes } from "react-router-dom";

import StudyDeckPage from "@/pages/study-deck";
import IndexPage from "@/pages/index";
import DeckPage from "@/pages/deck";
import PricingPage from "@/pages/pricing";
import DecksPage from "@/pages/decks";
import StudyPage from "@/pages/study";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<DecksPage />} path="/decks" />
      <Route element={<StudyDeckPage />} path="/study/:deckId/:studyType" />
      <Route element={<StudyPage />} path="/study/:deckId" />
      <Route element={<StudyPage />} path="/study" />
      <Route element={<DeckPage />} path="/decks/:deckId" />
    </Routes>
  );
}

export default App;
