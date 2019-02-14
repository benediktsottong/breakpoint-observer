module.exports = {
  preset: 'ts-jest',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!src/**/*interface.ts',
    '!src/**/*mock*',
  ],
  coverageThreshold: {
    global: {
      statements: 1,
      branches: 1,
      functions: 1,
      lines: 1,
    },
  },
  coverageReporters: ['text'],
  testMatch: [
    '**/test/**/*.ts',
  ],
  testEnvironment: 'node',
  verbose: true,
};
