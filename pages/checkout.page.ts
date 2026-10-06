import { type Locator, type Page } from '@playwright/test';

interface informationDetails {
    firstName?: string;
    lastName?: string;
    zipCode?: string;
}

export class CheckoutPage {
    private readonly page: Page;
    // step one checkpoint page
    private readonly firstNameField: Locator;
    private readonly lastNameField: Locator;
    private readonly zipCodeField: Locator;
    private readonly errorMessage: Locator;
    private readonly continueButton: Locator;
    // step two checkpoint page
    private readonly finishButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameField = page.getByTestId('firstName');
        this.lastNameField = page.getByTestId('lastName');
        this.zipCodeField = page.getByTestId('postalCode');
        this.errorMessage = page.getByTestId('error');
        this.continueButton = page.getByTestId('continue');
        this.finishButton = page.getByTestId('finish');
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

    async finishCheckout() {
        await this.finishButton.click();
    }
}
