import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { ItemDetail } from '../pages/itemDetail.page';
import { CheckoutPage } from '../pages/checkout.page';

type Fixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    itemDetail: ItemDetail;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
};

export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },
    itemDetail: async ({ page }, use) => {
        await use(new ItemDetail(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
});

export { expect };
