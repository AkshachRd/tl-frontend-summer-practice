import type { Card as CardType } from "../model/card";

import { Card, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

import CardStack from "./card-wrapper";

export type FlipCardsProps = {
  cards: CardType[];
};

export const FlipCards = ({ cards }: FlipCardsProps) => {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <CardStack className="relative py-8 grid mx-auto">
        {cards.map((card) => (
          <Card key={card.id}>
            <CardBody className="flex flex-col items-center justify-evenly w-[250px] aspect-[3/4] p-5">
              <p>{card.frontside}</p>
              <Divider />
              <p>{card.backside}</p>
            </CardBody>
          </Card>
        ))}
      </CardStack>
    </section>
  );
};
