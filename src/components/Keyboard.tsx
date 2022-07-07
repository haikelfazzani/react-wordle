import React, { useCallback, useContext, useEffect } from 'react'
import WordleContext from './WordleContext';

const topRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const middleRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const bottomRow = ["Z", "X", "C", "V", "B", "N", "M", "←", "Enter"];

export default function Keyboard() {
  const { state, setState } = useContext(WordleContext);

  const handleKeys = (key: string) => {

    if (state.isGameOver) return;

    if (key === 'Enter') setState(old => {

      const isUserSolutionInWordList = state.wordList.includes(old.userSolution);
      const isUserSolutionValidLen = old.userSolution.length >= old.nbCols;

      let isValidSolution = [isUserSolutionInWordList, isUserSolutionValidLen];
      let isValid = isValidSolution.every(v => v);


      return {
        ...old,
        userSolution: isValid ? '' : old.userSolution,
        rowIndex: isValid ? old.rowIndex + 1 : old.rowIndex,
        nbAttempts: isValid ? old.nbAttempts - 1 : old.nbAttempts,
        colIndex: isValid ? 0 : old.colIndex,
        isSubmitted: isValid,

        isUserSolutionValidLen,
        isUserSolutionInWordList
      }
    });

    if (key === 'Backspace' || key === '←') setState(old => ({
      ...old,
      userSolution: old.userSolution.slice(0, -1) + '',
      colIndex: old.colIndex - 1,
      isSubmitted: false
    }));

    if (/[a-z]/gi.test(key) && key.length === 1) setState(old => {
      let userSolution = old.userSolution.slice(0, old.nbCols);

      return {
        ...old,
        userSolution: userSolution + (key.toLowerCase()),
        colIndex: old.colIndex + 1,
        isSubmitted: false
      }
    });
  }

  const onKeyDown = (e: any) => {
    const key = e.key as string;
    handleKeys(key)
  }

  const onKeyboard = useCallback((letter: string) => {
    handleKeys(letter)
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, []);

  return (
    <div className='keyboard'>
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
  )
}
