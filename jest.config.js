/* eslint-disable no-undef */
module.exports = {
  rootDir: __dirname,
  testMatch: ['<rootDir>/**/*.test.{ts,tsx}'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
}
