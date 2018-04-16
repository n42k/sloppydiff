const deepEqual = require('deep-equal')
const sloppydiff = require('sloppydiff')
const assert = require('assert')

describe('Complex Diffs', function() {
  it('object within array, equal', function() {
      let older = [{n: 'hi'}]
      let newer = [{n: 'hi'}]
      let diff = sloppydiff.diff(older, newer)
      assert(deepEqual(sloppydiff.patch(older, diff), newer))
  })

  it('object within array, key modification', function() {
      let older = [{n: 'hi'}]
      let newer = [{n: 1}]
      let diff = sloppydiff.diff(older, newer)
      assert(deepEqual(sloppydiff.patch(older, diff), newer))
  })

  it('object within array, key deletion', function() {
      let older = [{n: 'hi'}]
      let newer = [{}]
      let diff = sloppydiff.diff(older, newer)
      assert(deepEqual(sloppydiff.patch(older, diff), newer))
  })

  it('object within array, key insertion', function() {
      let older = [{}]
      let newer = [{n: 'hi'}]
      let diff = sloppydiff.diff(older, newer)
      assert(deepEqual(sloppydiff.patch(older, diff), newer))
  })

  it('object within array, object deletion', function() {
      let older = [{}]
      let newer = []
      let diff = sloppydiff.diff(older, newer)
      assert(deepEqual(sloppydiff.patch(older, diff), newer))
  })

  it('object within array, object insertion', function() {
      let older = []
      let newer = [{}]
      let diff = sloppydiff.diff(older, newer)
      assert(deepEqual(sloppydiff.patch(older, diff), newer))
  })

  it('array within object, equal', function() {
    let older = {n: [2]}
    let newer = {n: [2]}
    let diff = sloppydiff.diff(older, newer)
    assert(deepEqual(sloppydiff.patch(older, diff), newer))
  })

  it('array within object, array insertion', function() {
    let older = {}
    let newer = {n: [2]}
    let diff = sloppydiff.diff(older, newer)
    assert(deepEqual(sloppydiff.patch(older, diff), newer))
  })

  it('array within object, array deletion', function() {
    let older = {n: [2]}
    let newer = {}
    let diff = sloppydiff.diff(older, newer)
    assert(deepEqual(sloppydiff.patch(older, diff), newer))
  })

  it('array within object, array modification, addition', function() {
    let older = {n: [2]}
    let newer = {n: [2, 3]}
    let diff = sloppydiff.diff(older, newer)
    assert(deepEqual(sloppydiff.patch(older, diff), newer))
  })

  it('array within object, array modification, reduction', function() {
    let older = {n: [2, 3]}
    let newer = {n: [3]}
    let diff = sloppydiff.diff(older, newer)
    assert(deepEqual(sloppydiff.patch(older, diff), newer))
  })
})
