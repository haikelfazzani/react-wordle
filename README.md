# Wordle as React Component

### [Demo](https://haikelfazzani.github.io/react-wordle)

# Installation
```shell
$ npm install react-wordle
# yarn add react-wordle
```

# Example
```jsx
import { Wordle } from 'react-wordle';

<Wordle 
  wordList={['piano', 'hello']}   // word list
  solution="piano"                // final word solution

  nbRows={6}                      // number of lines
  nbCols={5}                      // number of cells (letter tile)
/>
```

### Props
| name | type | default | description |
| --- | --- | --- | --- |

# License
MIT