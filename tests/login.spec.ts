import { test, expect } from '../fixtures/test';

const username = process.env.STANDARD_USERNAME;
const password = process.env.PASSWORD;

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page, loginPage }) => {
    await loginPage.navigateTo();
});

test('Login with correct credentials', async ({ page, loginPage }) => {
    await loginPage.fillUsername(username);
    await loginPage.fillPassword(password);
    await loginPage.clickLogin();

    await expect(page).toHaveURL('/inventory.html');
    await expect(page.getByTestId('title')).toHaveText('Products');
});

test('Login with incorrect credentials', async ({ page, loginPage }) => {
    await loginPage.fillUsername('no_user');
    await loginPage.fillPassword('random_password');
    await loginPage.clickLogin();

    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

test('Login without filling the username field', async ({ page, loginPage }) => {
    await loginPage.fillPassword(password);
    await loginPage.clickLogin();

    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
});

test('Login without filling the password field', async ({ page, loginPage }) => {
    await loginPage.fillUsername(username);
    await loginPage.clickLogin();

    await expect(page.getByText('Epic sadface: Password is required')).toBeVisible();
});

test('Accessing the inventory page without logging in', async ({ page, inventoryPage }) => {
    await inventoryPage.navigateTo();

    await expect(page).toHaveURL('/');
    await expect(page.getByText("Epic sadface: You can only access '/inventory.html' when you are logged in.")).toBeVisible();
});
