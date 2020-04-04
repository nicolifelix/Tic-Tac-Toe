import React, { useState, useEffect } from "react";
import "./TicTacToe.css";

function TicTacToe() {
  /* criando array pelo terminal node Array(9)
[ <9 empty items> ]
> Array(9).fill("")
[
  '', '', '', '', '',
  '', '', '', ''
] */
  const emptyBoard = Array(9).fill("");
  //estados
  const [board, setBoard] = useState(emptyBoard);
  
  const [currentPlayer, setCurrentPlayer] = useState("O");
  const [winner, setWinner] = useState(null);

  const handleCellClick = (index) => {
      if (winner) return null;

      if (board[index] !== "") return null;

      setBoard(
        board.map((item, itemIndex) => itemIndex === index ? currentPlayer : item)
        );

        //trocando pro outro jogador
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  const checkWinner = () => {
    const possibleWaysToWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    possibleWaysToWin.forEach(cells => {
      if (cells.every(cell => cell === "O")) setWinner ("O");
      if (cells.every(cell => cell === "X")) setWinner ("X");
    });

    checkDraw();
  }  

  const checkDraw = () => {
    if (board.every(item => item !== ""))
      setWinner("D");
    }
  

  //realizar uma açao qdo algo for disparado
  //qdo jogador ganha
  useEffect(checkWinner, [board]);

  const resetGame = () => {
    setCurrentPlayer ("O");
    setBoard(emptyBoard);
    setWinner(null);
  }

  return (
    <main>
      <h1 className="title">Jogo da Velha</h1>

      <div className={`board ${winner ? "game-over" : ""}`}>
        {/* pra cada item do board, cria-se uma div cell */}
        {board.map((item, index) => (
          <div key={index} 
          className={`cell ${item}`} 
          //funçao pra saber onde foi clicado
          onClick={() => handleCellClick(index)}
          >
            {item}
          </div>
        ))}
      </div>

      {winner &&    
        <footer>
          {winner === "D" ?
            <h2 className="winner-message">
              <span className={winner}>Empatou!</span>
            </h2>
            :
            <h2 className="winner-message">
              <span className={winner}>{winner} </span>
              venceu!
            </h2>
          }

          <button onClick={resetGame}>Recomeçar jogo!</button>
        </footer>
       }

    </main>
  );
}

export default TicTacToe;
