import { useNavigate } from "react-router-dom";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { useBoundStore } from "@/store/store";
import { DecksPanel } from "@/components/decks-panel";

export default function DecksPage() {
  const navigate = useNavigate();

  const decks = useBoundStore((state) => state.decks);
  const addDeck = useBoundStore((state) => state.addDeck);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1 className={title()}>Decks</h1>
        <DecksPanel
          decks={decks}
          onDeckPress={(deckId) => {
            navigate(`/decks/${deckId}`);
          }}
          onNewDeckPress={() => addDeck("New deck")}
        />
      </section>
    </DefaultLayout>
  );
}
