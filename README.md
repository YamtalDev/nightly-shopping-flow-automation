# Nightly Shopping Flow Automation

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)
![Playwright Version](https://img.shields.io/badge/Playwright-%3E%3D1.20.0-blue)

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [OS Considerations](#os-considerations)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
    - [Clone the Repository](#clone-the-repository)
    - [Install Dependencies](#install-dependencies)
    - [Install Playwright Browsers](#install-playwright-browsers)
6. [Available Scripts](#available-scripts)
    - [Test Scripts](#test-scripts)
    - [Build and Clean Scripts](#build-and-clean-scripts)
    - [Linting Scripts](#linting-scripts)
7. [Project Structure](#project-structure)
8. [Running the Tests](#running-the-tests)
    - [Running Tests Locally](#running-tests-locally)
    - [Running Tests in Headed Mode](#running-tests-in-headed-mode)
    - [Generating Test Reports](#generating-test-reports)
9. [Continuous Integration (CI) with GitHub Actions](#continuous-integration-ci-with-github-actions)
    - [Workflow Overview](#workflow-overview)
    - [CI Configuration](#ci-configuration)
10. [Test Suite Overview](#test-suite-overview)
    - [Test Flow](#test-flow)
    - [Test Structure](#test-structure)
11. [Troubleshooting](#troubleshooting)
12. [License](#license)
13. [Contact](#contact)

## Introduction

**Nightly Shopping Flow Automation** is a comprehensive end-to-end (E2E) testing suite designed to automate and validate the nightly shopping flow of an online shopping system. Built with Node.js and TypeScript, this project leverages Playwright for browser automation, ensuring cross-browser compatibility and robustness. The suite is integrated with GitHub Actions to run tests automatically on a daily basis, ensuring continuous validation of the shopping system's functionality.

## Features

- **Cross-Browser Support**: Tests run on Chromium and Firefox to ensure consistent behavior across major browsers.
- **Modular Architecture**: Utilizes the Page Object Model (POM) for maintainability and scalability.
- **Comprehensive Test Coverage**: Covers login, product selection, cart management, checkout, and order verification flows.
- **Edge Case Testing**: Includes tests for invalid credentials, account lockout, and other edge scenarios.
- **Continuous Integration**: Automated daily test runs via GitHub Actions.
- **Detailed Reporting**: Generates HTML, JSON, and video reports for in-depth analysis of test runs.
- **Robust Error Handling**: Provides informative error messages and handles exceptions gracefully.
- **Secure Configuration**: Uses environment variables to manage sensitive data like user credentials.

## OS Considerations

This project is designed to run on major operating systems, including:

- **Windows 10/11**
- **macOS (Catalina and later)**
- **Linux (Ubuntu, Fedora, etc.)**

Ensure that you have Node.js and npm installed on your system. Playwright handles browser installations internally, making the setup process seamless across different OS environments.

## Prerequisites

Before setting up the project, ensure you have the following installed on your machine:

- **[Node.js](https://nodejs.org/en/) (v14.0.0 or later)**
- **[npm](https://www.npmjs.com/) (comes with Node.js)**
- **[Git](https://git-scm.com/)**
- **[GitHub Account](https://github.com/)** (for repository access and CI integration)

## Installation

### Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/YamtalDev/nightly-shopping-flow-automation.git
cd nightly-shopping-flow-automation
```

### Install Dependencies

Install the necessary Node.js dependencies using npm:

```bash
npm install
```

This command installs:

- **Playwright**: For browser automation.
- **@playwright/test**: Playwright's test runner.
- **TypeScript**: For type-safe JavaScript.
- **ts-node**: To execute TypeScript files directly.
- **Other Development Dependencies**: As specified in `package.json`.

### Install Playwright Browsers

Playwright requires browser binaries to run tests. Install them using:

```bash
npx playwright install chromium firefox
```

This command downloads the necessary browsers (Chromium and Firefox) required for cross-browser testing.

## Available Scripts

The project includes several npm scripts to facilitate various tasks such as testing, building, linting, and generating documentation. Below is an overview of these scripts along with explanations of the most important ones.

```json
"scripts": {
  "test": "playwright test",
  "test:report": "playwright show-report",
  "test:ci": "playwright test --reporter=dot",
  "build": "tsc",
  "clean": "rm -rf dist test-results playwright-report",
  "docs": "typedoc --out docs src",
  "lint": "eslint 'src/**/*.{js,ts}'",
  "lint:fix": "eslint 'src/**/*.{js,ts}' --fix",
  "format": "prettier --write 'src/**/*.{js,ts,json,md}'"
},
```

### Test Scripts

- **`npm run test`**

  Runs the entire Playwright test suite across all configured browsers (Chromium and Firefox) in headless mode. This is the primary command to execute all automated tests.

  ```bash
  npm run test
  ```

- **`npm run test:report`**

  Opens the HTML test report generated by Playwright. This report provides a detailed overview of test results, including passed and failed tests, screenshots, and video recordings.

  ```bash
  npm run test:report
  ```

- **`npm run test:ci`**

  Runs the Playwright tests using the dot reporter, which is suitable for Continuous Integration (CI) environments. This reporter provides concise output without verbose details.

  ```bash
  npm run test:ci
  ```

### Build and Clean Scripts

- **`npm run build`**

  Compiles the TypeScript source code into JavaScript, outputting the files to the `dist` directory as specified in the `tsconfig.json`.

  ```bash
  npm run build
  ```

- **`npm run clean`**

  Removes build artifacts and test results, including the `dist`, `test-results`, and `playwright-report` directories. This is useful for resetting the project state.

  ```bash
  npm run clean
  ```

### Linting Scripts

- **`npm run lint`**

  Runs ESLint on all JavaScript and TypeScript files within the `src` directory. ESLint checks for code quality issues, ensuring that the code adheres to predefined standards and best practices.

  ```bash
  npm run lint
  ```

- **`npm run lint:fix`**

  Executes ESLint with the `--fix` option, which automatically corrects fixable linting errors in the codebase. This helps in maintaining consistent code formatting and style.

  ```bash
  npm run lint:fix
  ```

- **`npm run format`**

  Formats all JavaScript, TypeScript, JSON, and Markdown files within the `src` directory using Prettier. Consistent code formatting enhances readability and maintainability.

  ```bash
  npm run format
  ```

**Important Scripts Explained:**

1. **`test`**

   The primary script to run all automated tests. It ensures that the application's critical flows are functioning as expected across different browsers.

2. **`test:report`**

   After running tests, this script generates a comprehensive HTML report. Reviewing this report helps in understanding test outcomes, identifying failures, and debugging issues.

3. **`test:ci`**

   Optimized for Continuous Integration environments, this script runs tests with a minimal output format, making it suitable for automated pipelines where detailed logs are unnecessary.

4. **`lint` and `lint:fix`**

   These scripts enforce code quality and consistency. Running `lint` helps identify potential issues, while `lint:fix` automatically resolves fixable problems, ensuring that the codebase remains clean and maintainable.

## Project Structure

Here's an overview of the project's directory structure:

```bash
├── .github/
│   └── workflows/
│       └── ci.yml
├── src/
│   ├── config/
│   │   ├── environment.ts
│   │   └── selectors/
│   │       ├── CartSelectors.ts
│   │       ├── CheckoutSelectors.ts
│   │       ├── LoginSelectors.ts
│   │       └── OrdersSelectors.ts
│   ├── fixtures/
│   │   └── PageFixture.ts
│   ├── pages/
│   │   ├── CartPage.ts
│   │   ├── CheckoutPage.ts
│   │   ├── LoginPage.ts
│   │   ├── OrdersPage.ts
│   │   └── ProductPage.ts
│   ├── tests/
│   │   ├── cart/
│   │   │   ├── addToCart.test.ts
│   │   │   └── removeFromCart.test.ts
│   │   ├── checkout/
│   │   │   └── checkout.test.ts
│   │   └── login/
│   │       ├── login.invalid.test.ts
│   │       ├── login.lockout.test.ts
│   │       └── login.valid.test.ts
│   └── utils/
│       ├── actions/
│       │   └── clickElementWhenReady.ts
│       └── data/
│           └── testData.ts
├── playwright.config.ts
├── tsconfig.json
└── .env
```

### Key Directories and Files

- **`.github/workflows/`**: Contains GitHub Actions workflows for Continuous Integration (CI), automating test runs on specified triggers.

- **`src/config/`**:
  - **`environment.ts`**: Manages environment variables and configurations.
  - **`selectors/`**: Stores selector definitions for different pages, promoting reusability and maintainability.

- **`src/fixtures/`**:
  - **`PageFixture.ts`**: Defines test fixtures that extend Playwright's base test, providing pre-configured page objects for use in tests.

- **`src/pages/`**:
  - **Page Object Model (POM) Classes**: Encapsulate interactions with specific pages of the application, such as `LoginPage`, `CartPage`, `CheckoutPage`, `OrdersPage`, and `ProductPage`.

- **`src/tests/`**:
  - **Feature-Based Test Organization**: Tests are organized into subdirectories based on the feature they cover, such as `cart`, `checkout`, and `login`. This structure enhances readability and scalability.

- **`src/utils/`**:
  - **`actions/`**: Contains utility functions for common actions, like `clickElementWhenReady`, which handles clicking elements with appropriate waits.
  - **`data/`**: Stores test data, such as product combinations used in tests.

- **`playwright.config.ts`**: Playwright configuration file defining test settings, reporters, browsers, and other options.

- **`tsconfig.json`**: TypeScript configuration file specifying compiler options and project structure.

- **`.env`**: Environment variables file storing sensitive data like user credentials and base URLs.

## Running the Tests

### Running Tests Locally

To execute all tests in the `src/tests` directory:

```bash
npm run test
```

This command runs the test suite across all configured browsers (Chromium and Firefox) in headless mode. It ensures that the application's critical flows are functioning correctly without the need for a visible browser window.

### Running Tests in Headed Mode

For debugging purposes, you might want to run tests with the browser UI visible. This allows you to observe the test execution in real-time and identify issues more effectively.

```bash
npx playwright test src/tests/login --headed
```

Replace `login/` with the desired test directory or file as needed. You can also run all the tests in headed mode by omitting the directory or file specification:

```bash
npx playwright test --headed
```

### Generating Test Reports

After running tests, Playwright generates detailed reports that provide insights into test outcomes, including passed and failed tests, screenshots, and video recordings.

1. **Run Tests with Report Generation:**

   Ensure your `playwright.config.ts` includes the `html` reporter.

   ```typescript
   reporter: [
     ['list'],
     ['json', { outputFile: 'test-results/results.json' }],
     ['html', { open: 'never' }],
   ],
   ```

2. **Generate and View the Report:**

   ```bash
   npm run test
   npx playwright show-report
   ```

   This command opens an HTML report in your default browser, providing a comprehensive overview of the test results. The report includes details such as test durations, failure reasons, and visual artifacts like screenshots and videos.

## Continuous Integration (CI) with GitHub Actions

### Workflow Overview

GitHub Actions is configured to run your test suite daily, ensuring that the shopping flow remains functional and any regressions are promptly detected. This automated approach helps maintain the reliability and stability of the application by continuously validating its critical functionalities.

### CI Configuration

The CI workflow is defined in `.github/workflows/ci.yml`. Here's an overview:

```yaml
name: CI

on:
  schedule:
    - cron: '0 0 * * *' # Runs daily at midnight UTC
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        browser: [chromium, firefox]

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'

      - name: Install Dependencies
        run: npm install

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps

      - name: Run Tests
        run: npx playwright test

      - name: Upload Test Results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: test-results
          path: test-results/
```

**Key Components:**

- **Trigger Events:**
  - **Scheduled Runs:** Configured to run daily at midnight UTC using a cron schedule (`'0 0 * * *'`).
  - **Push and Pull Requests:** Executes the workflow on pushes and pull requests targeting the `main` branch.

- **Jobs:**
  - **Test Job:** Executes the test suite on Ubuntu using Chromium and Firefox browsers.

- **Steps:**
  1. **Checkout Repository:** Retrieves the latest code from the repository.
  2. **Setup Node.js:** Installs Node.js version 16, which is specified as the required version for the project.
  3. **Install Dependencies:** Runs `npm install` to install all necessary project dependencies.
  4. **Install Playwright Browsers:** Executes `npx playwright install chromium firefox` to install only the required browsers (Chromium and Firefox).
  5. **Run Tests:** Executes the Playwright test suite using `npx playwright test`.
  6. **Upload Test Results:** Regardless of test outcomes, this step uploads the `test-results/` directory as an artifact for later review.

**Customization:**

- **Cron Schedule:** Adjust the `cron` expression to change the frequency or timing of test runs. For example, to run tests every hour, you could use `'0 * * * *'`.
- **Node.js Version:** Update the `node-version` field if your project requires a different version of Node.js.
- **Browser Selection:** Currently set to install and test Chromium and Firefox. Adjust the browsers as needed based on your testing requirements.

**Security Note:** Since the `.env` file is exposed in the repository, ensure that the test credentials have limited access and do not possess sensitive permissions. For enhanced security, consider using GitHub Secrets to manage environment variables.

---

## Test Suite Overview

### Test Flow

The automated test suite follows the end-to-end flow of a user interacting with the online shopping system:

1. **Navigate to the Website and Log In:**
   - Accesses the base URL.
   - Logs in using valid credentials provided in the `.env` file.

2. **Add Products to the Shopping Cart:**
   - Selects multiple products.
   - Adds specified quantities to the cart.

3. **Navigate to the Shopping Cart and Verify Products:**
   - Opens the cart page.
   - Ensures the correct products and quantities are present.

4. **Proceed to the Checkout Page and Fill in Shipping Information:**
   - Initiates the checkout process.
   - Inputs shipping address details.

5. **Complete the Checkout Process and Verify Order Placement:**
   - Confirms the checkout.
   - Captures the generated order ID.
   - Navigates to the Orders page.
   - Verifies that the order appears with correct details.

6. **Additional Test Flow:**
   - Tests for edge cases, such as handling invalid inputs or ensuring system stability under various scenarios.

### Test Structure

Tests are organized based on features, following the Page Object Model (POM) for better maintainability and scalability.

```bash
src/
├── tests/
│   ├── cart/
│   │   ├── addToCart.test.ts
│   │   └── removeFromCart.test.ts
│   ├── checkout/
│   │   └── checkout.test.ts
│   └── login/
│       ├── login.invalid.test.ts
│       ├── login.lockout.test.ts
│       └── login.valid.test.ts
```

- **Login Tests:** Validate different login scenarios, including valid login, invalid credentials, and account lockout after multiple failed attempts.
- **Cart Tests:** Ensure products can be added and removed from the shopping cart correctly.
- **Checkout Tests:** Automate the checkout process and verify that orders are placed and recorded accurately.

---

## Troubleshooting

### Common Issues

1. **Environment Variables Not Set:**
   - **Solution:** Ensure that the `.env` file exists in the root directory and contains all required variables (`EMAIL`, `PASSWORD`, `BASE_URL`).

2. **Playwright Browsers Not Installed:**
   - **Solution:** Run `npx playwright install chromium firefox` to download necessary browser binaries.

3. **Test Failures Due to Selectors:**
   - **Solution:** Verify that the selectors in `src/config/selectors/` accurately match the elements in the application. Use Playwright's inspector to debug selectors.

4. **CI Pipeline Failures:**
   - **Solution:** Check GitHub Actions logs for detailed error messages. Ensure that secrets and environment variables are correctly configured in the repository settings.

### Debugging Tips

- **Run Tests in Headed Mode:**

  ```bash
  npx playwright test src/tests/checkout/ --headed
  ```

  This allows you to see the browser actions in real-time, making it easier to identify where tests might be failing.

- **Use Playwright Trace Viewer:**

  ```bash
  npx playwright show-trace path/to/trace.zip
  ```

  This tool provides a detailed step-by-step execution of your tests, helping you pinpoint the exact moment and cause of failures.

- **Inspect Screenshots and Videos:**

  Review the artifacts in the `test-results/` directory to identify visual issues during test runs. Playwright captures screenshots and videos on test failures, which can be invaluable for debugging.

---

## License

This project is licensed under the [MIT License](./LICENSE).

## Contact

For any questions, suggestions, or feedback, please reach out to:

- **Name:** Tal Aharon
- **Email:** <tal.aharon.work@gmail.com>
- **GitHub:** [YamtalDev](https://github.com/YamtalDev)

---

**Notes on Changes:**

- **Removed Sections:**
  - **Configure Environment Variables:** Instructions on creating and configuring the `.env` file using `.env.example` have been removed, as the `.env` file is now provided.
  - **Create a Test Account:** The section guiding users to register an account on the application has been removed, since registration is no longer necessary.

- **Updated Browser References:**
  - All mentions of **WebKit** have been removed. The test suite now runs on **Chromium** and **Firefox** only.
  - The **Features** and **CI Configuration** sections have been updated to reflect this change.

- **Adjusted Installation Steps:**
  - The **Install Playwright Browsers** section now mentions only Chromium and Firefox.

- **CI Workflow Update:**
  - The browser matrix in the CI configuration (`ci.yml`) has been removed to prevent redundant test runs.
  - The **Install Playwright Browsers** step now installs only Chromium and Firefox.

- **Test Flow and Structure:**
  - The test suite overview has been updated to ensure consistency with the changes.

---
