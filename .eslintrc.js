module.exports = {
    env: {
      es2021: true,
      node: true,
    },
    extends: [
      "eslint:recommended",
      "plugin:import/recommended",
      "plugin:import/typescript",
      "prettier"
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "import"],
    rules: {
      "import/order": ["error", { "alphabetize": { "order": "asc" } }]
    }
  };
  