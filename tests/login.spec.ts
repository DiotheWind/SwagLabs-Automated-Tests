import { test, expect } from '../fixtures/test';

const username = process.env.STANDARD_USERNAME;
const password = process.env.PASSWORD;

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateTo();
    await expect(loginPage.loginButton).toBeVisible();
});

test('Login with correct credentials', async ({ loginPage, inventoryPage }) => {
    await loginPage.loginUser({ username: username, password: password });
    await expect(inventoryPage.productSortDropdown).toBeVisible();
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

test('Accessing the inventory page without logging in', async ({ loginPage, inventoryPage }) => {
    await inventoryPage.navigateTo();

    await expect(loginPage.loginButton).toBeVisible();
    expect(await loginPage.getErrorMessage()).toBe("Epic sadface: You can only access '/inventory.html' when you are logged in.");
});
