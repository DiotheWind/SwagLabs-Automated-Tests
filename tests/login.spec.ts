import { test, expect } from '../fixtures/test';

const username = process.env.STANDARD_USERNAME;
const password = process.env.PASSWORD;

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page, loginPage }) => {
    await loginPage.navigateTo();
    await expect(page).toHaveURL('/');
});

test('Login with correct credentials', async ({ page, loginPage }) => {
    await loginPage.loginUser({ username: username, password: password });

    await expect(page).toHaveURL('/inventory.html');
    await expect(page.getByTestId('title')).toHaveText('Products');
});

test('Login with incorrect credentials', async ({ loginPage }) => {
    await loginPage.loginUser({ username: 'no_user', password: 'random_password' });

    expect(await loginPage.getErrorMessage()).toBe('Epic sadface: Username and password do not match any user in this service');
});

test('Login without filling the username field', async ({ loginPage }) => {
    await loginPage.loginUser({ password: password });

    expect(await loginPage.getErrorMessage()).toBe('Epic sadface: Username is required');
});

test('Login without filling the password field', async ({ loginPage }) => {
    await loginPage.loginUser({ username: username });

    expect(await loginPage.getErrorMessage()).toBe('Epic sadface: Password is required');
});

test('Accessing the inventory page without logging in', async ({ page, loginPage, inventoryPage }) => {
    await inventoryPage.navigateTo();

    await expect(page).toHaveURL('/');
    expect(await loginPage.getErrorMessage()).toBe("Epic sadface: You can only access '/inventory.html' when you are logged in.");
});
