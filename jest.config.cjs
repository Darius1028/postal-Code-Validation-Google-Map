const path = require('path');

module.exports = {
  transform: {
    '^.+\\.(js|jsx)?$': ['@swc/jest'],
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  testEnvironment: 'jsdom',
};