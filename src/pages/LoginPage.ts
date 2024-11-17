import { expect, Page } from '@playwright/test';
import { credentials } from '../utils/credentials';

export class LoginPage {
  constructor(public page: Page) {}

  async navigate() {
    await this.page.goto(credentials.BASE_URL);
    await this.page.waitForLoadState('domcontentloaded'); // Optimized loading wait
  }

  async login(email: string, password: string) {
    await this.page.fill('input[placeholder="Enter your Email"]', email);
    await this.page.fill('input[placeholder="Enter your Password"]', password);
    await this.page.click('button.amplify-button:has-text("Sign in")');
  }

  async checkInvalidEmailWarning(email: string) {
    await this.page.fill('input[placeholder="Enter your Email"]', email);
    const isInvalidEmail = await this.page.locator('input[placeholder="Enter your Email"]').evaluate(
      (input) => input.matches(':invalid') // Safe and concise way to validate
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
