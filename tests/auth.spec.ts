import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test('Login with correct credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const username = process.env.STANDARD_USERNAME;
    const password = process.env.PASSWORD;

    await test.step('1. Navigate to https://www.saucedemo.com/', async () => {
        await loginPage.navigateTo();
    });

    await test.step('2. Enter correct username and password', async () => {
        await loginPage.fillUsername(username);
        await loginPage.fillPassword(password);
    });


    await test.step('3. Click the login button', async () => {
        await loginPage.clickLogin();
    });

    await test.step('4. The user should be redirected to the inventory page', async () => {
        await expect(page).toHaveURL('/inventory.html');
        await expect(page.getByTestId('title')).toHaveText('Products');
    });
});

test('Login with incorrect credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('1. Navigate to https://www.saucedemo.com/', async () => {
        await loginPage.navigateTo();
    });

    await test.step('2. Enter invalid username and password credentials', async () => {
        await loginPage.fillUsername('no_user');
        await loginPage.fillPassword('random_password');
    });

    await test.step('3. Click the login button', async () => {
        await loginPage.clickLogin();
    });

    await test.step('4. An error message should appear stating no users were matched', async () => {
        await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
    });
});

test('Login without filling the username field', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const password = process.env.PASSWORD;

    await test.step('1. Navigate to https://www.saucedemo.com/', async () => {
        await loginPage.navigateTo();
    });

    await test.step('2. Enter password while leaving the username field blank', async () => {
        await loginPage.fillPassword(password);
    });

    await test.step('3. Click the login button', async () => {
        await loginPage.clickLogin();
    });

    await test.step('4. An error message should appear stating that username is required', async () => {
        await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
    });
});

test('Login without filling the password field', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const username = process.env.STANDARD_USERNAME;

    await test.step('1. Navigate to https://www.saucedemo.com/', async () => {
        await loginPage.navigateTo();
    });

    await test.step('2. Enter username while leaving the password field blank', async () => {
        await loginPage.fillUsername(username);
    });

    await test.step('3. Click the login button', async () => {
        await loginPage.clickLogin();
    });

    await test.step('4. An error message should appear stating that password is required', async () => {
        await expect(page.getByText('Epic sadface: Password is required')).toBeVisible();
    });
});

test('Accessing the inventory page without logging in', async ({ page }) => {
    await test.step('1. Navigate to https://www.saucedemo.com/inventory.html without logging in', async () => {
        await page.goto('/inventory.html');
    })

    await test.step('2. The user should be redirected back to the login page', async () => {
        await expect(page).toHaveURL('/');
    });

    await test.step('3. An error message should appear stating that accessing the inventory page requires a logged in user', async () => {
        await expect(page.getByText("Epic sadface: You can only access '/inventory.html' when you are logged in.")).toBeVisible();
    });
});
