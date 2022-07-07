import React, { useContext, useEffect, useState } from 'react'
import WordleContext from './WordleContext';
import Grid from './Grid';

export default function Board() {
  const { state, setState } = useContext(WordleContext);
  const { isSubmitted, solution, userSolution, rowIndex, isGameOver, nbAttempts, emptyCells } = state;

  const [board, setBoard] = useState(Grid);
  const [attempt, setAttempt] = useState(userSolution);

  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (nbAttempts < 1) return;

    if (!isSubmitted && !isGameOver) {
      let nBoard = board.slice(0);

      nBoard[rowIndex] = <li className='d-flex' key={rowIndex}>
        {emptyCells.map((col, i) => <span className='cell' key={i}>{userSolution[i] ?? ' '}</span>)}
      </li>;

      setAttempt(userSolution)
      setBoard(nBoard);
    }
  }, [userSolution]);

  useEffect(() => {
    if (nbAttempts < 0) {
      setMessage('😔 Solution is: ' + solution);
      return;
    }

    if (isSubmitted && !isGameOver) {
      let nBoard: any = board.slice(0);
      let isEqual = [];

      nBoard[rowIndex - 1] = <li className='d-flex' key={rowIndex - 1}>
        {emptyCells.map((col, i) => {
          let className = '';

          if (solution[i] === attempt[i]) {
            className = 'green';
            isEqual.push(true)
          }
          else if (solution.includes(attempt[i])) {
            className = 'yellow';
            isEqual.push(false);
          }
          else {
            className = 'gray';
            isEqual.push(false);
          }

          return <span key={i} className={'cell flip ' + className}>{attempt[i] ?? ' '}</span>
        })}
      </li>;

      setBoard(nBoard)
      setState(old => ({ ...old, isGameOver: isEqual.every(e => e === true) }))
    }
  }, [isSubmitted, nbAttempts]);

  return <div className='center'>
    <ul>{board}</ul>
    {message && <pre>{message}</pre>}
  </div>
}
