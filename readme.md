# Swag Labs Test Automation

This project contains Playwright-based automated end-to-end tests for [Swag Labs](https://www.saucedemo.com/), a demo e-commerce website designed for practicing test automation. It follows the Page Object Model (POM) pattern, where test scripts focus on assertions while page classes handle element locators and user interactions.

## Test Coverage

The project covers the following scenarios:

1. **Login**:
    - User can log in with valid credentials.
    - User cannot log in with an incorrect username or password.
    - User cannot log in when either the username or password is missing.
    - User is redirected to the login page when attempting to access the inventory page without logging in.
2. **Inventory**:
    - User can sort inventory by price from lowest to highest and vice versa, as well as by name in alphabetical order and reverse order.
    - User can navigate to the details page of a specific item.
    - User can open the About page from the sidebar menu.
    - User can log out from the sidebar menu.
3. **Cart**:
    - User can add items to the cart from the inventory page.
    - User can add an item to the cart from its details page.
    - User can remove an item from the cart.
    - The cart is reset after the user resets the app state.
4. **Checkout**:
    - User can complete checkout for selected items.
    - User cannot complete checkout if any required field in the user information form is empty.

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DiotheWind/SwagLabs-Automated-Tests.git
   cd SwagLabs-Automated-Tests
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```
4. Create a `.env` file in the project root and add the test credentials:
   ```env
   STANDARD_USERNAME='standard_user'
   PASSWORD='secret_sauce'
   ```

### Running Tests

Run the full suite:
```bash
npm run test
```

Run tests in UI mode:
```bash
npm run test:ui
```

Open the HTML report after a test run:
```bash
npm run report
```
