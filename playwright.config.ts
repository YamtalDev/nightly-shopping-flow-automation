import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './src/tests',
  timeout: 30000, // Reduced from 80000ms to 30000ms for better efficiency
  expect: {
    timeout: 5000, // Reduced from 7000ms
  },
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure', // Capture video only on failure to save space
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure', // Retain trace on failure for debugging
    actionTimeout: 10000, // Timeout for individual actions
    navigationTimeout: 30000, // Timeout for navigations
    // Remove global launchOptions
  },
  projects: [
    {
      name: 'Chromium',
      use: {
        browserName: 'chromium',
        launchOptions: {
          args: ['--disable-features=IsolateOrigins,site-per-process'],
        },
      },
    },
    {
      name: 'Firefox',
      use: {
        browserName: 'firefox',
        launchOptions: {
          args: ['--disable-features=IsolateOrigins,site-per-process'],
        },
      },
    },
    {
      name: 'WebKit',
      use: {
        browserName: 'webkit',
        // No additional launch arguments for WebKit
      },
    },
  ],
  reporter: [
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['html', { open: 'never' }],
  ],
  retries: 1,
  workers: process.env.CI ? 2 : undefined,
};

export default config;
