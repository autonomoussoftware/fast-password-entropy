'use strict'

/**
 * Calculate the entropy of a string based on the size of the charset used and
 * the length of the string.
 *
 * Based on:
 * http://resources.infosecinstitute.com/password-security-complexity-vs-length/
 *
 * @param   {number} charset is the size of the string charset.
 * @param   {number} length  is the length of the string.
 * @returns {number}         the calculated entropy.
 */
const calcEntropy = (charset, length) =>
  Math.round(length * Math.log(charset) / Math.LN2)

/**
 * Standard character sets list.
 *
 * It assumes the `uppercase` and `lowercase` charsets to have 26 chars as in
 * the English alphabet. Numbers are 10 characters long. Symbols are the rest
 * of the 33 remaining chars in the 7-bit ASCII table.
 *
 * @type {Array}
 */
const stdCharsets = [{
  name: 'lowercase',
  re: /[a-z]/, // abcdefghijklmnopqrstuvwxyz
  length: 26
}, {
  name: 'uppercase',
  re: /[A-Z]/, // ABCDEFGHIJKLMNOPQRSTUVWXYZ
  length: 26
}, {
  name: 'numbers',
  re: /[0-9]/, // 1234567890
  length: 10
}, {
  name: 'symbols',
  re: /[^a-zA-Z0-9]/, //  !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~ (and any other)
  length: 33
}]

/**
 * Creates a function to calculate the total charset length of a string based on
 * the given charsets.
 *
 * @param  {Object[]} charsets are description of each charset. Shall contain a
 *                             regular expression `re` to identify each
 *                             character and a `length` with the total possible
 *                             characters in the set.
 * @returns {Function}         a function that will receive a string and return
 *                             the total charset length.
 */
const calcCharsetLengthWith = charsets =>
  string =>
    charsets.reduce((length, charset) =>
      length + (charset.re.test(string) ? charset.length : 0), 0)

/**
 * Helper function to calculate the total charset lengths of a given string
 * using the standard character sets.
 *
 * @type {Function}
 */
const calcCharsetLength = calcCharsetLengthWith(stdCharsets)

/**
 * Calculate the given password entropy.
 *
 * @param   {string} string is the password string.
 * @returns {number}        [the calculated entropy.
 */
const passwordEntropy = string =>
  string ? calcEntropy(calcCharsetLength(string), string.length) : 0

module.exports = passwordEntropy
