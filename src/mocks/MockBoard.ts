import Board from "models/Board";
import MockEntity from "./MockEntity";
import MockUser from "./MockUser";

const MockBoard: Board = {
  ...MockEntity,
  cards: [],
  owner: MockUser,
  title: '',
};

export default MockBoard;