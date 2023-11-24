import pb from "database/database";
import CardStatus from "enums/CardStatus";
import Collections from "enums/Collections";
import Card from "models/Card";
import { RecordService } from "pocketbase";

const service: RecordService = pb.collection(Collections.CARD);

export const createCard = async (title: string, description: string, categories: string[], status: CardStatus, order: number) => {
  const record = {
    title,
    description,
    categories,
    status,
    order
  };

  return service.create(record);
}

export const updateCard = (card: Card) => {
  return service.update(card.id, card);
}

export const deleteCard = async (id: string): Promise<boolean> => {
  return service.delete(id);
}