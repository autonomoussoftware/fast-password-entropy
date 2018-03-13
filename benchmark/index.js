'use strict'

const Benchmark = require('benchmark')
const passwdStrength = require('passwd-strength')
const passwordEntropy = require('password-entropy')
const taiPasswordStrength = require('tai-password-strength')
const randomString = require('randomstring')
const randomWords = require('random-words')
const stringEntropy = require('string-entropy')

const fast = require('..')

const testStrings = [
  '',
  randomString.generate({ length: 4, charset: 'numeric' }),
  randomString.generate({ length: 8 }),
  randomString.generate({ length: 16 }),
  randomWords({ exactly: 4, join: ' ' }),
  randomWords({ exactly: 6, join: ' ' }),
  randomWords({ exactly: 12, join: ' ' })
]

const strengthTester = new taiPasswordStrength.PasswordStrength()

console.log('Test strings', testStrings, '\n')
console.log('Results for `fast-password-entropy`  ',
  testStrings
    .map(fast)
)
console.log('Results for `passwd-strength`      ',
  testStrings
    .map(passwdStrength)
    .map(Math.round)
)
console.log('Results for `password-entropy`     ',
  testStrings
    .map(passwordEntropy)
)
console.log('Results for `string-entropy`       ',
  testStrings
    .map(stringEntropy)
)
console.log('Results for `tai-password-strength`',
  testStrings
    .map(strengthTester.check.bind(strengthTester))
    .map(res => res.shannonEntropyBits)
    .map(Math.round)
)

console.log('\nBenchmarking...')

const suite = new Benchmark.Suite()

suite
  .add('fast-password-entropy', function () {
    testStrings.forEach(fast)
  })
  .add('passwd-strength', function () {
    testStrings.forEach(passwdStrength)
  })
  .add('string-entropy', function () {
    testStrings.forEach(stringEntropy)
  })
  .add('tai-password-strength', function () {
    testStrings.forEach(strengthTester.check.bind(strengthTester))
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log(`\nFastest is ${this.filter('fastest').map('name')}`)
  })
  .run({ async: true })
