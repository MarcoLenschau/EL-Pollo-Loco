import globals from "globals";

export default [
  {
    files: ["scripts/*.js", "models/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser
    },
    rules: {
      "max-lines-per-function": ["error", 15],
      "semi": ["error", "always"],
      "quotes": ["error", "double"]
    }
  }
];