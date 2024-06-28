import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { useBoundStore } from "@/store/store";
import { SelectStudyType } from "@/components/select-study-type";
import { StudyType } from "@/model/study-type";
import { DecksPanel } from "@/components/decks-panel";

export default function StudyPage() {
  const params = useParams();
  const navigate = useNavigate();

  const decks = useBoundStore((state) => state.decks);

  const [studyType, setStudyType] = useState<StudyType | undefined>(undefined);

  const deckId = params.deckId;

  const navigateToStudyDeck = (
    currentDeckId: string,
    currentStudyType: StudyType
  ) => navigate(`/study/${currentDeckId}/${currentStudyType}`);

  const onSelectStudyTypeHandler = (type: StudyType) => {
    if (deckId !== undefined) {
      navigateToStudyDeck(deckId, type);

      return;
    }

    setStudyType(type);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1 className={title()}>Study</h1>
        {studyType === undefined ? (
          <SelectStudyType
            onSelect={(type) => onSelectStudyTypeHandler(type)}
          />
        ) : (
          deckId === undefined && (
            <DecksPanel
              decks={decks}
              onDeckPress={(deckId) => navigateToStudyDeck(deckId, studyType)}
            />
          )
        )}
      </section>
    </DefaultLayout>
  );
}
