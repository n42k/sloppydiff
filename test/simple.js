const sloppydiff = require('sloppydiff')
const assert = require('assert')

describe('Simple Diffs', function() {
  it('no diff when diffing equal literals', function() {
    assert.equal(sloppydiff.diff(undefined, undefined), 'no diff')
    assert.equal(sloppydiff.diff(0, 0), 'no diff')
    assert.equal(sloppydiff.diff(1, 1), 'no diff')
    assert.equal(sloppydiff.diff('a', 'a'), 'no diff')
    assert.equal(sloppydiff.diff(false, false), 'no diff')
    assert.equal(sloppydiff.diff(true, true), 'no diff')
    assert.equal(sloppydiff.diff(null, null), 'no diff')
  })

  it('addition diff when diffing undefined with literals', function() {
    assert.equal(sloppydiff.diff(undefined, 0)[0], 0)
    assert.equal(sloppydiff.diff(undefined, 1)[0], 1)
    assert.equal(sloppydiff.diff(undefined, 'a')[0], 'a')
    assert.equal(sloppydiff.diff(undefined, false)[0], false)
    assert.equal(sloppydiff.diff(undefined, true)[0], true)
    assert.equal(sloppydiff.diff(undefined, null)[0], null)
  })

  it('deletion diff when diffing literals with undefined', function() {
    function check(older) {
      let result = sloppydiff.diff(older, undefined)

      assert.equal(result[0], older)
      assert.equal(result[1], 0)
      assert.equal(result[2], 0)
    }

    check(0)
    check(1)
    check('a')
    check(false)
    check(true)
    check(null)
  })

  it('modification diff when diffing literals with literals', function() {
    function check(older, newer) {
      let result = sloppydiff.diff(older, newer)

      assert.equal(result[0], older)
      assert.equal(result[1], newer)
    }

      check(0, 1)
      check(1, 0)
      check(false, true)
      check(true, false)
      check(false, null)
      check(null, false)
      check(true, null)
      check(null, true)
      check('a', 'b')
  })
})
