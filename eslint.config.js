module.exports = [
    {
        rules: {
            semi: "error",
            "prefer-const": "warn",
            "quotes": ["error", "double"],
            "indent": ["warn", 4, { "SwitchCase": 1 }],
            "max-lines-per-function": ["warn", { "max": 14, "skipComments": true, "skipBlankLines": true }]
        }
    }
];