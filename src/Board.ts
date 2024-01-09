import { Direction, Player } from "./types/BoardTypes";

/**
 * Board is a class that the server will implement to organize the following material to a game board object:
 * n x n grid of values
 * locations of food on the grid
 * locations of each player on the board
 * */
class Board implements Board {
    id: string;
    players: Player[];
    moves: { [playerId: number]: Direction };
    board: Board;
    started: boolean;
    ended: boolean;
    winner: Player;

    constructor() {
        // this.length = gridSize;
        // this.width = gridSize;
        // this.map = this.createGrid(gridSize);
        // this.players = [];
        // this.food = [];
        // this.checkRep();
    }

    /**
     * ensures that board state is valid
     */
    checkRep(){
        // ensure that gridSize is big enough for maxPlayer
        // ensure that len(this.players) 
    }

    /**
     * defines mapping of the Board to the n by n grid
     */
    createGrid(){

    }

    /**
     * adds a player to the board, with an initial length of some small number, to a location that optimizes game play of all snakes
     * this changes map
     */
    addPlayer(){

    }

    /**
     * removes the player from the board, taking out all traces of the snake on the board
     * this is done when a player loses the game(we can implement quits in the future)
     * this changes map
     */
    quitPlayer() {

    }

    
    /**
     * once a food item has been consumed,remove the food item from the board and place a food item to a relocated place without any snakes
     * this changes map
     */
    replaceFood() {

    }

    /**
     * determines if the game has been won
     * suggestion: either the whole board is full, the amount of remaining spaces is less than the score difference,...
     */
    wonGame() {

    }

    /**
     * updates board rep upon a move of a player
     * @param : move is a json containing moves of all existing players on board(we count no move as an empty move)
     */
    updatePlayerLocation(move) {

    }


}