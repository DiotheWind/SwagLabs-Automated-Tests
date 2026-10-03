import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;
    private readonly usernameField: Locator;
    private readonly passwordField: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.getByPlaceholder('Username');
        this.passwordField = page.getByPlaceholder('Password');
        this.loginButton = page.getByTestId('login-button');
    }

    async navigateTo() {
        await this.page.goto('/');
    }

    async fillUsername(username: string) {
        await this.usernameField.fill(username);
    }

    async fillPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }
}
