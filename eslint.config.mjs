import globals from "globals";
import jsdoc from "eslint-plugin-jsdoc";

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
        "prefer-const": ["warn"],
        "jsdoc/require-jsdoc": ["error", {
          "require": {
            "FunctionDeclaration": true,
            "MethodDefinition": true,
            "ArrowFunctionExpression": true,
            "FunctionExpression": true
          }
        }]
      },
      plugins: {
        jsdoc: jsdoc
      }
    }
];