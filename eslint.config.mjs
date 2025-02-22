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
      "max-lines-per-function": ["warn", 13],
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "no-console": ["error"],
      "indent": ["warn", 4],
      "prefer-const": ["warn"]
    }
  }
];