import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './src/tests',
  timeout: 80000,
  expect: {
    timeout: 7000
  },
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on',
    screenshot: 'only-on-failure',
    contextOptions: {
      isMobile: false,
      acceptDownloads: true,
    },
  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' }
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' }
    },
    {
      name: 'WebKit',
      use: {
        browserName: 'webkit',
        viewport: { width: 1200, height: 800 },
      }
    }
  ],
  reporter: [['list'], ['json', { outputFile: 'test-results/results.json' }]],
  retries: 1
};

export default config;
