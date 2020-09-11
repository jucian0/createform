module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  projects: ['<rootDir>/packages/**/jest.config.js'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['*.test.ts', '*.test.tsx']
}
