import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css';

const Square = ({value, onClickSquare, index}) => {
    return (
        <button onClick ={() => onClickSquare(index)} className="square">
          {value}
        </button>
    );
}
  
  const Board = () => {
    const [status, setStatus] = React.useState('X')
    const [winner, setWinnter] = React.useState(null)
    const [squares, setSquares] = React.useState(Array(9).fill(null))
    const renderSquare = (i) => {
        return <Square onClickSquare={onClickSquare} index={i} value={squares[i]}/>
    }
    
    const onClickSquare = (index) => {
      if (!winner) {
        if (squares[index] === null) {
          status === 'X' ? setStatus('O') : setStatus('X')
          const arr = squares.slice()
          arr[index] = status
          setSquares(arr)
          if (calculateWinner(squares)) {
            setWinnter(calculateWinner(squares))
          }
        }
      }
    }

    return (
    <div>
        <div className="status">{winner ? `Winner is: ${winner}` : `Next player is: ${status}`}</div>
        <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
        </div>
        <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
        </div>
        <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
        </div>
        </div>
      );
}
  
  function Game() {
    return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
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
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);