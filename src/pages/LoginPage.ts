import { expect, Page } from '@playwright/test';
import { environment } from '../config/environment.';
import { LOGIN_SELECTORS } from '../config/selectors/LoginSelectors';
import { clickElementWhenReady } from '../utils/actions/clickElementWhenReady';

/**
 * @brief Represents the Login Page and encapsulates interactions with it.
 */
export class LoginPage {
  constructor(public page: Page) {}

  async navigate() {
    try {
      await this.page.goto(environment.BASE_URL, { waitUntil: 'networkidle' });
      await this.page.waitForSelector(LOGIN_SELECTORS.emailInput, { timeout: 10000 });
    } catch (error) {
      throw new Error(`Navigation to ${environment.BASE_URL} failed. Error: ${error}`);
    }
  }

  async login(email: string, password: string) {
    try {
      await this.page.fill(LOGIN_SELECTORS.emailInput, email);
      await this.page.fill(LOGIN_SELECTORS.passwordInput, password);
      const signInButton = this.page.getByRole('button', { name: 'Sign in' });
      await signInButton.waitFor({ state: 'visible', timeout: 10000 });
      await expect(signInButton).toBeEnabled({ timeout: 10000 });
      await clickElementWhenReady(signInButton);
    } catch (error) {
      throw new Error(`Login failed for email: ${email}. Error: ${error}`);
    }
  }

  async checkInvalidEmailWarning(email: string) {
    await this.page.fill(LOGIN_SELECTORS.emailInput, email);
    const isInvalidEmail = await this.page.locator(LOGIN_SELECTORS.emailInput).evaluate(
      (input) => input.matches(':invalid')
    );
    expect(isInvalidEmail).toBe(true);
  }

  async checkInvalidCredentialsError() {
    await this.page.waitForSelector('text=Incorrect username or password', { timeout: 10000 });
    const errorMessage = await this.page.locator('text=Incorrect username or password').textContent();
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
