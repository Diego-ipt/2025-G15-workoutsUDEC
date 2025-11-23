import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AdminPage } from '../pages/AdminPage';

test.describe('User Management System Tests', () => {
    let loginPage: LoginPage;
    let adminPage: AdminPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        adminPage = new AdminPage(page);

        // Login before each test
        await loginPage.login();
        // Verify we are redirected to dashboard or home, then navigate to admin
        // Assuming login redirects to home, we then go to admin
        await adminPage.navigateToUserManagement();
    });

    test('should display user management table', async ({ page }) => {
        await expect(adminPage.userTableRows.first()).toBeVisible();
    });

    test('should create a new user', async ({ page }) => {
        const timestamp = Date.now();
        const newUser = {
            username: `testuser_${timestamp}`,
            email: `testuser_${timestamp}@example.com`,
            fullName: 'Test User',
            password: 'password123',
            isAdmin: false
        };

        await adminPage.createUser(newUser);
        await adminPage.verifyUserExists(newUser.username);
    });

    test('should edit an existing user', async ({ page }) => {
        // Create a user first to edit
        const timestamp = Date.now();
        const userToEdit = {
            username: `edituser_${timestamp}`,
            email: `edituser_${timestamp}@example.com`,
            fullName: 'Original Name',
            password: 'password123'
        };
        await adminPage.createUser(userToEdit);

        // Edit the user
        const newName = 'Updated Name';
        await adminPage.editUser(userToEdit.username, { fullName: newName });

        // Verify change (this might need a reload or check the table cell text)
        // Assuming the table updates automatically
        await expect(page.locator(`tr:has-text("${userToEdit.username}")`)).toContainText(newName);
    });

    test('should delete a user', async ({ page }) => {
        // Create a user to delete
        const timestamp = Date.now();
        const userToDelete = {
            username: `deleteuser_${timestamp}`,
            email: `deleteuser_${timestamp}@example.com`,
            fullName: 'Delete Me',
            password: 'password123'
        };
        await adminPage.createUser(userToDelete);
        await adminPage.verifyUserExists(userToDelete.username);

        // Delete the user
        await adminPage.deleteUser(userToDelete.username);
        await adminPage.verifyUserDoesNotExist(userToDelete.username);
    });
});
