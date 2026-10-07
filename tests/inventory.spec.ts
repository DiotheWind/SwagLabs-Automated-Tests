import { test, expect } from '../fixtures/test';

test.beforeEach(async ({ page, inventoryPage }) => {
    await inventoryPage.navigateTo();

    await expect(inventoryPage.productSortDropdown).toBeVisible();
    await expect(inventoryPage.openMenuButton).toBeVisible();
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

test('Navigate to item detail page', async ({ inventoryPage, itemDetail }) => {
    const itemName = 'Sauce Labs Backpack';

    await inventoryPage.navigateToItemDetail(itemName);

    await expect(itemDetail.addToCartButton).toBeVisible();
    expect(await itemDetail.getItemName()).toEqual(itemName);
});

test('Navigate to about page', async ({ page, inventoryPage }) => {
    await inventoryPage.navigateToAboutPage();
    await expect(page).toHaveURL('https://saucelabs.com/');
});

test('Logout user', async ({ inventoryPage, loginPage }) => {
    await inventoryPage.logoutUser();
    await expect(loginPage.loginButton).toBeVisible();
});
