# Sloppy Diff
A library similar to [jsondiffpatch](https://github.com/benjamine/jsondiffpatch), only that it doesn't implement the minimum diff, thus being faster

## Installation
Install with `npm install sloppydiff --save`

## Usage
```
const sloppydiff = require('sloppydiff')
let diff = sloppydiff.diff({array: [2, 4, 3]}, {array: [3]}) // {array: [[ 3 ]]}
sloppydiff.patch({array: [2, 4, 3]}, diff) // {array: [3]}
```

## License
MIT
