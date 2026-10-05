import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { ItemDetail } from '../pages/itemDetail.page';

type Fixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    itemDetail: ItemDetail;
    cartPage: CartPage;
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
});

export { expect };
