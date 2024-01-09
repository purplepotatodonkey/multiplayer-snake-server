
export enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
}


export interface Player {
    id: number;
    name: string;
    length: number;
    body: number[][];
    alive: boolean;
    currentDirection: Direction;
    score: number;
}