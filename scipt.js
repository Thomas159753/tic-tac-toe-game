"use strict";

// Player module
const player = (sign) => {
    const playerSign = sign;

    const PlayerSign = () => {
        return playerSign;
    };

    return { PlayerSign };
};

// Gameboard module
const Gameboard = (() => {
    let botEnable = false;
    const Board = ["", "", "", "", "", "", "", "", ""];

    const boardField = (index, Symbol) => {
        if (index > Board.length) return;
        Board[index] = Symbol;
        return Board;
    };

    const GetBoardFields = (index) => {
        if (index > Board.length) return;
        return Board[index];
    };

    const restart = () => {
        for (let i = 0; i < Board.length; i++) {
            Board[i] = "";
        }
    };

    const GameField = document.querySelectorAll(".field");
    const restartButton = document.getElementById("restart");
    const AiButton = document.getElementById("Bot_Button")

    GameField.forEach((field) =>

     // Add click event listeners to game fields
        field.addEventListener("click", (e) => {
            if (e.target.textContent !== "" || gamePlay.gameover()) return;
            gamePlay.gameRound(parseInt(e.target.dataset.index));
            updateGameboard();
            if (!gamePlay.gameover() && botEnable === true) {
                AiTurn.makeAIMove();
                updateGameboard();
            }
        })
    );

     // Add click event listener to restart button
    restartButton.addEventListener("click", () => {
        restart();
        updateGameboard();
        displayText("restart");
        gamePlay.roundReset();
        botEnable = false;
    });

    // Add click event listener to Bott Button
    AiButton.addEventListener("click", () => {
        restart();
        updateGameboard();
        displayText("restart");
        gamePlay.roundReset();
        botEnable = true
    });

    // Update the gameboard display
    const updateGameboard = () => {
        for (let i = 0; i < GameField.length; i++) {
            GameField[i].textContent = GetBoardFields(i);
        }
    };

    return { boardField, GetBoardFields };
})();


// Gameplay module
const gamePlay = (() => {

    const playerOne = player("X");
    const playerTwo = player("O");

    let round = 1;
    let gamestate = false

    const gameRound = (fieldIndex) => {
        Gameboard.boardField(fieldIndex, playerTurn());

        // Check if the current player is the winner
        if (Winner.checkWinner()) {
            displayText("winner");
            gamestate = true
            return
        }
        round++
        if (round > 9){
            displayText("draw")
            gamestate = true
            return
        }
        displayText()
    };

    const playerTurn = () => {
        return round % 2 === 1 ? playerOne.PlayerSign() : playerTwo.PlayerSign();
    };

    const getRound = () => {
        return round;
    };

    const roundReset = () => {
        round = 1;
        gamestate = false;
    };

    const gameover = () => {
        return gamestate
    }

    return{gameRound, playerTurn, getRound, roundReset, gameover}
})();

// Winner module
const Winner = (() => {
    const checkWinner = () => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        const currentPlayerSign = gamePlay.playerTurn();

        // Check each winning combination
        for (let i = 0; i < winConditions.length; i++) {
            const [a, b, c] = winConditions[i];

            // Check if the current player's sign occupies all three positions of a winning combination
            if (
                Gameboard.GetBoardFields(a) === currentPlayerSign &&
                Gameboard.GetBoardFields(b) === currentPlayerSign &&
                Gameboard.GetBoardFields(c) === currentPlayerSign
            ) {
                return true; // Current player is the winner
            }
        }

        return false; // No winner found
    };

    return { checkWinner};
})();