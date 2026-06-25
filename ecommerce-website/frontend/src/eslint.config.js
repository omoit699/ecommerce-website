import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
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
      react: react, // ✅ IMPORTANT FIX (explicit mapping)
      "react-hooks": reactHooks,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-unused-vars": "warn",

      // 🚨 FORCE DISABLE (NOW WORKS PROPERLY)
      "react/prop-types": "off",
    },
  },
];