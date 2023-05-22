const AiTurn = (() => {
    const makeAIMove = () => {
        if (gamePlay.gameover()) return; // Stop AI move if the game is over
        
        // Generate a random move for AI
        let move;
        do {
          move = Math.floor(Math.random() * 9);
        } while (Gameboard.GetBoardFields(move) !== "");
      
        // Make the AI move
        gamePlay.gameRound(move);
      };

      return{makeAIMove}
})()