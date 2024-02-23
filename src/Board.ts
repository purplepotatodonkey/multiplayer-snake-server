import { Status, Game, Board, Move } from "./types/Game";
import { Direction, Player } from "./types/Player";
import assert from 'assert';

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
    map: Array<Array<string>>;
    unoccupied: Array<[number, number]>;
    uniqueClients: Array<string>;


    constructor(gridSize: number = 50) {
        this.rows, this.cols = gridSize;
        this.createGrid();
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.cols; j++){
                this.unoccupied.push([i, j]);
            }
        }
        this.uniqueClients = [];
        
        // this.players = [];
        // this.food = [];
        // this.checkRep();
    }

    /**
     * ensures that board state is valid
     */
    checkRep(){
        // nothing for now
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
        this.uniqueClients.push(clientId);
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
        this.uniqueClients.filter((clientIdIter) => (clientIdIter !== clientId));

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
     * calculates next square for a player
     * returns a JSON message if there will be an error
     * player can either move forward or it loses the game because it crashed into another snake, itself, or the wall
     * 
     * @returns [xind, yind] of next player location if deemed valid. otherwise json string with error message
     * 
     */
    playerNextLocation(player: Player, direction: Direction) : {playerId: string, next: [number, number], message: string | null, eatsFood: boolean} {
        // first check that player is on the board
        assert(player.getClientId() in this.uniqueClients);

        const playerHeadLocation = player.getHeadLocation();
        const yind: number = playerHeadLocation[1];
        const xind: number = playerHeadLocation[0];
        assert(yind >= 0 && xind >= 0 && yind < this.cols && xind < this.rows);

        let eatsFood = false;

        let newLocation: [number, number];

        // check what the next space is on the board;
        switch (direction) {
            case Direction.UP:
                newLocation = [yind + 1, xind];
            case Direction.DOWN:
                newLocation = [yind - 1, xind];
            case Direction.LEFT:
                newLocation = [yind, xind - 1];
            case Direction.RIGHT:
                newLocation = [yind, xind + 1];;
        }

        // check to see if we ran into a wall
        try {
            this.map[newLocation[1]][newLocation[0]];
        }
        catch {
            // ran into wall
            return {playerId: player.getClientId(), next: newLocation, message: JSON.stringify({'error': 'ran into wall', 'direction': direction }), eatsFood: eatsFood};
        }
        // we didn't run into wall
        // check that next object is empty
        if (this.map[newLocation[1]][newLocation[0]] === '' || this.map[yind + 1][xind] === 'X') {
            if (this.map[yind + 1][xind] === 'X') {
                eatsFood = true;
            }
            return {playerId: player.getClientId(), next: [newLocation[0], newLocation[1]], message: null, eatsFood: eatsFood};
        }
        else {
            // ran into itself or another snake
            return { playerId: player.getClientId(), next: [newLocation[0], newLocation[1]], message: JSON.stringify({'error': 'ran into snake', 'direction': direction }), eatsFood: eatsFood};
        }

    }

    /**
     * updates board rep upon a move of a player
     * @param : move is a json containing moves of all existing players on board(we count no move as an empty move)
     */
    consolidatedMoves(moves: Array<{playerId: string, next: [number, number], message: string | null, eatsFood: boolean}>): 
        Map<string, { next: [number, number], message: string | null, eatsFood: boolean }> {

        const playersThatLost: Array<string> = [];
        const consolidatedMovesMap: Map<string, {next: [number, number], message: string | null, eatsFood: boolean}> = new Map();
        const newHeadLocations: Map<number, Array<string>> = new Map();

        // change to map
        const mappingPlayerToMoves: Map<string, {next: [number, number], message: string | null, eatsFood: boolean}> = new Map();
        for (let move of moves) {
            mappingPlayerToMoves.set(move.playerId, {next: move.next, message: move.message, eatsFood: move.eatsFood});
        }

        for (let move of moves) {
            // 1. get rid of all players where playerNextLocation returns a failing JSON message because of crashing into a wall
            if (typeof move.message === 'string') {
                // check that we ran into wall
                if (move.message['error'] === 'ran into wall') {
                    playersThatLost.push(move.playerId);
                }
                // 3. assess all players that do return failing messages from playerNextLocation and override if the snake is running into a tail and the snake didn't eat food
                else { // move.message['error'] === 'ran into snake'
                    // check who the player is bumping into
                    // check if that location is any player's tail and that the player didn't eat food
                    const bumpedPlayerId: string = this.map[move.next[0]][move.next[1]];
                    if (this.getPlayer(bumpedPlayerId).getTail() == move.next && !mappingPlayerToMoves[bumpedPlayerId].eatsFood) {
                        const yind: number = move.next[1];
                        const xind: number = move.next[0];

                        let locationIndex: number = yind * this.cols + xind;
                        if (newHeadLocations[locationIndex]) {
                            newHeadLocations.get(locationIndex)?.push(move.playerId);
                        }
                        else {
                            newHeadLocations.set(locationIndex, [move.playerId]);
                        }
                    }   
                    else {
                        playersThatLost.push(move.playerId); 
                    }
                }
            }
            else {
                const yind: number = move.next[1];
                const xind: number = move.next[0];
            
                let locationIndex: number = yind * this.cols + xind;
                if (locationIndex) {
                    newHeadLocations.get(locationIndex)?.push(move.playerId);
                }
                else {
                    newHeadLocations.set(locationIndex, [move.playerId]);
                }
                
            }
        }

        // 2. get rid of all players where playerNextLocation overlaps, i.e. two snake heads will clash
        newHeadLocations.forEach((playerIds, index) => {
            if (playerIds.length > 1) {
                for (let playerId of playerIds) {
                    if (!(playerId in playersThatLost)) {
                        playersThatLost.push(playerId);
                    }
                }
            }
        });
        

        for (let move of moves) {
            if (!(move.playerId in playersThatLost)) {
                consolidatedMovesMap.set(move.playerId, {next: move.next, message: move.message, eatsFood: move.eatsFood});
            }
        }

        return consolidatedMovesMap;

    }


}