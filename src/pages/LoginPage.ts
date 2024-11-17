import { expect, Page } from '@playwright/test';
import { environment } from '../config/environment';
import { LOGIN_SELECTORS } from '../config/selectors/LoginSelectors';
import { clickElementWhenReady } from '../utils/actions/clickElementWhenReady';

/**
 * @brief Represents the Login Page and encapsulates interactions with it.
 */
export class LoginPage {
  constructor(public page: Page) {}

  /**
   * @method Navigates to the login page.
   * @throws Will throw an error if navigation fails.
   */
  async navigate(): Promise<void> {
    try {
      await this.page.goto(environment.BASE_URL, { waitUntil: 'networkidle' });
      await this.page.waitForSelector(LOGIN_SELECTORS.emailInput, { timeout: 10000 });
    } catch (error) {
      throw new Error(`Navigation to ${environment.BASE_URL} failed. ${error}`);
    }
  }

  /**
   * @method Logs in with the provided email and password.
   * @param email - The user's email address.
   * @param password - The user's password.
   * @throws Will throw an error if login fails.
   */
  async login(email: string, password: string): Promise<void> {
    try {
      await this.page.fill(LOGIN_SELECTORS.emailInput, email);
      await this.page.fill(LOGIN_SELECTORS.passwordInput, password);
      const signInButton = this.page.locator(LOGIN_SELECTORS.signInButton);
      await clickElementWhenReady(signInButton);
    } catch (error) {
      throw new Error(`Login failed for email: ${email}. ${error}`);
    }
  }

  /**
   * @method Checks for invalid email format warning.
   * @param email - The invalid email to test.
   */
  async checkInvalidEmailWarning(email: string): Promise<void> {
    await this.page.fill(LOGIN_SELECTORS.emailInput, email);
    const isInvalidEmail = await this.page.locator(LOGIN_SELECTORS.emailInput).evaluate(
      (input) => input.validity.valid === false
    );
    expect(isInvalidEmail).toBe(true);
  }

  /**
   * @method Verifies the "Incorrect username or password" error message is displayed.
   */
  async checkInvalidCredentialsError(): Promise<void> {
    await this.page.waitForSelector(LOGIN_SELECTORS.invalidCredentialsError, { timeout: 10000 });
    const errorMessage = await this.page.locator(LOGIN_SELECTORS.invalidCredentialsError).textContent();
    expect(errorMessage).toContain('Incorrect username or password');
  }

  async checkPasswordAttemptsExceededError() {
    await this.page.waitForSelector('text=Password attempts exceeded', { timeout: 10000 });
    const errorMessage = await this.page.locator('text=Password attempts exceeded').textContent();
    expect(errorMessage).toContain('Password attempts exceeded');
  }

  async verifySuccessfulLogin() {
    await this.page.waitForSelector('text=Sign out', { timeout: 10000 });
    await expect(this.page.locator('text=Sign out')).toBeVisible();
  }
}
