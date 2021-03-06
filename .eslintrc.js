/**
 * These rules enforce the Hack Reactor Style Guide
 *
 * Visit this repo for more information:
 *   https://github.com/reactorcore/eslint-config-hackreactor
 */

module.exports = {
  extends: [
    'airbnb',
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  env: {
    'commonjs': true,
    'node': true,
    'jest': true
  }
};