import { type Locator, type Page } from '@playwright/test';

interface LoginCredentials {
    username?: string;
    password?: string;
}

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

    async loginUser(credentials: LoginCredentials = {}) {
        if (credentials.username) {
            await this.usernameField.fill(credentials.username);
        }

        if (credentials.password) {
            await this.passwordField.fill(credentials.password);
        }

        await this.loginButton.click();
    }
}
