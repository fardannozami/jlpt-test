import js from "@eslint/js";
import ts from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default [
    {
        ignores: ["node_modules/**", "dist/**", "build/**", ".next/**"],
    },
    js.configs.recommended,
    ...ts.configs.recommended,
    prettier,
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parserOptions: {
                project: "./tsconfig.json",
            },
        },
        rules: {
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
            ]
        },
    },
];
