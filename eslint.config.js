// eslint.config.js
import { FlatCompat } from '@eslint/eslintrc';
import eslintConfig from '@repo/eslint-config/base';

const compat = new FlatCompat({});

export default [
  // می‌تونی پکیج eslint-config خودمون رو load کنی
  ...compat.extends(eslintConfig),
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      // rules اضافی project-specific
    },
  },
];
