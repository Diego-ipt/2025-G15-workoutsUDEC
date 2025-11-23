import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AdminPage extends BasePage {
    readonly userManagementTab: Locator;
    readonly addUserButton: Locator;
    readonly userTableRows: Locator;

    // Modal Locators
    readonly modalUsernameInput: Locator;
    readonly modalEmailInput: Locator;
    readonly modalFullNameInput: Locator;
    readonly modalPasswordInput: Locator;
    readonly modalIsActiveCheckbox: Locator;
    readonly modalIsAdminCheckbox: Locator;
    readonly modalSaveButton: Locator;
    readonly modalCancelButton: Locator;

    constructor(page: Page) {
        super(page);
        this.userManagementTab = page.locator('button:has-text("User Management")');
        this.addUserButton = page.locator('button:has-text("Add User")');
        this.userTableRows = page.locator('table tbody tr');

        // Modal
        this.modalUsernameInput = page.locator('input[name="username"]');
        this.modalEmailInput = page.locator('input[name="email"]');
        this.modalFullNameInput = page.locator('input[name="full_name"]');
        this.modalPasswordInput = page.locator('input[name="password"]');
        this.modalIsActiveCheckbox = page.locator('input[name="is_active"]');
        this.modalIsAdminCheckbox = page.locator('input[name="is_admin"]');
        this.modalSaveButton = page.locator('button:has-text("Save")');
        this.modalCancelButton = page.locator('button:has-text("Cancel")');
    }

    async navigateToUserManagement() {
        await this.navigate('/admin');
        // Ensure we are on the user tab
        await this.userManagementTab.click();
    }

    async createUser(user: { username: string; email: string; fullName: string; password?: string; isAdmin?: boolean }) {
        await this.addUserButton.click();
        await this.modalUsernameInput.fill(user.username);
        await this.modalEmailInput.fill(user.email);
        await this.modalFullNameInput.fill(user.fullName);
        if (user.password) {
            await this.modalPasswordInput.fill(user.password);
        }

        if (user.isAdmin) {
            // Check if not already checked
            if (!(await this.modalIsAdminCheckbox.isChecked())) {
                await this.modalIsAdminCheckbox.check();
            }
        } else {
            if (await this.modalIsAdminCheckbox.isChecked()) {
                await this.modalIsAdminCheckbox.uncheck();
            }
        }

        await this.modalSaveButton.click();
        // Wait for modal to close
        await expect(this.modalSaveButton).not.toBeVisible();
    }

    async editUser(username: string, newData: { fullName?: string }) {
        const row = this.userTableRows.filter({ hasText: username });
        await row.locator('button:has-text("Edit")').click();

        if (newData.fullName) {
            await this.modalFullNameInput.fill(newData.fullName);
        }

        await this.modalSaveButton.click();
        await expect(this.modalSaveButton).not.toBeVisible();
    }

    async deleteUser(username: string) {
        const row = this.userTableRows.filter({ hasText: username });
        await row.locator('button:has-text("Delete")').click();
        // Confirm delete (based on UserTable.tsx logic, it shows a Confirm button)
        await row.locator('button:has-text("Confirm")').click();
    }

    async verifyUserExists(username: string) {
        await expect(this.userTableRows.filter({ hasText: username })).toBeVisible();
    }

    async verifyUserDoesNotExist(username: string) {
        await expect(this.userTableRows.filter({ hasText: username })).not.toBeVisible();
    }
}
