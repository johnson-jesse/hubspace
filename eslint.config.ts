import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

// @ts-expect-error no types available
import pluginChaiFriendly from "eslint-plugin-chai-friendly";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: {
      js,
    },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser,
    },
  },

  tseslint.configs.recommended,

  {
    files: ["tests/**/*.{ts,js}"],
    plugins: {
      "chai-friendly": pluginChaiFriendly,
    },
    rules: {
      "no-unused-expressions": "off", // disable original rule
      "@typescript-eslint/no-unused-expressions": "off", // disable TypeScript ESLint version
      "chai-friendly/no-unused-expressions": "error",
    },
  },

  eslintConfigPrettier,
]);
