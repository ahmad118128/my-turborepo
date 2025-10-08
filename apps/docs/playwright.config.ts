import { defineConfig } from '@playwright/test';
import { sharedConfig } from '@repo/playwright-config';

export default defineConfig({
  ...sharedConfig,
  testDir: './tests/e2e',
  outputDir: './playwright-results',
});
