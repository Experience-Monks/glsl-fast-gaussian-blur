var triangle = require('a-big-triangle')
var createShader = require('gl-shader')
var glslify = require('glslify')
var loop = require('raf-loop')

var gl = require('webgl-context')({
  width: 512,
  height: 512
})

document.body.appendChild(gl.canvas)

var time = 0
// var uri = require('baboon-image-uri')
// var loadImage = require('img')
// loadImage(uri, start)

start(null, require('baboon-image').transpose(1, 0, 2))

function start(err, image) {
  if (err)
    throw err
  
  var width = gl.drawingBufferWidth
  var height = gl.drawingBufferHeight

  var texture = require('gl-texture2d')(gl, image)
  texture.wrapS = texture.wrapT = gl.REPEAT
  texture.minFilter = gl.LINEAR
  texture.magFilter = gl.LINEAR

  var shader = createShader(gl, glslify('./vert.glsl'), glslify('./frag.glsl'))
  shader.bind()
  shader.uniforms.iResolution = [width, height, 0]
  shader.uniforms.iChannel0 = 0

  var fbo = require('gl-fbo')(gl, [width, height])

  require('raf')(render)
  function render() {
    gl.viewport(0, 0, width, height)

    fbo.bind()
    texture.bind()
    shader.bind()
    shader.uniforms.flip = true
    shader.uniforms.direction = [1, 0]
    triangle(gl)

    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    fbo.color[0].bind()
    shader.uniforms.direction = [1.0, 0]
    shader.uniforms.flip = false
    triangle(gl)
  }
}