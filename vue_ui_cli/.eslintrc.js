module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': 0,
    'eslint linebreak-style': [0, 'error', 'windows', ],
    'comma-dangle': ['error', 'always', ],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
