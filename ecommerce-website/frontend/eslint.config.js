import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import babelParser from "@babel/eslint-parser";

export default [
  js.configs.recommended,

  {
    files: ["**/*.{js,jsx}"],

    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },

      globals: {
        fetch: "readonly",
        localStorage: "readonly",
        console: "readonly",
        window: "readonly",
        document: "readonly",
      },
    },

    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": "warn",

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];