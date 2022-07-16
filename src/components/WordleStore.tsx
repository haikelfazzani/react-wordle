import React, { useState, memo } from "react";
import { creatArr, initState } from "./helper";
import WordleContext from "./WordleContext";

export const WordleStore = memo(({ children, wordList, solution, nbRows, nbCols }: any) => {

  const [state, setState] = useState({
    ...initState,
    wordList,
    solution,
    nbCols: nbCols || 5,
    nbRows: nbRows || 6,
    grid: creatArr(nbRows || 6).map(v => creatArr(nbCols || 5))
  });

  return <WordleContext.Provider value={{ state, setState }}>
    {children}
  </WordleContext.Provider>
})
