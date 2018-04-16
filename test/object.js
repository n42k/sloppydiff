const deepEqual = require('deep-equal')
const sloppydiff = require('sloppydiff')
const assert = require('assert')

describe('Object Diffs', function() {
  it('diffing empty objects', function() {
    let result = sloppydiff.diff({}, {})
    let keys = Object.keys(result)
    assert.equal(keys.length, 0)
  })

  it('diffing objects, adding property', function() {
    let older = {}
    let newer = {n: 1}
    let diff = sloppydiff.diff(older, newer)
    assert(deepEqual(sloppydiff.patch(older, diff), newer))
  })

  it('diffing objects, removing property', function() {
    let older = {n: 1}
    let newer = {}
    let diff = sloppydiff.diff(older, newer)
    assert(deepEqual(sloppydiff.patch(older, diff), newer))
  })

  it('diffing objects, modifying property', function() {
    let older = {n: 1}
    let newer = {n: 2}
    let diff = sloppydiff.diff(older, newer)
    assert(deepEqual(sloppydiff.patch(older, diff), newer))
  })
})
