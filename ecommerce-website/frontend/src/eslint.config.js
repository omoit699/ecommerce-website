import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  js.configs.recommended,

  {
    files: ["**/*.{js,jsx}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      globals: {
        fetch: "readonly",
        localStorage: "readonly",
        console: "readonly",
        window: "readonly",
        document: "readonly"
      }
    },

    plugins: {
      react,
      "react-hooks": reactHooks
    },

    settings: {
      react: {
        version: "detect"
      }
    },

    rules: {
      // React core
      "react/react-in-jsx-scope": "off",

      // Hooks rules (IMPORTANT)
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // General JS cleanup
      "no-unused-vars": "warn",

      // 🔥 IMPORTANT FIX: removes all your ProductCard + prop issues
      "react/prop-types": "off"
    }
  }
];