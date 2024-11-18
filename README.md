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
    - [Configure Environment Variables](#configure-environment-variables)
    - [Install Playwright Browsers](#install-playwright-browsers)
6. [Project Structure](#project-structure)
7. [Running the Tests](#running-the-tests)
    - [Running Tests Locally](#running-tests-locally)
    - [Running Tests in Headed Mode](#running-tests-in-headed-mode)
    - [Generating Test Reports](#generating-test-reports)
8. [Continuous Integration (CI) with GitHub Actions](#continuous-integration-ci-with-github-actions)
    - [Workflow Overview](#workflow-overview)
    - [CI Configuration](#ci-configuration)
9. [Test Suite Overview](#test-suite-overview)
    - [Test Flow](#test-flow)
    - [Test Structure](#test-structure)
10. [Troubleshooting](#troubleshooting)
11. [Contributing](#contributing)
12. [License](#license)
13. [Contact](#contact)
14. [Acknowledgments](#acknowledgments)

## Introduction

**Nightly Shopping Flow Automation** is a comprehensive end-to-end (E2E) testing suite designed to automate and validate the nightly shopping flow of an online shopping system. Built with Node.js and TypeScript, this project leverages Playwright for browser automation, ensuring cross-browser compatibility and robustness. The suite is integrated with GitHub Actions to run tests automatically on a daily basis, ensuring continuous validation of the shopping system's functionality.

## Features

- **Cross-Browser Support**: Tests run on Chromium, Firefox, and WebKit to ensure consistent behavior across major browsers.
- **Modular Architecture**: Utilizes the Page Object Model (POM) for maintainability and scalability.
- **Comprehensive Test Coverage**: Covers login, product selection, cart management, checkout, and order verification flows.
- **Edge Case Testing**: Includes tests for invalid credentials, account lockout, and other edge scenarios.
- **Continuous Integration**: Automated daily test runs via GitHub Actions, ensuring the system's reliability.
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
git clone https://github.com/your-username/nightly-shopping-flow-automation.git
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

### Configure Environment Variables

Create a `.env` file in the root directory to store your environment variables:

```bash
cp .env.example .env
```

Open the `.env` file and populate it with your credentials:

```env
EMAIL=your-email@example.com
PASSWORD=your-secure-password
BASE_URL=https://main.d2t1pk7fjag8u6.amplifyapp.com/
```

**Note**: Replace `your-email@example.com` and `your-secure-password` with the credentials of the user account created for testing purposes.

### Install Playwright Browsers

Playwright requires browser binaries to run tests. Install them using:

```bash
npx playwright install
```

This command downloads the necessary browsers (Chromium, Firefox, WebKit) required for cross-browser testing.

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
│   │   └── loginFixture.ts
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
├── package.json
├── package-lock.json
├── README.md
└── LICENSE
```

### Key Directories and Files

- **.github/workflows/**: Contains GitHub Actions workflows for CI.
- **src/config/**: Configuration files, including environment variables and selectors.
- **src/fixtures/**: Test fixtures that extend Playwright's base test.
- **src/pages/**: Page Object Model (POM) classes encapsulating interactions with specific pages.
- **src/tests/**: Test files organized by feature (login, cart, checkout).
- **src/utils/**: Utility functions and test data.
- **playwright.config.ts**: Playwright configuration file.
- **tsconfig.json**: TypeScript configuration.
- **package.json**: Project dependencies and scripts.
- **LICENSE**: MIT License.
- **README.md**: Project documentation.

## Running the Tests

### Running Tests Locally

To execute all tests in the `src/tests` directory:

```bash
npm run test
```

This command runs the test suite across all configured browsers (Chromium, Firefox, WebKit) in headless mode.

### Running Tests in Headed Mode

For debugging purposes, you might want to run tests with the browser UI visible:

```bash
npx playwright test src/tests/checkout/ --headed
```

Replace `checkout/` with the desired test directory or file as needed.

### Generating Test Reports

After running tests, Playwright generates detailed reports. To view them:

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

   This command opens an HTML report in your default browser, providing a comprehensive overview of the test results.

## Continuous Integration (CI) with GitHub Actions

### Workflow Overview

GitHub Actions is configured to run your test suite daily, ensuring that the shopping flow remains functional and any regressions are promptly detected.

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
        browser: [chromium, firefox, webkit]

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
  - **Scheduled Runs:** Daily at midnight UTC.
  - **Push and Pull Requests:** On changes to the `main` branch.

- **Jobs:**
  - **Test Job:** Executes the test suite across Chromium, Firefox, and WebKit.

- **Steps:**
  1. **Checkout Repository:** Retrieves the latest code.
  2. **Setup Node.js:** Installs Node.js version 16.
  3. **Install Dependencies:** Runs `npm install` to install project dependencies.
  4. **Install Playwright Browsers:** Ensures Playwright has all necessary browsers.
  5. **Run Tests:** Executes the test suite.
  6. **Upload Test Results:** Saves test artifacts for review.

**Customization:**

- **Cron Schedule:** Adjust the `cron` expression in the workflow file to change the frequency or timing of test runs.
- **Node.js Version:** Update the `node-version` field to use a different Node.js version if necessary.

## Test Suite Overview

### Test Flow

The automated test suite follows the end-to-end flow of a user interacting with the online shopping system:

1. **Navigate to the Website and Log In:**
   - Accesses the base URL.
   - Logs in using valid credentials.

2. **Add Products to the Shopping Cart:**
   - Selects two different products.
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

7. **Bug Reporting and Validation:**
   - Identifies and reports at least one bug or issue.
   - Includes a test flow to catch the reported bug, ensuring it doesn't regress.

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

## Troubleshooting

### Common Issues

1. **Environment Variables Not Set:**
   - **Solution:** Ensure that the `.env` file exists in the root directory and contains all required variables (`EMAIL`, `PASSWORD`, `BASE_URL`).

2. **Playwright Browsers Not Installed:**
   - **Solution:** Run `npx playwright install` to download necessary browser binaries.

3. **Test Failures Due to Selectors:**
   - **Solution:** Verify that the selectors in `src/config/selectors/` accurately match the elements in the application. Use Playwright's inspector to debug selectors.

4. **CI Pipeline Failures:**
   - **Solution:** Check GitHub Actions logs for detailed error messages. Ensure that secrets and environment variables are correctly configured in the repository settings.

### Debugging Tips

- **Run Tests in Headed Mode:**

  ```bash
  npx playwright test src/tests/checkout/ --headed
  ```

  This allows you to see the browser actions in real-time.

- **Use Playwright Trace Viewer:**

  ```bash
  npx playwright show-trace path/to/trace.zip
  ```

  This tool provides a detailed step-by-step execution of your tests.

- **Inspect Screenshots and Videos:**
  Review the artifacts in the `test-results/` directory to identify visual issues during test runs.

## Contributing

Contributions are welcome! To contribute to **Nightly Shopping Flow Automation**, follow these steps:

1. **Fork the Repository:**
   - Click the "Fork" button at the top-right corner of the repository page.

2. **Clone Your Fork:**

   ```bash
   git clone https://github.com/your-username/nightly-shopping-flow-automation.git
   cd nightly-shopping-flow-automation
   ```

3. **Create a New Branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Your Changes:**
   - Implement your feature or fix.

5. **Commit Your Changes:**

   ```bash
   git commit -m "Add feature XYZ"
   ```

6. **Push to Your Fork:**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request:**
   - Navigate to your fork on GitHub.
   - Click the "Compare & pull request" button.
   - Provide a clear description of your changes and submit the PR.

**Guidelines:**

- **Code Quality:** Ensure your code follows the existing coding standards and is well-documented.
- **Testing:** Add or update tests as necessary to cover new features or fixes.
- **Commit Messages:** Use clear and descriptive commit messages.
- **Respect the Workflow:** Follow the established project structure and practices.

## License

This project is licensed under the [MIT License](./LICENSE).

## Contact

For any questions, suggestions, or feedback, please reach out to:

- **Name:** Your Name
- **Email:** <your-email@example.com>
- **GitHub:** [your-username](https://github.com/your-username)

## Acknowledgments

- **[Playwright](https://playwright.dev/):** Powerful end-to-end testing framework for web applications.
- **[Node.js](https://nodejs.org/):** JavaScript runtime environment for building scalable network applications.
- **[TypeScript](https://www.typescriptlang.org/):** Typed superset of JavaScript that compiles to plain JavaScript.
- **[GitHub Actions](https://github.com/features/actions):** Automate, customize, and execute software development workflows right in your repository.

---

Thank you for using **Nightly Shopping Flow Automation**! If you have any questions or need further assistance, feel free to open an issue or reach out directly.
