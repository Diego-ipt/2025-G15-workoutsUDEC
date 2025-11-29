import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {

    readonly fullNameInput: Locator;
    readonly usernameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;

    readonly submitButton: Locator;

    readonly loginLink: Locator;


    constructor(page: Page) {
        super(page);

        // Inputs
        this.fullNameInput = page.locator('#full_name');
        this.usernameInput = page.locator('#username');
        this.emailInput = page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.confirmPasswordInput = page.locator('#confirmPassword');

        // Buttons
        this.submitButton = page.getByRole('button', { name: 'Create account' });

        // Navigation
        this.loginLink = page.getByRole('link', { name: 'sign in to your existing account' });

    }


    // === NAVIGATION ===

    async navigateToRegister() {
        await this.navigate('/register');
        await this.waitForUrl('/register');
    }

    async goToLogin() {
        await this.loginLink.click();
        await this.waitForUrl('/login');

    }


    // === FORM ACTIONS ===

    async fillFullName(name: string) {
        await this.fullNameInput.fill(name);
    }

    async fillUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async fillPassword(pass: string) {
        await this.passwordInput.fill(pass);
    }

    async fillConfirmPassword(pass: string) {
        await this.confirmPasswordInput.fill(pass);
    }

    async register(fullName: string, username: string, email: string, pass: string, confirm: string) {
        await this.fillFullName(fullName);
        await this.fillUsername(username);
        await this.fillEmail(email);
        await this.fillPassword(pass);
        await this.fillConfirmPassword(confirm);
    }

    async submit() {
        await this.submitButton.click();
    }

    async expectError(message?: string) {
        const alert = this.page.locator('div.bg-red-50');

        await expect(alert).toBeVisible({ timeout: 8000 });

        if (message) {
            await expect(alert).toContainText(message);
        }
    }


    async expectSuccess(message?: string) {
        const alert = this.page.locator('div.bg-green-50');

        await expect(alert).toBeVisible({ timeout: 8000 });

        if (message) {
            await expect(alert).toContainText(message);
        }
    }
    

}
