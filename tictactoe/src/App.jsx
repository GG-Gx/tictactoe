import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
const TURNS = {
  X: 'X',
  O: 'O',

}


const Square = ({children, isSelected, updateBoard, index}) =>{
  const className =`square ${isSelected ? 'is-selected' : ''}`
  const handleClick = () => {
    updateBoard(index);
  }
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] =useState( Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS){
    const [a, b, c] = combo;
    if (
      boardToCheck[a] && 
      boardToCheck[a] === boardToCheck[b] && 
      boardToCheck[a] === boardToCheck[c]
    ){
      return boardToCheck[a];
    }
  }
  return null;
  }

  const updateBoard = (index) =>{
    if (board[index] || winner ) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O :TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner)
    }
  };

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square 
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn=== TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn=== TURNS.O}>{TURNS.O}</Square>
      </section>

      {
        winner !== null && (
          <section
          className ="winner"
          >
            <div
            className='text'
            >
                          <h2>{winner === 'X' || winner === 'O' ? `Player ${winner} wins!` : 'It\'s a tie!'}</h2>

            </div>
          </section>
        )

      }

    </main>  
  )
}


export default App;


//41:21 https://www.youtube.com/watch?v=qkzcjwnueLA