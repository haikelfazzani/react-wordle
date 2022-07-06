import React from 'react';

let grid: any = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', '']
];

export default grid.map((row, i) => <li className='d-flex' key={i}>
  {row.map((col, index) => <span className='cell' key={index + '-cell'}>{col}</span>)}
</li>)
