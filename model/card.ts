export type Card = {
    id: string;
    frontside: string;
    backside: string;
};

export const createCard = (frontside: string, backside: string): Card => ({
    id: `${new Date().getTime()}`,
    frontside,
    backside
});
export const editCard = (card: Card, frontside: string, backside: string): Card => ({
    ...card,
    frontside,
    backside
});