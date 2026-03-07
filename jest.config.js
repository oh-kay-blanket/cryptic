module.exports = {
  // Use jsdom for browser-like environment
  testEnvironment: 'jsdom',

  // Setup file to configure testing-library
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Transform files with babel-jest
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },

  // Module name mapping for non-JS imports
  moduleNameMapper: {
    // Mock CSS/SCSS imports
    '\\.(css|scss|sass)$': 'identity-obj-proxy',

    // Mock image imports
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',

    // Mock Gatsby module
    '^gatsby$': '<rootDir>/__mocks__/gatsby.js',

    // Mock Supabase and related modules
    '^../supabase$': '<rootDir>/__mocks__/supabaseMock.js',
    '^./supabase$': '<rootDir>/__mocks__/supabaseMock.js',
    '^../syncService$': '<rootDir>/__mocks__/syncServiceMock.js',
    '^./syncService$': '<rootDir>/__mocks__/syncServiceMock.js',
    '^../offlineQueue$': '<rootDir>/__mocks__/offlineQueueMock.js',
    '^./offlineQueue$': '<rootDir>/__mocks__/offlineQueueMock.js',
    '^../AuthContext$': '<rootDir>/__mocks__/AuthContextMock.js',
    '^./AuthContext$': '<rootDir>/__mocks__/AuthContextMock.js',
  },

  // Coverage collection
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/**/__tests__/**',
  ],

  // Test match patterns
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],

  // Ignore patterns
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.cache/',
    '/public/',
  ],
}
