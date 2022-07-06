import React from "react";
import Board from "./Board";
import Keyboard from "./Keyboard";

import { WordleStore } from "./WordleStore";

export function Wordle({ wordList, solution }) {

  const onNewGame = () => {
    window.location.reload()
  }

  return <WordleStore wordList={wordList} solution={solution}>
    <h1 className="center">Wordle</h1>

    <Board />

    <div className="center">
      <Keyboard />
      <button onClick={onNewGame}>New Game</button>
    </div>
  </WordleStore>
}