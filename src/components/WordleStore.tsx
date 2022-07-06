import React, { useState } from "react";
import Grid from "./Grid";
import { creatArr } from "./helper";
import WordleContext from "./WordleContext";

const initState = {
  wordList: [],
  solution: '',

  nbAttempts: 6,

  isGameOver: false,
  isSubmitted: false,

  userSolution: '',

  rowIndex: 0,
  colIndex: 0,
}

export function WordleStore({ children, wordList, solution, nbRows, nbCols }: any) {

  const [state, setState] = useState({
    ...initState,
    wordList,
    solution,
    board: Grid(nbRows || 6, nbCols || 5),
    emptyCells: creatArr(nbCols || 5)
  });

  return <WordleContext.Provider value={{ state, setState }}>
    {children}
  </WordleContext.Provider>
}
