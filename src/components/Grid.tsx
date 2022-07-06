import React from 'react';
import { creatArr } from './helper';

let grid: any = [];

export default function Grid(nbRows: number, nbCols: number) {

  for (let i = 0; i < nbRows; i++) {
    grid.push(creatArr(nbCols))
  }

  return grid.map((row, i) => <li className='d-flex' key={i}>
    {row.map((col, index) => <span className='cell' key={index + '-cell'}></span>)}
  </li>)
}
