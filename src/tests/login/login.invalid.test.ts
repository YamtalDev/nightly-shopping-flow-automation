import { expect } from '@playwright/test';
import test from '../../fixtures/PageFixture';
import { testUsers } from '../../utils/data/testData';

test.describe.serial('Invalid Email and Credentials Login Test', () => {
	test('Should display an error for invalid email format', async ({
		loginPage,
		page,
	}) => {
		await loginPage.checkInvalidEmailWarning('invalid-email');
		await expect(page.locator('text=Sign out')).not.toBeVisible();
	});

	test('Should display an error for invalid credentials', async ({
		loginPage,
		page,
	}) => {
		await loginPage.login(
			testUsers.invalidUser.email,
			testUsers.invalidUser.password
		);
		await loginPage.checkInvalidCredentialsError();
		await expect(page.locator('text=Sign out')).not.toBeVisible();
	});
});
