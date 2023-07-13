/* eslint-env node */

module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  extends: ['eslint-config-prettier', 'prettier', 'eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking', 'plugin:react-hooks/recommended', 'plugin:storybook/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: true,
    tsconfigRootDir: __dirname
  },
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'prettier/prettier': ['warn', {
      arrowParens: 'always',
      semi: false,
      trailingComma: 'none',
      tabWidth: 2,
      endOfLine: 'auto',
      useTabs: false,
      singleQuote: true,
      printWidth: 120,
      jsxSingleQuote: true
    }],
    'react-refresh/only-export-components': ['warn', {
      allowConstantExport: true
    }],
    '@typescript-eslint/no-non-null-assertion': 'off'
  },
  ignorePatterns: ['.eslintrc.cjs', 'vite.config.ts']
};