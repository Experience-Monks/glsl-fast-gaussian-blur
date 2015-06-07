# glsl-fast-gaussian-blur

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

[![demo](http://i.imgur.com/dfCyeqv.png)](http://jam3.github.io/glsl-fast-gaussian-blur/)

[demo](http://jam3.github.io/glsl-fast-gaussian-blur/) - [source](./demo/index.js)

Optimized separable gaussian blurs for GLSL. This is adapted from [Efficient Gaussian Blur with Linear Sampling](http://rastergrid.com/blog/2010/09/efficient-gaussian-blur-with-linear-sampling/).

## Example

The function blurs in a single direction. For correct results, the texture should be using `gl.LINEAR` filtering.

```glsl
#pragma glslify: blur = require('glsl-fast-gaussian-blur')

uniform vec2 iResolution;
uniform sampler2D iChannel0;
uniform vec2 direction;

void main() {
  vec2 uv = vec2(gl_FragCoord.xy / iResolution.xy);
  gl_FragColor = blur(iChannel0, uv, iResolution.xy, direction);
}
```

The module provides three levels of "taps" (the number of pixels averaged for the blur) that can be required individually. The default is 9.

```glsl
#pragma glslify: blur1 = require('glsl-fast-gaussian-blur/13')
#pragma glslify: blur2 = require('glsl-fast-gaussian-blur/9')
#pragma glslify: blur3 = require('glsl-fast-gaussian-blur/5')
```

Since this is separable, you will need multiple passes to blur an image in both directions. See [here](https://github.com/mattdesl/lwjgl-basics/wiki/ShaderLesson5) for details or [the demo](./demo/index.js) for an implementation.

## Install

Use [npm](https://www.npmjs.com/) to install and [glslify](https://github.com/stackgl/glslify) to consume the function in your shaders.

```sh
npm install glsl-fast-gaussian-blur --save
```

## Usage

[![NPM](https://nodei.co/npm/glsl-fast-gaussian-blur.png)](https://www.npmjs.com/package/glsl-fast-gaussian-blur)

#### `vec4 blur5(sampler2D image, vec2 uv, vec2 resolution, vec2 direction)`

Blurs the `image` from the specified `uv` coordinate, using the given `resolution` (size in pixels of screen) and `direction` -- typically either `[1, 0]` (horizontal) or `[0, 1]` (vertical).

## License

MIT, see [LICENSE.md](http://github.com/Jam3/glsl-fast-gaussian-blur/blob/master/LICENSE.md) for details.
