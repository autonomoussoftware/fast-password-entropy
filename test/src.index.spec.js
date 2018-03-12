'use strict'

const chai = require('chai')

chai.should()

const stringEntropy = require('..')

const cases = [
  { string: '', entropy: 0 },
  { string: '1234', entropy: 13 },
  { string: 'password', entropy: 38 },
  { string: 'Password', entropy: 46 },
  { string: 'P4ssword', entropy: 48 },
  { string: 'P4ssword!', entropy: 59 },
  { string: 'This is a very str0ng password, I guess...', entropy: 276 }
]

describe('Calculate entropy', function () {
  cases.forEach(function ({ string, entropy }) {
    it(`should return ${entropy} for '${string}'`, function () {
      stringEntropy(string).should.equal(entropy)
    })
  })
})
