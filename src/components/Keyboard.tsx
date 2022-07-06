import React, { useContext, useEffect } from 'react'
import WordleContext from './WordleContext';

export default function Keyboard() {

  const { state, setState } = useContext(WordleContext);

  const onKeyDown = (e: any) => {
    const key = e.key;

    switch (key) {
      case 'Enter':
        if (!state.isGameOver) setState(old => ({
          ...old,
          guess: '',
          rowIndex: old.rowIndex + 1,
          colIndex: 0,
          isSubmitted: true
        }));
        break;

      case 'Backspace':
        if (!state.isGameOver) setState(old => ({
          ...old,
          guess: old.guess.slice(0, -1) + '',
          colIndex: old.colIndex - 1,
          isSubmitted: false
        }));
        break;

      default:
        if (!state.isGameOver) setState(old => ({
          ...old,
          guess: old.guess + key,
          colIndex: old.colIndex + 1,
          isSubmitted: false
        }));
        break;
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, []);

  return (
    <div>Keyboard</div>
  )
}
