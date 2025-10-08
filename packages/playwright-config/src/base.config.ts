import type { PlaywrightTestConfig, ReporterDescription } from '@playwright/test';
import { devices } from '@playwright/test';

const reporters: ReporterDescription[] = [
  ['list'], // list reporter
  ['html', { open: 'never' }], // html reporter with options
];

export const sharedConfig: PlaywrightTestConfig = {
  timeout: 30_000,
  reporter: reporters,
  use: {
    headless: true,
    trace: 'on-first-retry',
    viewport: { width: 1280, height: 720 },
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
};
