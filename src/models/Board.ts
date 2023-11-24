import Card from "./Card";
import Entity from "./Entity";
import User from "./Users";

interface Board extends Entity{
    title: string;
    cards: Card[];
    owner: User;
}

export default Board;