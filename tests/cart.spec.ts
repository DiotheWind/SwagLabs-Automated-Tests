import { test, expect } from '../fixtures/test';
import { TARGET_ITEMS as items } from '../data/testData';

test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.navigateTo();
    await expect(inventoryPage.productSortDropdown).toBeVisible();
});

test('Add items to cart from inventory page', async ({ inventoryPage, cartPage }) => {
    for (const item of items) {
        await inventoryPage.addItemToCart(item);
    }

    await inventoryPage.clickCartLink();
    await expect(cartPage.checkoutButton).toBeVisible();

    const cartLength = await cartPage.getNumberofItemsinCart();
    const itemNames = await cartPage.getItemNamesinCart();

    expect(cartLength).toBe(items.length);
    expect(itemNames).toEqual(items);
});

test('Add item to cart from its detail page', async ({ inventoryPage, itemDetail, cartPage }) => {
    for (const item of items) {
        await inventoryPage.navigateToItemDetail(item);
        await expect(itemDetail.addToCartButton).toBeVisible();
        await itemDetail.addToCart();
        await itemDetail.clickBacktoProducts();
        await expect(inventoryPage.productSortDropdown).toBeVisible();
    }

    await inventoryPage.clickCartLink();
    await expect(cartPage.checkoutButton).toBeVisible();

    const cartLength = await cartPage.getNumberofItemsinCart();
    const itemNames = await cartPage.getItemNamesinCart();

    expect(cartLength).toBe(items.length);
    expect(itemNames).toEqual(items);
});

test('Remove items from cart', async ({ inventoryPage, cartPage }) => {
    for (const item of items) {
        await inventoryPage.addItemToCart(item);
    }

    await cartPage.navigateTo();
    await expect(cartPage.checkoutButton).toBeVisible();

    for (const item of items) {
        await cartPage.removeItemFromCart(item);
    }

    const cartLength = await cartPage.getNumberofItemsinCart();
    expect(cartLength).toBe(0);
});

test('Reset app state', async ({ inventoryPage, cartPage }) => {
    for (const item of items) {
        await inventoryPage.addItemToCart(item);
    }

    await inventoryPage.resetAppState();
    await inventoryPage.closeSidebarMenu();
    await inventoryPage.clickCartLink();

    await expect(cartPage.checkoutButton).toBeVisible();

    const cartLength = await cartPage.getNumberofItemsinCart();
    expect(cartLength).toBe(0);
});
