import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './src/tests',
  timeout: 80000,
  expect: {
    timeout: 60000,
  },
  use: {
    headless: true,
    viewport: { width: 1920, height: 1080 },
    colorScheme: 'light',
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 60000,
    navigationTimeout: 80000,
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
  ],
  reporter: [
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['html', { open: 'never' }],
  ],
  retries: 1,
  workers: process.env.CI ? 2 : 4,
};

export default config;