import { test, expect } from '../fixtures/test';
import { faker } from '@faker-js/faker/locale/en';
import { TARGET_ITEMS as items } from '../data/testData';

let randomFirstName: string;
let randomLastName: string;
let randomZipCode: string;

test.beforeEach(async ({ inventoryPage, cartPage, checkoutPage }) => {
    randomFirstName = faker.person.firstName();
    randomLastName = faker.person.lastName();
    randomZipCode = faker.location.zipCode();

    await inventoryPage.navigateTo();
    await expect(inventoryPage.productSortDropdown).toBeVisible();

    for (const item of items) {
        await inventoryPage.addItemToCart(item);
    }

    await inventoryPage.clickCartLink();
    await expect(cartPage.checkoutButton).toBeVisible();

    await cartPage.checkoutItems();
    await expect(checkoutPage.continueButton).toBeVisible();
});

test('Checkout items', async ({ checkoutPage }) => {
    await checkoutPage.fillInformationandContinue({
        firstName: randomFirstName,
        lastName: randomLastName,
        zipCode: randomZipCode
    });

    await expect(checkoutPage.finishButton).toBeVisible();
    expect(await checkoutPage.getItemsinCheckout()).toEqual(items);

    await checkoutPage.finishCheckout();

    await expect(checkoutPage.checkoutCompleteText).toBeVisible();
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
