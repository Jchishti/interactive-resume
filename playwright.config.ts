import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 10000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:5173',
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'off', // You can switch to 'retain-on-failure' later if needed
  },
  reporter: [
    ['dot'],
    ['html', { open: 'on-failure', outputFolder: 'playwright-report' }]
  ],
});