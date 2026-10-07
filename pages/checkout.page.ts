import { type Locator, type Page } from '@playwright/test';

interface informationDetails {
    firstName?: string;
    lastName?: string;
    zipCode?: string;
}

export class CheckoutPage {
    readonly page: Page;
    // step one checkpoint page
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly zipCodeField: Locator;
    readonly errorMessage: Locator;
    readonly continueButton: Locator;
    // step two checkpoint page
    readonly checkoutItems: Locator;
    readonly finishButton: Locator;
    // checkout complete page
    readonly checkoutCompleteText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameField = page.getByTestId('firstName');
        this.lastNameField = page.getByTestId('lastName');
        this.zipCodeField = page.getByTestId('postalCode');
        this.errorMessage = page.getByTestId('error');
        this.continueButton = page.getByTestId('continue');
        this.checkoutItems = page.getByTestId('inventory-item-name');
        this.finishButton = page.getByTestId('finish');
        this.checkoutCompleteText = page.getByTestId('complete-header');
    }

    async fillInformationandContinue(details: informationDetails = {}) {
        if (details.firstName) {
            await this.firstNameField.fill(details.firstName);
        }

        if (details.lastName) {
            await this.lastNameField.fill(details.lastName);
        }

        if (details.zipCode) {
            await this.zipCodeField.fill(details.zipCode);
        }

        await this.continueButton.click();
    }

    async getErrorMessage(): Promise<string> {
        return await this.errorMessage.innerText();
    }

    async getItemsinCheckout(): Promise<string[]> {
        const items = await this.checkoutItems.allInnerTexts();
        return items;
    }

    async finishCheckout() {
        await this.finishButton.click();
    }
}
