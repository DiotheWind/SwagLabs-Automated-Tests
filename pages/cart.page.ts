import { type Locator, type Page } from '@playwright/test';

export class CartPage {
    private readonly page: Page;
    private readonly cartItemNames: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItemNames = page.getByTestId('inventory-item-name');
    }

    async navigateTo() {
        await this.page.goto('/cart.html');
    }

    async getNumberofItemsinCart(): Promise<number> {
        const length = await this.cartItemNames.count();
        return length;
    }

    async getItemNamesinCart(): Promise<string[]> {
        const names = await this.cartItemNames.allInnerTexts();
        return names;
    }

    async removeItemFromCart(name: string) {
        const itemID = name.trim().toLowerCase().replace(/\s+/g, '-');
        await this.page.getByTestId(`remove-${itemID}`).click();
    }
}
