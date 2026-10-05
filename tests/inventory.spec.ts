import { test, expect } from '../fixtures/test';

test.beforeEach(async ({ page, inventoryPage }) => {
    inventoryPage.navigateTo();
    await expect(page).toHaveURL('/inventory.html');
});

test('Sort inventory in alphabetical order', async ({ inventoryPage }) => {
    await inventoryPage.sortInventory('az');

    const actualInventoryNames = await inventoryPage.getInventoryNames();
    const expectedSortedInventoryNames = [...actualInventoryNames].sort((a, b) => a.localeCompare(b));

    expect(actualInventoryNames).toEqual(expectedSortedInventoryNames);
});

test('Sort inventory in reverse alphabetical order', async ({ inventoryPage }) => {
    await inventoryPage.sortInventory('za');

    const actualInventoryNames = await inventoryPage.getInventoryNames();
    const expectedSortedInventoryNames = [...actualInventoryNames].sort((a, b) => b.localeCompare(a));

    expect(actualInventoryNames).toEqual(expectedSortedInventoryNames);
});

test('Sort inventory from lowest to highest price', async ({ inventoryPage }) => {
    await inventoryPage.sortInventory('lohi');

    const actualInventoryPrices = await inventoryPage.getInventoryPrices();
    const expectedSortedInventoryPrices = [...actualInventoryPrices].sort((a, b) => a - b);

    expect(actualInventoryPrices).toEqual(expectedSortedInventoryPrices);
});

test('Sort inventory from highest to lowest price', async ({ inventoryPage }) => {
    await inventoryPage.sortInventory('hilo');

    const actualInventoryPrices = await inventoryPage.getInventoryPrices();
    const expectedSortedInventoryPrices = [...actualInventoryPrices].sort((a, b) => b - a);

    expect(actualInventoryPrices).toEqual(expectedSortedInventoryPrices);
});

test('Navigate to item detail page', async ({ page, inventoryPage, itemDetail }) => {
    const itemName = 'Sauce Labs Backpack';

    await inventoryPage.navigateToItemDetail(itemName);
    await expect(page).toHaveURL(/\/inventory-item\.html\?id=\d+$/);
    expect(await itemDetail.getItemName()).toEqual(itemName);
});

test('Navigate to about page', async ({ page, inventoryPage }) => {
    await inventoryPage.navigateToAboutPage();

    await expect(page).toHaveURL('https://saucelabs.com/');
    await expect(page.getByRole('heading', { level: 1, name: "Verify AI-generated code at the pace it's written." })).toBeVisible();
});

test('Logout user', async ({ page, inventoryPage }) => {
    await inventoryPage.logoutUser();

    await expect(page).toHaveURL('/');
    await expect(page.getByTestId('username')).toBeVisible();
});
