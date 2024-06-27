import { Card, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { useNavigate, useParams } from "react-router-dom";

import CardStack from "@/components/card-wrapper";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { useBoundStore } from "@/store/store";

export default function TrainPage() {
  const params = useParams();
  const navigate = useNavigate();

  const getDeck = useBoundStore((state) => state.getDeck);
  const getCards = useBoundStore((state) => state.getCards);

  const deckId = params.deckId;

  debugger;

  if (deckId === undefined) {
    navigate("/decks");

    return null;
  }
  const deck = getDeck(deckId);
  const cardIds = deck?.cardIds ?? [];
  const cards = getCards(cardIds);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Train</h1>
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
        </div>
      </section>
    </DefaultLayout>
  );
}
