const deepEqual = require('deep-equal')

exports.diff = (older, newer) => {
  if(older === newer)
    return 'no diff'

  if(typeof older === 'undefined')
    return [newer]

  if(typeof newer === 'undefined')
    return [older, 0, 0]

  if(Array.isArray(older) && Array.isArray(newer) &&
     older.length === newer.length) {
     let delta = {_t: 'a'}

     for(let i = 0; i < older.length; ++i) {
      if(!deepEqual(older[i], newer[i])) {
        let delta2 = exports.diff(older[i], newer[i])
        if(delta2 === 'no diff')
          continue
        else if(Array.isArray(delta2)) {
          delta[i] = [newer[i]]
          delta['_' + i] = [older[i], 0, 0]
        } else if(typeof delta2 === 'object') {
          let keyLength = Object.keys(delta2).length
          if(keyLength === 0 || (keyLength === 1 && delta2._t === 'a'))
            continue
          delta[i] = delta2
        }
      }
     }

     return delta
  }

  if(older !== null && newer !== null &&
    typeof older === 'object' && typeof newer === 'object') {
      let deltas = {}
      for(let key in older) {
        let delta
        if(key in newer)
          delta = exports.diff(older[key], newer[key])
        else
          delta = exports.diff(older[key], undefined)
        deltas[key] = delta
      }

      for(let key in newer) {
        let delta = exports.diff(undefined, newer[key])
        deltas[key] = delta
      }

      return deltas
  }

  return [older, newer]
}

const jsondiffpatch = require('jsondiffpatch').create()
exports.patch = (older, diff) => {
  return jsondiffpatch.patch(older, diff)
}
