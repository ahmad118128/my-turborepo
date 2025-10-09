import { defineProject, mergeConfig } from 'vitest/config';
import { baseConfig } from './base-config.js';

export const uiConfig = mergeConfig(
  baseConfig,
  defineProject({
    test: {
      environment: 'jsdom',
      include: [
        '**/*.test.ts', // فقط فایل‌هایی که .test.ts دارن
      ],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
        '**/e2e/**', // حتی اگه فایل .test.ts تو e2e باشه
        '**/playwright.config.*',
      ],
    },
  }),
);
