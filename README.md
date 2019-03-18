# fast-password-entropy

[![Build Status](https://travis-ci.org/autonomoussoftware/fast-password-entropy.svg?branch=master)](https://travis-ci.org/autonomoussoftware/fast-password-entropy)
[![bitHound Overall Score](https://www.bithound.io/github/autonomoussoftware/fast-password-entropy/badges/score.svg)](https://www.bithound.io/github/autonomoussoftware/fast-password-entropy)
[![bitHound Code](https://www.bithound.io/github/autonomoussoftware/fast-password-entropy/badges/code.svg)](https://www.bithound.io/github/autonomoussoftware/fast-password-entropy)
[![Code Style](https://img.shields.io/badge/code%20style-bloq-0063a6.svg)](https://github.com/bloq/eslint-config-bloq)
[![Known Vulnerabilities](https://snyk.io/test/github/autonomoussoftware/fast-password-entropy/badge.svg?targetFile=package.json)](https://snyk.io/test/github/autonomoussoftware/fast-password-entropy:package.json) [![Greenkeeper badge](https://badges.greenkeeper.io/autonomoussoftware/fast-password-entropy.svg)](https://greenkeeper.io/)

Calculate the entropy bits of a string as a quick proxy to password strength.

See [Entropy as a measure of password strength](https://en.wikipedia.org/wiki/Password_strength#Entropy_as_a_measure_of_password_strength) for more information.

## Installation

```bash
$ npm install --save fast-password-entropy
```

## Usage

```js
const stringEntropy = require('fast-password-entropy')

console.log(stringEntropy('1234')) // 13
console.log(stringEntropy('password')) // 38
```

### ES5 support

A transpiled version is available in `es5/index.js`. To use that specific version, this syntax is also supported:

```js
var stringEntropy = require('fast-password-entropy/es5');
```

## Research

Several libraries were analyzed before creating this one. Some of those are listed below, along with the drawbacks found for each one.

[`information-entropy`](https://www.npmjs.com/package/information-entropy): Too basic. Cannot extract charset length from the string being tested.

[`joi-password-complexity`](https://github.com/kamronbatman/joi-password-complexity): Interesting but not providing raw entropy information.

[`passwd-strength`](https://github.com/tcort/passwd-strength): Values are correct but is too slow.

[`password-entropy`](https://www.npmjs.com/package/password-entropy): Entropy calculation is not following any standard so results are very different from other libs.

[`password-strength`](https://github.com/yuehu/password-strength): Only giving "simple", "medium", "strong" values.

[`string-entropy`](https://github.com/mvhenten/string-entropy): Provides good entropy values but is slow.

[`tai-password-strength`](https://github.com/tests-always-included/password-strength): Very complex and results are not fully matching the expected results.

[`zxcvbn`](https://github.com/dropbox/zxcvbn): Uses comprehensive heuristics to estimate complexity but solves a much more complex problem instead.

## Benchmark

After the research, only three libraries were analyzed in detail and benchmarked. This library results are 3.5x faster than the existing libraries.

```
$ npm run bench

Test strings [ '',
  '8646',
  'xtcmFWoH',
  'Lp2x0P1iMEPWZKaQ',
  'escape piece useful cloth',
  'needle excitement over aloud price among',
  'topic contain anything political great thank dawn among butter doll fought end' ]

Results for `fast-password-entropy`   [ 0, 13, 46, 95, 147, 235, 459 ]
Results for `passwd-strength`       [ 0, 13, 46, 95, 147, 235, 459 ]
Results for `password-entropy`      [ 1, 1, 3, 10, 10, 10, 10 ]
Results for `string-entropy`        [ 0, 13, 46, 95, 118, 188, 367 ]
Results for `tai-password-strength` [ 0, 6, 24, 62, 87, 152, 312 ]

Benchmarking...
fast-password-entropy x 557,198 ops/sec ±1.27% (87 runs sampled)
passwd-strength x 1,732 ops/sec ±4.36% (81 runs sampled)
string-entropy x 143,412 ops/sec ±3.92% (83 runs sampled)
tai-password-strength x 11,590 ops/sec ±1.28% (86 runs sampled)

Fastest is fast-password-entropy
```

## License

MIT
