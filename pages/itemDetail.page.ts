import { type Locator, type Page } from '@playwright/test';

export class ItemDetail {
    readonly page: Page;
    readonly backToProductsLink: Locator;
    readonly itemName: Locator;
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.backToProductsLink = page.getByTestId('back-to-products');
        this.itemName = page.getByTestId('inventory-item-name');
        this.addToCartButton = page.getByTestId('add-to-cart');
    }

    async getItemName(): Promise<string> {
        return await this.itemName.innerText();
    }

    async addToCart() {
        await this.addToCartButton.click();
    }

    async clickBacktoProducts() {
        await this.backToProductsLink.click();
    }
}
