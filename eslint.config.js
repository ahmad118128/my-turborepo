import { baseConfig } from '@repo/eslint-config/base';

// eslint.config.js
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({});

export default [
  ...compat.extends(baseConfig),
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {},
  },
];
