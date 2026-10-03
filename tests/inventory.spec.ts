import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { LoginPage } from '../pages/login.page';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateTo();
    await loginPage.fillUsername(process.env.STANDARD_USERNAME);
    await loginPage.fillPassword(process.env.PASSWORD);
    await loginPage.clickLogin();

    await expect(page).toHaveURL('/inventory.html')
});

test('Sort inventory in alphabetical order', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortInventory('az');

    const actualInventoryNames = await inventoryPage.getInventoryNames();
    const expectedSortedInventoryNames = [...actualInventoryNames].sort((a, b) => a.localeCompare(b));

    expect(actualInventoryNames).toEqual(expectedSortedInventoryNames);
});

test('Sort inventory in reverse alphabetical order', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortInventory('za');

    const actualInventoryNames = await inventoryPage.getInventoryNames();
    const expectedSortedInventoryNames = [...actualInventoryNames].sort((a, b) => b.localeCompare(a));

    expect(actualInventoryNames).toEqual(expectedSortedInventoryNames);
});

test('Sort inventory from lowest to highest price', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortInventory('lohi');

    const actualInventoryPrices = await inventoryPage.getInventoryPrices();
    const expectedSortedInventoryPrices = [...actualInventoryPrices].sort((a, b) => a - b);

    expect(actualInventoryPrices).toEqual(expectedSortedInventoryPrices);
});

test('Sort inventory from highest to lowest price', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortInventory('hilo');

    const actualInventoryPrices = await inventoryPage.getInventoryPrices();
    const expectedSortedInventoryPrices = [...actualInventoryPrices].sort((a, b) => b - a);

    expect(actualInventoryPrices).toEqual(expectedSortedInventoryPrices);
});

test('Navigate to item detail page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const itemName = 'Sauce Labs Backpack';

    await inventoryPage.navigateToItemDetail(itemName);
    await expect(page.getByTestId('inventory-item-name')).toHaveText(itemName);
});

test('Navigate to about page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.clickAboutLink();

    await expect(page).toHaveURL('https://saucelabs.com/');
    await expect(page.getByRole('heading', { level: 1, name: "Verify AI-generated code at the pace it's written." })).toBeVisible();
});

test('Logout user', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.logoutUser();

    await expect(page).toHaveURL('/');
    await expect(page.getByTestId('username')).toBeVisible();
});
