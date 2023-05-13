"use strict";
const player = (sign) => {
    this.sign = sign

    const PlayerSign = () => {
        return sign
    }

    return {PlayerSign}
}

const Gameboard = (() => {
    const Board = ["", "", "", "", "", "", "", "", ""];

    const boadField = (index, Symbol) => {
        if(index > Board.length) return;
        Board[index] = Symbol
    }

    const GetBoardFields = (index) => {
        if(index > Board.length)return
        return Board[index];
    }

    const restart = () => {
        for(let i = 0; i < Board.length; i++){
            Board[i] = ""
        }
    }

    const GameField = document.querySelectorAll(".field");
    const restartButton = document.getElementById("restart");

    GameField.forEach((field) =>
    field.addEventListener("click", (e) => {
        if(e.target.textContent !== "")return
        gamePlay.gameRound(parseInt(e.target.dataset.index))
        updateGameboard();
    }))

    restartButton.addEventListener("click", (e) => {
        restart()
        updateGameboard();
        displayText("restart");
        gamePlay.roundReset();
      });
    

    const updateGameboard = () => {
        for (let i = 0; i < GameField.length; i++) {
            GameField[i].textContent = GetBoardFields(i);
        }
      };

    return {boadField}
})()

const gamePlay = (() => {
    const playeOne = player("X");
    const playeTwo = player("O");
    let round = 0;
    let Gameover = false

    const gameRound = (fieldIndex) =>{
        Gameboard.boadField(fieldIndex, playerTurn())
        round++
        displayText();
    }

    const playerTurn = () => {
       return round % 2 === 1 ? playeOne.PlayerSign() : playeTwo.PlayerSign();
    }

    const getRound = () => {
        return round;
    }

    const roundReset = () =>{
        round = 0
    }

    return{gameRound, playerTurn, getRound, roundReset}
})();