import React, { useState } from "react";
import Grid from "./Grid";
import WordleContext from "./WordleContext";

const initState = {
  wordList: [],
  solution: '',
  nbAttempts: 6,

  board: Grid,
  isGameOver: false,
  isSubmitted: false,

  userSolution: '',

  rowIndex: 0,
  colIndex: 0,
}

export function WordleStore({ children, wordList, solution }: any) {

  const [state, setState] = useState({ ...initState, wordList, solution });

  return <WordleContext.Provider value={{ state, setState }}>
    {children}
  </WordleContext.Provider>
}
