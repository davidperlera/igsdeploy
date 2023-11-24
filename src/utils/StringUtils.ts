import CardStatus from "enums/CardStatus";

export const getTitleByStatus = (status: CardStatus) => {
    const capitalized = `${status.charAt(0).toUpperCase()}${status.slice(1).toLowerCase()}`;
    return capitalized.replaceAll('_', ' ');
}