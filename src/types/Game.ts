import { Player, Direction } from './Player'


export enum Status {
  STARTED, 
  ENDED
}

export interface Move {
  playerId: number;
  direction: Direction;
}

export interface Game {
  id: string;
  players: Player[];
  moves: { [playerId: number]: Direction };
  board: Board;
  state: Status;
  winner: Player;

  /**
   * @param player 
   * @returns 
   */
  addPlayer: (player: Player) => void;

  /**
   * @param player 
   * @returns 
   */
  removePlayer: (player: Player) => void;


  /**
   * @returns 
   */
  startGame: () => void;

  /**
   * @returns 
   */
  calculateNextFrame: () => Board;

  /**
   * As the game progresses, we could make the board smaller to make the game more intense
   * @returns 
   */
  shrinkBoard: () => void;
}


export interface Board {
  id: string;
  rows: number;
  cols: number;
  map: Array<Array<string>>;
  uniqueClients: Array<string>;

  createGrid() : void;

  addPlayer(clientId: string) : void;

  removePlayer(clientId: string) : void;

  replaceFood(clientId: string, location: [number, number]) : void;

  wonGame() : boolean;

  playerNextLocation(player: Player, direction: Direction): { playerId: string, next: [number, number], message: string | null, eatsFood: boolean };

  consolidatedMoves(moves: Array<{ playerId: string, next: [number, number], message: string | null, eatsFood: boolean }>): void

}