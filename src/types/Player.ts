
export enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
}


export interface Player {
    id: string;
    name: string;
    length: number;
    body: Array<[number, number]>;
    alive: boolean;
    currentDirection: Direction;
    score: number;

    getClientId(): string;
    getCurrentDirection(): Direction;
    getHeadLocation(): [number, number];
}