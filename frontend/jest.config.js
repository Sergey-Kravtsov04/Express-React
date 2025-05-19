module.exports = {
    testEnvironment: 'jsdom',
    transformIgnorePatterns: [
      'node_modules/(?!react-markdown|remark-gfm)/',
    ],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Если используете Babel
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Если используете setupTests
  };