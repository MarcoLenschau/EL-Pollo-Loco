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
      "jsdoc/require-jsdoc": [
        "error",
        {
          "require": {
            "FunctionDeclaration": true,
            "MethodDefinition": true,
            "ArrowFunctionExpression": true,
            "FunctionExpression": true
          }
        }
      ],
      "camelcase": [
        "error",
        {
          "properties": "always", 
          "ignoreDestructuring": false,
          "ignoreImports": false,
          "ignoreGlobals": false,
          "allow": ["^([a-z0-9]+(_[a-z0-9]+)*_)?sound$", "^([a-z0-9]+(_[a-z0-9]+)*_)?x$", "^([a-z0-9]+(_[a-z0-9]+)*_)?y$"]
        }
      ]
    },
    plugins: {
      jsdoc: jsdoc
    }
  }
];