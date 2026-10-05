import { test, expect } from '../fixtures/test';

const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Test.allTheThings() T-Shirt (Red)', 'Sauce Labs Fleece Jacket'];

test.beforeEach(async ({ page, inventoryPage }) => {
    await inventoryPage.navigateTo();
    await expect(page).toHaveURL('/inventory.html');
});

test('Add items to cart from inventory page', async ({ page, inventoryPage, cartPage }) => {
    for (const product of products) {
        await inventoryPage.addItemToCart(product);
    }

    await inventoryPage.clickCartLink();
    await expect(page).toHaveURL('/cart.html');

    const cartLength = await cartPage.getNumberofItemsinCart();
    const itemNames = await cartPage.getItemNamesinCart();

    expect(cartLength).toBe(products.length);
    expect(itemNames).toEqual(products);
});

test('Add item to cart from its detail page', async ({ page, inventoryPage, itemDetail, cartPage }) => {
    for (const product of products) {
        await inventoryPage.navigateToItemDetail(product);
        await expect(page).toHaveURL(/\/inventory-item\.html\?id=\d+$/);
        await itemDetail.addToCart();
        await itemDetail.clickBacktoProducts();
    }

    await inventoryPage.clickCartLink();
    await expect(page).toHaveURL('/cart.html');

    const cartLength = await cartPage.getNumberofItemsinCart();
    const itemNames = await cartPage.getItemNamesinCart();

    expect(cartLength).toBe(products.length);
    expect(itemNames).toEqual(products);
});

test('Remove items from cart', async ({ page, inventoryPage, cartPage }) => {
    for (const product of products) {
        await inventoryPage.addItemToCart(product);
    }

    await cartPage.navigateTo();
    await expect(page).toHaveURL('/cart.html');

    for (const product of products) {
        await cartPage.removeItemFromCart(product);
    }

    const cartLength = await cartPage.getNumberofItemsinCart();
    expect(cartLength).toBe(0);
});

test('Reset app state', async ({ page, inventoryPage, cartPage }) => {
    for (const product of products) {
        await inventoryPage.addItemToCart(product);
    }

    await inventoryPage.resetAppState();
    await inventoryPage.closeSidebarMenu();
    await inventoryPage.clickCartLink();

    await expect(page).toHaveURL('/cart.html');

    const cartLength = await cartPage.getNumberofItemsinCart();
    expect(cartLength).toBe(0);
});
