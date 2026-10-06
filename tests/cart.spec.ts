import { test, expect } from '../fixtures/test';
import { TARGET_ITEMS as items } from '../data/testData';

test.beforeEach(async ({ page, inventoryPage }) => {
    await inventoryPage.navigateTo();
    await expect(page).toHaveURL('/inventory.html');
});

test('Add items to cart from inventory page', async ({ page, inventoryPage, cartPage }) => {
    for (const item of items) {
        await inventoryPage.addItemToCart(item);
    }

    await inventoryPage.clickCartLink();
    await expect(page).toHaveURL('/cart.html');

    const cartLength = await cartPage.getNumberofItemsinCart();
    const itemNames = await cartPage.getItemNamesinCart();

    expect(cartLength).toBe(items.length);
    expect(itemNames).toEqual(items);
});

test('Add item to cart from its detail page', async ({ page, inventoryPage, itemDetail, cartPage }) => {
    for (const item of items) {
        await inventoryPage.navigateToItemDetail(item);
        await expect(page).toHaveURL(/\/inventory-item\.html\?id=\d+$/);
        await itemDetail.addToCart();
        await itemDetail.clickBacktoProducts();
    }

    await inventoryPage.clickCartLink();
    await expect(page).toHaveURL('/cart.html');

    const cartLength = await cartPage.getNumberofItemsinCart();
    const itemNames = await cartPage.getItemNamesinCart();

    expect(cartLength).toBe(items.length);
    expect(itemNames).toEqual(items);
});

test('Remove items from cart', async ({ page, inventoryPage, cartPage }) => {
    for (const item of items) {
        await inventoryPage.addItemToCart(item);
    }

    await cartPage.navigateTo();
    await expect(page).toHaveURL('/cart.html');

    for (const item of items) {
        await cartPage.removeItemFromCart(item);
    }

    const cartLength = await cartPage.getNumberofItemsinCart();
    expect(cartLength).toBe(0);
});

test('Reset app state', async ({ page, inventoryPage, cartPage }) => {
    for (const item of items) {
        await inventoryPage.addItemToCart(item);
    }

    await inventoryPage.resetAppState();
    await inventoryPage.closeSidebarMenu();
    await inventoryPage.clickCartLink();

    await expect(page).toHaveURL('/cart.html');

    const cartLength = await cartPage.getNumberofItemsinCart();
    expect(cartLength).toBe(0);
});
