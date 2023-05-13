const displayText = ((winner) => {
    const TextBox = document.getElementById("TextBox");
    if(winner === "winner"){return TextBox.textContent = `Player ${gamePlay.playerTurn()} Wins`}
    if(winner === "restart"){return TextBox.textContent = "X Play's First"}
    if (gamePlay.getRound() === 9){return TextBox.textContent = "It's a Draw"}
    TextBox.textContent = `It's Player's ${gamePlay.playerTurn()} Turn`;
})