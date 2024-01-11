import { Status, Game, Board } from "./types/Game";
import { Direction, Player } from "./types/Player";

/**
 * Board is a class that the server will implement to organize the following material to a game board object:
 * n x n grid of values
 * locations of food on the grid
 * locations of each player on the board
 * */
export class BoardImpl implements Board {
    public id: string;
    public rows: number;
    cols: number;
    map: Array<Array<String>>;
    unoccupied: Array<[number, number]>;


    constructor(gridSize: number = 10) {
        this.rows, this.cols = gridSize;
        this.createGrid();
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.cols; j++){
                this.unoccupied.push([i, j]);
            }
        }
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
        // ensure that unoccupied locations is correct
    }

    /**
     * defines mapping of the Board to the n by n grid
     */
    createGrid(): void {
        for (let i = 0; i < this.rows; i++){
            this.map.push([])
            for (let j = 0; j < this.cols; j++){
                this.map[i].push('');
            }
        }
    }

    /**
     * adds a player to the board, with an initial length 1, to a location that optimizes game play of all snakes
     * this changes map
     */
    addPlayer(clientId: string): void {
        // randomly drop the snake to any 2x1 unoccupied location
        // remove this index from unoccupied
        const max: number = this.unoccupied.length;
        const randomLocationIndex: number = Math.floor(Math.random() * max);
        const renewedUnoccupied: Array<[number, number]>  = [];
        for (let i = 0; i < this.unoccupied.length; i++){
            if (i !== randomLocationIndex){
                renewedUnoccupied.push(this.unoccupied[i]);
            }
            else {
                const [xind, yind] : [number, number] = this.unoccupied[i];
                this.map[yind][xind] = clientId;
            }
        }
        this.unoccupied = renewedUnoccupied;
    }

    /**
     * removes the player from the board, taking out all traces of the snake on the board
     * this is done when a player loses the game(we can implement quits in the future)
     * this changes map
     */
    removePlayer(clientId : string): void {
        for (let row of this.map) {
            row = row.map((colIter) => {
                if (colIter === clientId) {
                    return '';
                }
                else {
                    return colIter;
                }
            });
        }

    }

    /**
     * once a food item has been consumed,remove the food item from the board and place a food item to a relocated place without any snakes
     * this changes map
     */
    replaceFood(clientId: string, location: [number, number]): void {
        // get rid of food in location
        const xind: number = location[0];
        const yind: number = location[1];
        this.map[yind][xind] = clientId;

        // calculate locations that are unoccupied
        // randomize to one of these locations
        // drop the food (represented by "X")
        const max: number = this.unoccupied.length;
        const randomLocationIndex: number = Math.floor(Math.random() * max);
        const renewedUnoccupied: Array<[number, number]> = [];
        for (let i = 0; i < this.unoccupied.length; i++) {
            if (i === randomLocationIndex) {
                renewedUnoccupied.push(this.unoccupied[i]);
            }
            else {
                const [xind, yind]: [number, number] = this.unoccupied[i];
                this.map[yind][xind] = 'X';
            }
        }
        this.unoccupied = renewedUnoccupied;
    }

    /**
     * determines if the game has been won
     * suggestion: either the whole board is full, the amount of remaining spaces is less than the score difference,...
     */
    wonGame(): boolean {
        // confirm with joseph how someone wins the game
        return true;
    }

    /**
     * updates board rep upon a move of a player
     * @param : move is a json containing moves of all existing players on board(we count no move as an empty move)
     */
    updatePlayerLocation(moves: Array<{player: Player, direction: Direction}>): void {
        // talk to joseph about this
        // remove any indices from unoccupied
    }


}