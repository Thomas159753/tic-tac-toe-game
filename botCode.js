const AiTurn = (() => {
    const makeAIMove = () => {
        // Generate a random move for AI
        let move;
        do {
          move = Math.floor(Math.random() * 9);
        } while (board[move] !== "");
      
        // Make the AI move
        board[move] = AImove;
      
      };

      return{makeAIMove}
})()