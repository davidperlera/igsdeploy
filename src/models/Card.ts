import CardStatus from "enums/CardStatus";
import Category from "./Category";
import Entity from "./Entity";

interface Card extends Entity{
    title: string;
    description: string;
    categories: Category[];
    status: CardStatus;
    order: number;
}

export default Card;