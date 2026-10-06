import { test, expect } from '../fixtures/test';
import { faker } from '@faker-js/faker/locale/en';

const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Test.allTheThings() T-Shirt (Red)', 'Sauce Labs Fleece Jacket'];

test.beforeEach(async ({ page, inventoryPage }) => {
    await inventoryPage.navigateTo();
    await expect(page).toHaveURL('/inventory.html');

    for (const product of products) {
        await inventoryPage.addItemToCart(product);
    }

    await inventoryPage.clickCartLink();
    await expect(page).toHaveURL('/cart.html');
});

test('Checkout items', async ({ page, cartPage, checkoutPage }) => {
    const randomFirstName = faker.person.firstName();
    const randomLastName = faker.person.lastName();
    const randomZipCode = faker.location.zipCode();

    await cartPage.checkoutItems();

    await expect(page).toHaveURL('/checkout-step-one.html');

    await checkoutPage.fillInformationandContinue({
        firstName: randomFirstName,
        lastName: randomLastName,
        zipCode: randomZipCode
    });

    await expect(page).toHaveURL('/checkout-step-two.html');

    await checkoutPage.finishCheckout();

    await expect(page).toHaveURL('/checkout-complete.html');
    await expect(page.getByTestId('complete-header')).toBeVisible();
});
