import { Board, Move } from "./Game";

// Documentation: https://socket.io/docs/v4/typescript/

export interface ServerToClientEvents {
  noArg: () => void;
  sendBoard: (board: Board, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
  sendMove: (move: Move) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}