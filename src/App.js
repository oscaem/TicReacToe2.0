// Import the useState hook from react
import { useState } from 'react';

// Square component that takes in the value and onSquareClick props
function Square({ value, onSquareClick }) {
// Render a button with the class "square" and an onClick event that calls onSquareClick
return (
<button className="square" onClick={onSquareClick}>
{value}
</button>
);
}

// Board component that takes in the xIsNext, squares, and onPlay props
function Board({ xIsNext, squares, onPlay }) {

// handleClick function that takes in the index of the square clicked
function handleClick(i) {
// check if the square at the index is already filled or if there is a winner
if (squares[i] || calculateWinner(squares)) {
// if so, return and do not allow the click to register
return;
}
// create a copy of the squares array
const nextSquares = squares.slice();
// check if xIsNext is true
if (xIsNext) {
// if so, set the square at the index to X
nextSquares[i] = 'X';
} else {
// if not, set the square at the index to O
nextSquares[i] = "O";
}
// call the onPlay function and pass in the nextSquares array as an argument
onPlay(nextSquares);
}

// check for the winner using the calculateWinner function and passing in the squares array
const winner = calculateWinner(squares);
let status;
// check if there is a winner
if (winner) {
// if so, set the status to show the winner
status = "Winner: "+ winner;
} else {
// if not, set the status to show the next player using the ternary operator
status = "Next Player: " + (xIsNext ? "X" : "O")
}
// render the board with the status, and the squares
return (
  <>
  <div className="status">{status}</div>
  <div className="board-row">
  <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
  <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
<Square value={squares[2]} onSquareClick={() => handleClick(2)} />
</div>
<div className="board-row">
<Square value={squares[3]} onSquareClick={() => handleClick(3)} />
<Square value={squares[4]} onSquareClick={() => handleClick(4)} />
<Square value={squares[5]} onSquareClick={() => handleClick(5)} />
</div>
<div className="board-row">
<Square value={squares[6]} onSquareClick={() => handleClick(6)} />
<Square value={squares[7]} onSquareClick={() => handleClick(7)} />
<Square value={squares[8]} onSquareClick={() => handleClick(8)} />
</div>
</>
);
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
      <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

