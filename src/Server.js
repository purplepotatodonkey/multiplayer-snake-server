/**
 * Server ingests in moves from multiple clients and calculates a final json of moves every half second in order to:
 * 1. Update the Board object by passing in the final json to the Board object
 * 2. If the Board indicates that the game has been won, then we end the game
 * 3. If the Board indicates that a player has been removed, then we inform the client that they have lost
 * 4. If game has not been won, we Send the Board object(for reference) to remaining clients
 */ 

class Server {
    constructor(board) {
        this.board = board;
        this.clients = [];
        this.receivedMoves = [];
        this.updatedMove;
    }

    /**
     * adds a player to the board, adds a new client
     */
    addClient(client) {
        this.board.addPlayer();
        this.clients.append(client);
        // ...
    }

    /**
     * adds move to receivedMoves, receives the move from a client
     * once a client sends in a move, we reject all other moves after the first
     */
    receiveMove() {
        
    }

    /**
     * process all received moves with some order/timestamp
     * calculate updated state
     * send in updated state to all remaining clients and to the Board object
     */
    updateMoves() {

    }

    /**
     * update a client that they have lost the game, while the game is still continuing(no one has won yet)
     * remove client from record, remove traces of client from Board
     */
    updateClientLostGame() {

    }

    /**
     * end the game
     * update all clients with winner of the game
     */
    updateClientWonGame() {

    }

    

}