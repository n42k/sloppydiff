const deepEqual = require('deep-equal')
const sloppydiff = require('sloppydiff')
const assert = require('assert')

describe('Array Diffs', function() {
  it('diffing empty arrays', function() {
    let result = sloppydiff.diff([], [])
    let keys = Object.keys(result)
    assert.equal(keys.length, 1)
    assert.equal(result._t, 'a')
  })

  it('diffing arrays', function() {
    let older = [2]
    let newer = [2, 3, 4]
    let diff = sloppydiff.diff(older, newer)
    assert(deepEqual(sloppydiff.patch(older, diff), newer))
  })

  it('diffing arrays of arrays', function() {
    let older = [[2, 3, 4], [5, 6, 7]]
    let newer = [[2, 6, 8], [5, 6, 7]]
    let diff = sloppydiff.diff(older, newer)
    assert(deepEqual(sloppydiff.patch(older, diff), newer))
  })
})
