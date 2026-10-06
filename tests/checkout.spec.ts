import { test, expect } from '../fixtures/test';
import { faker } from '@faker-js/faker/locale/en';

const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Test.allTheThings() T-Shirt (Red)', 'Sauce Labs Fleece Jacket'];
let randomFirstName: string;
let randomLastName: string;
let randomZipCode: string;

test.beforeEach(async ({ page, inventoryPage, cartPage }) => {
    randomFirstName = faker.person.firstName();
    randomLastName = faker.person.lastName();
    randomZipCode = faker.location.zipCode();

    await inventoryPage.navigateTo();
    await expect(page).toHaveURL('/inventory.html');

    for (const product of products) {
        await inventoryPage.addItemToCart(product);
    }

    await inventoryPage.clickCartLink();
    await expect(page).toHaveURL('/cart.html');

    await cartPage.checkoutItems();
    await expect(page).toHaveURL('/checkout-step-one.html');
});

test('Checkout items', async ({ page, checkoutPage }) => {
    await checkoutPage.fillInformationandContinue({
        firstName: randomFirstName,
        lastName: randomLastName,
        zipCode: randomZipCode
    });

    await expect(page).toHaveURL('/checkout-step-two.html');
    expect(await checkoutPage.getItemsinCheckout()).toEqual(products);

    await checkoutPage.finishCheckout();

    await expect(page).toHaveURL('/checkout-complete.html');
    await expect(page.getByTestId('complete-header')).toBeVisible();
});

test('Checkout items without filling the first name field', async ({ checkoutPage }) => {
    await checkoutPage.fillInformationandContinue({ lastName: randomLastName, zipCode: randomZipCode });
    expect(await checkoutPage.getErrorMessage()).toBe('Error: First Name is required');
});

test('Checkout items without filling the last name field', async ({ checkoutPage }) => {
    await checkoutPage.fillInformationandContinue({ firstName: randomFirstName, zipCode: randomZipCode });
    expect(await checkoutPage.getErrorMessage()).toBe('Error: Last Name is required');
});

test('Checkout items without filling the zip code field', async ({ checkoutPage }) => {
    await checkoutPage.fillInformationandContinue({ firstName: randomFirstName, lastName: randomLastName });
    expect(await checkoutPage.getErrorMessage()).toBe('Error: Postal Code is required');
});
