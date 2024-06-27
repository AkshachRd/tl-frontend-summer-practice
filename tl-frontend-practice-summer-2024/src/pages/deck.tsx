import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useDisclosure } from "@nextui-org/modal";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@nextui-org/input";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { useBoundStore } from "@/store/store";
import { PlusIcon, VerticalDotsIcon } from "@/components/icons";
import { CardModal } from "@/components/card-modal";

export default function DeckPage() {
  const navigate = useNavigate();
  const params = useParams();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentCardId, setCurrentCardId] = useState("");
  const [frontside, setFrontside] = useState("");
  const [backside, setBackside] = useState("");

  const clearCardData = () => {
    setFrontside("");
    setBackside("");
    setCurrentCardId("");
  };

  const saveCard = () => {
    editCard(currentCardId, frontside, backside);
    clearCardData();
  };

  const createCard = () => {
    addCard(deckId, frontside, backside);
    clearCardData();
  };

  const getDeck = useBoundStore((state) => state.getDeck);
  const deleteDeck = useBoundStore((state) => state.deleteDeck);
  const getCards = useBoundStore((state) => state.getCards);
  const getCard = useBoundStore((state) => state.getCard);
  const editDeck = useBoundStore((state) => state.editDeck);
  const editCard = useBoundStore((state) => state.editCard);
  const deleteCard = useBoundStore((state) => state.deleteCard);
  const addCard = useBoundStore((state) => state.addCard);

  const deckId = params.deckId ?? "";
  const deck = getDeck(deckId);
  const cardIds = deck?.cardIds ?? [];
  const cards = getCards(cardIds) ?? [];

  const handleAction = (key: string | number) => {
    if (typeof key === "number") {
      return;
    }

    const [action, cardId] = key.split("-");

    switch (action) {
      case "edit":
        const card = getCard(cardId);

        setFrontside(card?.frontside ?? "");
        setBackside(card?.backside ?? "");
        setCurrentCardId(cardId);
        onOpen();
        break;

      case "delete":
        deleteCard(cardId);
        break;
      default:
        break;
    }
  };

  const content = cards.map((card) => (
    <TableRow key={card.id}>
      <TableCell>{card.frontside}</TableCell>
      <TableCell>{card.backside}</TableCell>
      <TableCell>
        <div className="relative flex justify-center items-center gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <VerticalDotsIcon className="text-default-300" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu onAction={handleAction}>
              <DropdownItem key={`edit-${card.id}`}>Edit</DropdownItem>
              <DropdownItem
                key={`delete-${card.id}`}
                className="text-danger"
                color="danger"
              >
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </TableCell>
    </TableRow>
  ));

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1 className={title()}>Deck</h1>
        <div className="w-full flex items-center justify-between">
          <Input
            className="w-48"
            defaultValue={deck?.name}
            fullWidth={false}
            label={"Name"}
            onValueChange={(value) => editDeck(deckId, value)}
          />
          <fieldset className="flex gap-4">
            <Button
              onPress={() => {
                navigate(`/train/${deckId}`);
              }}
            >
              Train
            </Button>
            <Button
              color="danger"
              onPress={() => {
                deleteDeck(deckId);
                navigate("/decks");
              }}
            >
              Delete
            </Button>
          </fieldset>
        </div>
        <Table fullWidth aria-label="Example table with dynamic content">
          <TableHeader>
            <TableColumn>FRONT SIDE</TableColumn>
            <TableColumn>BACK SIDE</TableColumn>
            <TableColumn align="center" width={1}>
              ACTIONS
            </TableColumn>
          </TableHeader>
          <TableBody items={cards}>{content}</TableBody>
        </Table>
        <Button
          fullWidth
          color="primary"
          variant="ghost"
          onPress={() => {
            onOpen();
          }}
        >
          <PlusIcon />
        </Button>
        <CardModal
          backside={backside}
          frontside={frontside}
          isOpen={isOpen}
          title={currentCardId ? "Editing card" : "Creating card"}
          onBacksideChange={setBackside}
          onFrontsideChange={setFrontside}
          onOpenChange={onOpenChange}
          onSave={currentCardId ? saveCard : createCard}
        />
      </section>
    </DefaultLayout>
  );
}
