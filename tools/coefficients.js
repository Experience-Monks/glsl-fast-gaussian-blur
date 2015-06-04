var range = require('array-range')

module.exports = coefficients

//a row of a pascal table with ends chopped off
function coefficients(weights) {
  if (weights.length % 2 === 0)
    throw new Error('only supports odd table')

  console.log('taps', weights.length)
  var mid = Math.floor((weights.length-1)/2)

  var sum = weights.reduce(function(a, b) {
    return a + b
  }, 0)

  weights = weights.slice(mid)

  var weightDiv = weights.map(function(w) {
    return w / sum
  })

  var offsets = range(mid+1)
  
  var linearWeights = weightDiv.slice(0, 1)
  var linearOffsets = [0]
  for (var i=1; i<offsets.length-1; i+=2) {
    var off1 = offsets[i]
    var off2 = offsets[i+1]
    var weight1 = weights[i]
    var weight2 = weights[i+1]

    var wsum = weight1 + weight2
    var t = (off1 * weight1 + off2 * weight2) / wsum
    linearOffsets.push(t)
    linearWeights.push(wsum / sum)
  }
  console.log('offsets', linearOffsets)
  console.log('weights', linearWeights)
}


// var weights = '66    220    495    792    924    792    495    220    66'
var weights = '120    560    1820    4368    8008    11440    12870    11440    8008    4368    1820    560    120'
  .split(/\s+/)
  .map(function(a) {
    return parseInt(a, 10)
  })
module.exports(weights)