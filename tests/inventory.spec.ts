import { test, expect } from '../fixtures/test';

test.beforeEach(async ({ page, inventoryPage }) => {
    inventoryPage.navigateTo();
});

test('Sort inventory in alphabetical order', async ({ page, inventoryPage }) => {
    await inventoryPage.sortInventory('az');

    const actualInventoryNames = await inventoryPage.getInventoryNames();
    const expectedSortedInventoryNames = [...actualInventoryNames].sort((a, b) => a.localeCompare(b));

    expect(actualInventoryNames).toEqual(expectedSortedInventoryNames);
});

test('Sort inventory in reverse alphabetical order', async ({ page, inventoryPage }) => {
    await inventoryPage.sortInventory('za');

    const actualInventoryNames = await inventoryPage.getInventoryNames();
    const expectedSortedInventoryNames = [...actualInventoryNames].sort((a, b) => b.localeCompare(a));

    expect(actualInventoryNames).toEqual(expectedSortedInventoryNames);
});

test('Sort inventory from lowest to highest price', async ({ page, inventoryPage }) => {
    await inventoryPage.sortInventory('lohi');

    const actualInventoryPrices = await inventoryPage.getInventoryPrices();
    const expectedSortedInventoryPrices = [...actualInventoryPrices].sort((a, b) => a - b);

    expect(actualInventoryPrices).toEqual(expectedSortedInventoryPrices);
});

test('Sort inventory from highest to lowest price', async ({ page, inventoryPage }) => {
    await inventoryPage.sortInventory('hilo');

    const actualInventoryPrices = await inventoryPage.getInventoryPrices();
    const expectedSortedInventoryPrices = [...actualInventoryPrices].sort((a, b) => b - a);

    expect(actualInventoryPrices).toEqual(expectedSortedInventoryPrices);
});

test('Navigate to item detail page', async ({ page, inventoryPage }) => {
    const itemName = 'Sauce Labs Backpack';

    await inventoryPage.navigateToItemDetail(itemName);
    await expect(page.getByTestId('inventory-item-name')).toHaveText(itemName);
});

test('Navigate to about page', async ({ page, inventoryPage }) => {
    await inventoryPage.clickAboutLink();

    await expect(page).toHaveURL('https://saucelabs.com/');
    await expect(page.getByRole('heading', { level: 1, name: "Verify AI-generated code at the pace it's written." })).toBeVisible();
});

test('Logout user', async ({ page, inventoryPage }) => {
    await inventoryPage.logoutUser();

    await expect(page).toHaveURL('/');
    await expect(page.getByTestId('username')).toBeVisible();
});
