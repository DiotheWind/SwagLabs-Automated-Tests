import { type Locator, type Page } from '@playwright/test';

export class InventoryPage {
    private readonly page: Page;
    private readonly productSortDropdown: Locator;
    private readonly openMenuButton: Locator;
    private readonly closeMenuButton: Locator;
    private readonly cartLink: Locator;
    private readonly logoutLink: Locator;
    private readonly aboutLink: Locator;
    private readonly resetAppStateLink: Locator;
    private readonly inventoryItemNames: Locator;
    private readonly inventoryPrices: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productSortDropdown = page.getByTestId('product-sort-container');
        this.openMenuButton = page.getByRole('button', { name: 'Open Menu' });
        this.closeMenuButton = page.getByRole('button', { name: 'Close Menu' });
        this.cartLink = page.getByTestId('shopping-cart-link');
        this.logoutLink = page.getByTestId('logout-sidebar-link');
        this.aboutLink = page.getByTestId('about-sidebar-link');
        this.resetAppStateLink = page.getByTestId('reset-sidebar-link');
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
        const targetItem = this.inventoryItemNames.filter({ hasText: name });
        await targetItem.click();
    }

    async addItemToCart(name: string) {
        const itemID = name.trim().toLowerCase().replace(/\s+/g, '-');
        await this.page.getByTestId(`add-to-cart-${itemID}`).click();
    }

    async clickCartLink() {
        await this.cartLink.click();
    }

    async openSidebarMenu() {
        await this.openMenuButton.click();
    }

    async closeSidebarMenu() {
        await this.closeMenuButton.click();
    }

    async navigateToAboutPage() {
        await this.openSidebarMenu();
        await this.aboutLink.click();
    }

    async logoutUser() {
        await this.openSidebarMenu();
        await this.logoutLink.click();
    }

    async resetAppState() {
        await this.openSidebarMenu();
        await this.resetAppStateLink.click();
    }
}
