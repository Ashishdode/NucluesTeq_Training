let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const diceEl = document.getElementById("dice");
const rollBtn = document.getElementById("roll-btn");
const saveBtn = document.getElementById("save-btn");
const resetBtn = document.getElementById("reset-btn");
const currentTurnEl = document.getElementById("current-turn");
const currentScoreEl = document.getElementById("current-score");
const playerScores = [document.getElementById("player1-score"), document.getElementById("player2-score")];
const winnerEl = document.getElementById("winner");

rollBtn.addEventListener("click", function() {
    if (playing) {
        const dice = Math.floor(Math.random() * 6) + 1;
        diceEl.src = `assets/dice-${dice}.png`;
        if (dice === 1) {
            currentScore = 0;
            switchTurn();
        } else {
            currentScore += dice;
        }
        currentScoreEl.textContent = currentScore;
    }
});

saveBtn.addEventListener("click", function() {
    if (playing) {
        scores[activePlayer] += currentScore;
        playerScores[activePlayer].textContent = scores[activePlayer];
        currentScore = 0;
        if (scores[activePlayer] >= 100) {
            playing = false;
            winnerEl.textContent = `${document.getElementById(`player${activePlayer + 1}-name`).value} Wins!`;
        } else {
            switchTurn();
        }
        currentScoreEl.textContent = currentScore;
    }
});

resetBtn.addEventListener("click", function() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    playerScores[0].textContent = "0";
    playerScores[1].textContent = "0";
    currentScoreEl.textContent = "0";
    winnerEl.textContent = "";
    currentTurnEl.textContent = "Player 1's turn";
});

function switchTurn() {
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentTurnEl.textContent = `Player ${activePlayer + 1}'s turn`;
}
