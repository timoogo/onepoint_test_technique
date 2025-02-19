/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"], // Localisation des tests
  verbose: true,
  clearMocks: true,
  setupFilesAfterEnv: ["./jest.setup.ts"],

};
