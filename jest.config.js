module.exports = {
    transform: {
      '^.+\\.[t|j]sx?$': 'babel-jest', // Transform JSX and JavaScript files
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios)/', // Transform `axios` and any other packages you need
    ],
    testEnvironment: 'jsdom', // For React components
  };
  