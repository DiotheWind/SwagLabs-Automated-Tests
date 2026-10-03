import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test('Login with correct credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const username = process.env.STANDARD_USERNAME;
    const password = process.env.PASSWORD;

    await loginPage.navigateTo();
    await loginPage.fillUsername(username);
    await loginPage.fillPassword(password);
    await loginPage.clickLogin();

    await expect(page).toHaveURL('/inventory.html');
    await expect(page.getByTestId('title')).toHaveText('Products');
});

test('Login with incorrect credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateTo();
    await loginPage.fillUsername('no_user');
    await loginPage.fillPassword('random_password');
    await loginPage.clickLogin();

    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

test('Login without filling the username field', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const password = process.env.PASSWORD;

    await loginPage.navigateTo();
    await loginPage.fillPassword(password);
    await loginPage.clickLogin();

    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
});

test('Login without filling the password field', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const username = process.env.STANDARD_USERNAME;

    await loginPage.navigateTo();
    await loginPage.fillUsername(username);
    await loginPage.clickLogin();

    await expect(page.getByText('Epic sadface: Password is required')).toBeVisible();
});

test('Accessing the inventory page without logging in', async ({ page }) => {
    await page.goto('/inventory.html');

    await expect(page).toHaveURL('/');
    await expect(page.getByText("Epic sadface: You can only access '/inventory.html' when you are logged in.")).toBeVisible();
});
