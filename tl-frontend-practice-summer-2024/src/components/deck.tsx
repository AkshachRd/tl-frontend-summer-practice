import { Card, CardBody } from "@nextui-org/card";

import { DeckIcon } from "./icons";

export type DeckProps = {
  name: string;
  onPress?: () => void;
};

export const Deck = ({ name, onPress }: DeckProps) => {
  return (
    <Card isPressable fullWidth={false} onPress={onPress}>
      <CardBody className="w-auto flex flex-row flex-shrink-0 justify-start items-center gap-3 ">
        <DeckIcon />
        <h3 className="truncate">{name}</h3>
      </CardBody>
    </Card>
  );
};
