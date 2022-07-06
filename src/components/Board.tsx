import React, { useContext, useEffect, useState } from 'react'
import WordleContext from './WordleContext';
import Grid from './Grid';

export default function Board() {
  const { state, setState } = useContext(WordleContext);
  const { isSubmitted, solution, guess, rowIndex, isGameOver,wordList } = state;

  const [board, setBoard] = useState(Grid);
  const [attempt, setAttempt] = useState(guess);

  const [message, setMessage] = useState(null)

  useEffect(() => {
    if (!isSubmitted && !isGameOver) {
      let nBoard = board.slice(0);

      nBoard[rowIndex] = <li className='d-flex' key={rowIndex}>
        {['', '', '', '', ''].map((col, i) => <span className='cell' key={i}>{guess[i] ?? ' '}</span>)}
      </li>;

      setAttempt(guess)
      setBoard(nBoard);
    }
  }, [guess]);

  useEffect(() => {
    if (isSubmitted && !isGameOver) {
      let nBoard: any = board.slice(0);
      let isEqual = [];

      if(!wordList.includes(attempt)) {
        setMessage('Word not includes');        
      }

      nBoard[rowIndex - 1] = <li className='d-flex' key={rowIndex - 1}>
        {['', '', '', '', ''].map((col, i) => {
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

          return <span key={i} className={'cell flipInX ' + className}>{attempt[i] ?? ' '}</span>
        })}
      </li>;

      setBoard(nBoard)
      setState(old => ({ ...old, isGameOver: isEqual.every(e => e === true) }))
    }
  }, [isSubmitted]);

  return <div className='center'>
    <ul>{board}</ul>

    {message && <pre>{message}</pre>}
  </div>
}
