import { Card, CardBody } from "@nextui-org/card";

import { PlusIcon } from "./icons";
import { Deck } from "./deck";

export type DecksPanelProps = {
  onNewDeckPress?: () => void;
  onDeckPress?: (deckId: string) => void;
  decks: {
    id: string;
    name: string;
  }[];
};

export const DecksPanel = ({
  onNewDeckPress,
  onDeckPress,
  decks,
}: DecksPanelProps) => {
  return (
    <section className="grid grid-cols-5 gap-5">
      {onNewDeckPress && (
        <Card isPressable onPress={onNewDeckPress}>
          <CardBody className="flex flex-row justify-center items-center gap-3 ">
            <PlusIcon />
          </CardBody>
        </Card>
      )}
      {decks.map((deck) => (
        <Deck
          key={deck.id}
          name={deck.name}
          onPress={() => onDeckPress?.(deck.id)}
        />
      ))}
    </section>
  );
};
