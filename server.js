const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  const characters = [
    "Oppenheimer", "Strauss", "Einstein", "Kitty", "Groves", "Teller", "Bohr", "Jean", "Hill", "Boris"
  ];
  const [playerX, playerO] = characters.sort(() => 0.5 - Math.random()).slice(0, 2);

  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Oppenheimer Tic Tac Toe</title>
  <style>
    body {
      margin: 0;
      background-color: #000;
      background-image: url('dark_collage.jpg');
      background-size: cover;
      background-position: center;
      backdrop-filter: brightness(0.5);
      font-family: 'Courier New', monospace;
      color: #f1f1f1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }

    h1 {
      font-size: 2.2rem;
      text-shadow: 2px 2px 8px rgba(255, 255, 255, 0.2);
      margin-bottom: 10px;
    }

    #turn {
      font-size: 1.3rem;
      margin-bottom: 20px;
      color: #c0f0ff;
      text-shadow: 0 0 5px #00ffff;
    }

    .board {
      display: grid;
      grid-template-columns: repeat(3, 110px);
      grid-template-rows: repeat(3, 110px);
      gap: 10px;
    }

    .cell {
      background-color: rgba(0, 0, 0, 0.6);
      border: 1px solid #888;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      font-weight: bold;
      color: #00ffff;
      transition: all 0.2s ease;
      box-shadow: 0 0 10px #00ffff55;
    }

    .cell:hover {
      border-color: cyan;
      transform: scale(1.05);
      box-shadow: 0 0 15px cyan;
    }

    #restart {
      margin-top: 20px;
      padding: 10px 25px;
      border: none;
      border-radius: 5px;
      background: #111;
      color: cyan;
      cursor: pointer;
      font-weight: bold;
      font-size: 1rem;
      box-shadow: 0 0 15px cyan;
    }
  </style>
</head>
<body>
  <h1>Tic Tac Toe: Oppenheimer</h1>
  <div id="turn">${playerX}'s Turn</div>
  <div class="board" id="board"></div>
  <button id="restart" onclick="window.location.reload()">New Game</button>

  <script>
    const playerX = "${playerX}";
    const playerO = "${playerO}";
    let currentPlayer = "X";
    const board = Array(9).fill(null);
    const boardDiv = document.getElementById("board");
    const turnDisplay = document.getElementById("turn");
    const cells = [];

    function renderBoard() {
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.index = i;
        cell.addEventListener("click", handleClick);
        boardDiv.appendChild(cell);
        cells.push(cell);
      }
    }

    function handleClick(e) {
      const index = e.target.dataset.index;
      if (board[index]) return;

      board[index] = currentPlayer;
      e.target.textContent = currentPlayer;

      const winner = checkWinner();
      if (winner) {
        if (winner === "Draw") {
          turnDisplay.textContent = "It’s a draw. Both sides lost.";
        } else {
          turnDisplay.textContent = (winner === "X" ? playerX : playerO) + " wins.";
        }
        cells.forEach(c => c.removeEventListener("click", handleClick));
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
      updateTurnDisplay();
    }

    function updateTurnDisplay() {
      turnDisplay.textContent = (currentPlayer === "X" ? playerX : playerO) + "'s Turn";
    }

    function checkWinner() {
      const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
      ];
      for (let [a,b,c] of wins) {
        if (board[a] && board[a] === board[b] && board[b] === board[c]) return board[a];
      }
      return board.every(cell => cell !== null) ? "Draw" : null;
    }

    renderBoard();
    updateTurnDisplay();
  </script>
</body>
</html>
  `);
});

app.listen(PORT, () => {
  console.log(`🌑 Oppenheimer Tic Tac Toe running at http://localhost:\${PORT}`);
});
