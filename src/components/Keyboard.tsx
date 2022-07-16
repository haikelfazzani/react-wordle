import React, { useCallback, useContext, useEffect } from 'react';
import WordleContext from './WordleContext';

const topRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const middleRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const bottomRow = ["Z", "X", "C", "V", "B", "N", "M", "←", "Enter"];

export default function Keyboard() {
  const { state, setState } = useContext(WordleContext);
  const { wordList, nbRows, grid, isGameOver } = state;

  const handleEnter = () => {
    setState((old: any) => {

      const isWordInList = wordList.includes(grid[old.rowIndex].join(''));

      const isSolutionFound = old.solution === old.userSolution;
      const isGameOver = old.rowIndex + 1 >= nbRows || isSolutionFound;

      const score = isGameOver
        ? {
          success: isSolutionFound ? old.score.success + 1 : old.score.success,
          fail: isSolutionFound ? old.score.fail : old.score.fail + 1,
          nbGames: old.score.nbGames + 1
        }
        : old.score;

      const newState = {
        ...old,
        rowIndex: isWordInList ? old.rowIndex + 1 : old.rowIndex,
        colIndex: isWordInList ? 0 : old.colIndex,
        userSolution: isWordInList ? '' : old.userSolution,
        tempUserSOlution: old.userSolution,
        isSubmitted: true,
        isGameOver,
        score
      }

      localStorage.setItem('wordle-score', JSON.stringify(newState.score))

      return newState
    });

  }

  const handleBackspace = () => {
    setState((old: any) => {
      const prevCell = old.colIndex - 1;

      if (prevCell > -1) {

        const row = grid[old.rowIndex];
        row[prevCell] = '';
        const temp = old.grid.slice(0);

        return {
          ...old,
          userSolution: old.userSolution.slice(0, -1),
          colIndex: prevCell,
          grid: temp,
          isSubmitted: false
        }
      }
      else {
        return {
          ...old,
          userSolution: '',
          colIndex: 0
        }
      }

    });
  }

  const handleAlpha = (key: string) => {
    setState((old: any) => {
      const nextCell = old.colIndex + 1;
      if (nextCell <= old.solution.length) {

        const row = grid[old.rowIndex];
        row[old.colIndex] = key;
        const temp = old.grid.slice(0);

        return {
          ...old,
          userSolution: old.userSolution + key,
          colIndex: nextCell,
          grid: temp,
          isSubmitted: false
        }
      }
      else {
        return {
          ...old,
          colIndex: old.solution.length
        }
      }

    });
  }

  const onKeyDown = (e: any) => {
    if (!isGameOver) {
      const key = typeof e === 'object' ? e.key : e;

      if (key === 'Enter' || key === 'enter') handleEnter()
      if (key === 'Backspace' || key === '←') handleBackspace()
      if (key.length === 1 && /[a-z]/gi.test(key)) handleAlpha(key)
    }
  }

  const onKeyboard = useCallback((letter: string) => {
    if (!isGameOver) onKeyDown(letter.toLocaleLowerCase())
  }, [isGameOver]);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isGameOver]);

  return <div className='keyboard'>
    <ul className='center flex-row'>
      {topRow.map(letter => <li key={letter} onClick={() => { onKeyboard(letter) }}>{letter}</li>)}
    </ul>

    <ul className='center flex-row'>
      {middleRow.map(letter => <li key={letter} onClick={() => { onKeyboard(letter) }}>{letter}</li>)}
    </ul>

    <ul className='center flex-row'>
      {bottomRow.map(letter => <li key={letter} onClick={() => { onKeyboard(letter) }}>{letter}</li>)}
    </ul>
  </div>
}
