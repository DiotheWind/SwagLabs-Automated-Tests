import { type Locator, type Page } from '@playwright/test';

interface LoginCredentials {
    username?: string;
    password?: string;
}

export class LoginPage {
    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.getByPlaceholder('Username');
        this.passwordField = page.getByPlaceholder('Password');
        this.loginButton = page.getByTestId('login-button');
        this.errorMessage = page.getByTestId('error');
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

    async getErrorMessage(): Promise<string> {
        return await this.errorMessage.innerText();
    }
}
