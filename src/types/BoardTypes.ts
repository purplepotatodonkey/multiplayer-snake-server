export interface Game {
  id: string;
  players: Player[];
  moves: { [playerId: number]: Direction };
  board: Board;
  started: boolean;
  ended: boolean;
  winner: Player;
  addPlayer: (player: Player) => void;
  removePlayer: (player: Player) => void;
  startGame: () => void;
  calculateNextFrame: () => Board;
  //As the game progresses, we could make the board smaller to make the game more intense
  shrinkBoard: () => void;
}

export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

export interface Board {
  id: string;
  rows: number;
  cols: number;
  map: number[][];
}

export interface Player {
  id: number;
  name: string;
  length: number;
  body: number[][];
  alive: boolean;
  direction: number;
  score: number;
}