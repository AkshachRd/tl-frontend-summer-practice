import { useParams } from "react-router-dom";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { useBoundStore } from "@/store/store";
import { StudyType } from "@/model/study-type";
import { FlipCards } from "@/components/flip-cards";

export default function StudyDeckPage() {
  const params = useParams();

  const getDeck = useBoundStore((state) => state.getDeck);
  const getCards = useBoundStore((state) => state.getCards);

  const deckId = params.deckId;
  const studyType = params.studyType;

  const deck = getDeck(deckId ?? "");
  const cardsIds = deck?.cardIds ?? [];
  const cards = getCards(cardsIds);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1 className={title()}>Study deck</h1>
        {studyType === StudyType.FLIP_CARDS && <FlipCards cards={cards} />}
      </section>
    </DefaultLayout>
  );
}
