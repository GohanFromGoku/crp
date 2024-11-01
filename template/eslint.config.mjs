import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { ignores: ["scripts/*", "webpack/*", "node_modules/*", "build/*", "dist/*"] },
  {
    languageOptions: { globals: globals.browser },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "comma-dangle": [
        "error",
        {
          arrays: "always-multiline",
          exports: "always-multiline",
          functions: "never",
          imports: "always-multiline",
          objects: "always-multiline",
        },
      ],
      curly: "error",
      "eol-last": ["error", "always"],
      eqeqeq: "error",
      "getter-return": "error",
      indent: ["error", 2],
      "key-spacing": [
        "error",
        {
          afterColon: true,
          beforeColon: false,
          mode: "strict",
        },
      ],
      "linebreak-style": ["error", "unix"],
      "max-depth": ["error", 4],
      "no-dupe-args": "error",
      "no-dupe-keys": "error",
      "no-extra-semi": "error",
      "no-lonely-if": "error",
      "no-unused-expressions": "error",
      quotes: ["error", "double"],
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      semi: ["error", "always"],
      "sort-imports": [
        "error",
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "single", "multiple"],
          allowSeparatedGroups: false,
        },
      ],
    },
  },

  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
