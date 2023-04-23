module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module", jsx: true },
  plugins: ["react-refresh", "import", "react", "@typescript-eslint"],
  rules: {
    "react-refresh/only-export-components": "warn",
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    tailwindcss: {
      whitelist: ["i\\-primary", "i\\-secondary", "i\\-alternate"],
    },
  },
};
