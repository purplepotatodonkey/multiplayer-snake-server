import { Player, Direction } from './Player'


export enum Status {
  STARTED, 
  ENDED
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
  map: string[][];

  /**
   * @returns 
   */
  createGrid() : void;

  addPlayer() : void;

  quitPlayer() : void;

  replaceFood() : void;

  /**
   * @returns
   */
  wonGame() : boolean;

  /**
   * @param : move
   */
  updatePlayerLocation(move) : void;

}