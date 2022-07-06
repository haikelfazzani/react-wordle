import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Wordle } from '../components/Wordle';
import './Wordle.css';

export default { title: 'Wordle', component: Wordle } as ComponentMeta<typeof Wordle>;

const wordList = ["women", "nikau", "swack", "feens", "fyles", "poled", "clags", "starn", "bindi", "woops", "fanos", "cabin", "souct", "trass"];

export const Single: ComponentStory<typeof Wordle> = () => (
  <Wordle
    wordList={wordList}
    solution={wordList[Math.floor(Math.random() * wordList.length)]}
  />
);
