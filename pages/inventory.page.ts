import { type Locator, type Page } from '@playwright/test';

export class InventoryPage {
    private readonly page: Page;
    private readonly productSortDropdown: Locator;
    private readonly menuButton: Locator;
    private readonly logoutLink: Locator;
    private readonly aboutLink: Locator;
    private readonly inventoryItemNames: Locator;
    private readonly inventoryPrices: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productSortDropdown = page.getByTestId('product-sort-container');
        this.menuButton = page.getByRole('button', { name: 'Open Menu' });
        this.logoutLink = page.getByTestId('logout-sidebar-link');
        this.aboutLink = page.getByTestId('about-sidebar-link');
        this.inventoryItemNames = page.getByTestId('inventory-item-name');
        this.inventoryPrices = page.getByTestId('inventory-item-price');
    }

    async navigateTo() {
        await this.page.goto('/inventory.html');
    }

    async sortInventory(value: string) {
        await this.productSortDropdown.selectOption(value);
    }

    async getInventoryNames(): Promise<string[]> {
        const names = await this.inventoryItemNames.allInnerTexts();
        return names;
    }

    async getInventoryPrices(): Promise<number[]> {
        const prices = await this.inventoryPrices.allInnerTexts();
        return prices.map(price => parseFloat(price.replace('$', '')));
    }

    async navigateToItemDetail(name: string) {
        const specificItem = this.inventoryItemNames.filter({ hasText: name });
        await specificItem.click();
    }

    async clickAboutLink() {
        await this.menuButton.click();
        await this.aboutLink.click();
    }

    async logoutUser() {
        await this.menuButton.click();
        await this.logoutLink.click();
    }
}
