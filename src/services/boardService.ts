import { ownerDocument } from "@mui/material";
import pb from "database/database";
import Collections from "enums/Collections";
import Board from "models/Board";
import Card from "models/Card";
import { FullListOptions, RecordOptions, RecordService } from "pocketbase";
import { promoteNestedObject } from "utils/EntityUtils";

const service: RecordService = pb.collection(Collections.BOARD);

export const createBoard = async (title: string, ownerId: string) => {
  const record = {
    title,
    cards: [],
    owner: ownerId
  };

  return service.create(record);
}

export const getAllBoards = async (ownerId: string, search: string = ''): Promise<Board[]> => {
  const options: FullListOptions = {
    filter: `owner='${ownerId}'${!!search ? `&&title~'${search}'` : ''}`,
  }

  return service.getFullList(options);
}

export const getBoard = async (ownerId: string, boardId: string): Promise<Board> => {
  const options: RecordOptions = {
    expand: 'cards, cards.categories',
    filter: `owner='${ownerId}'`,
  }

  const fetched = await service.getOne(boardId, options);
  const board = (!!fetched.expand ? promoteNestedObject(fetched, 'expand') : fetched);

  //@ts-ignore
  const expandedCards = board.cards.map(card => {
    //@ts-ignore
    if (!!card.expand) {
      return promoteNestedObject(card, 'expand') as unknown as Card;
    }

    return card;
  })

  const result: Board = {
    ...board,
    cards: expandedCards
  } as unknown as Board

  result.cards.sort((a, b) => a.order - b.order);

  return result;
}

export const updateBoard = async (id: string, board: Board) => {
  return service.update(id, board);
}

export const deleteBoard = async (id: string): Promise<boolean> => {
  return service.delete(id);
}