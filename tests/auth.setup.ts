import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('Authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateTo();
    await loginPage.fillUsername(process.env.STANDARD_USERNAME);
    await loginPage.fillPassword(process.env.PASSWORD);
    await loginPage.clickLogin();

    await page.waitForURL('/inventory.html');

    await page.context().storageState({ path: authFile });
});
