import { test as setup } from '../fixtures/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('Authenticate', async ({ page, loginPage }) => {
    const username = process.env.STANDARD_USERNAME;
    const password = process.env.PASSWORD;

    await loginPage.navigateTo();
    await loginPage.loginUser({ username: username, password: password });

    await page.waitForURL('/inventory.html');
    await page.context().storageState({ path: authFile });
});
