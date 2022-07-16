const creatArr = (nb: number) => Array.from(Array(nb || 5).keys());

const grid = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', '']
];

const initState = {
  rowIndex: 0,
  colIndex: 0,
  attemps: 0,

  solution: '',
  userSolution: '',
  tempUserSOlution: '',

  grid,
  isSubmitted: false,
  isGameOver: false,

  nbCols: 5,
  nbRows: 6
}

export { initState, creatArr }