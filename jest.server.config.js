module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/server/**/*.test.js'],
  setupFiles: ['<rootDir>/server/tests/setup.js'],
  collectCoverageFrom: [
    'server/**/*.js',
    '!server/tests/**/*.js',
    '!server/config/**/*.js'
  ],
};