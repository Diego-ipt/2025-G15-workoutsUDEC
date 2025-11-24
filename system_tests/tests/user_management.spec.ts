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
        await adminPage.verifyUserHasText(userToEdit.username, newName);
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

    test('should filter users by search term', async ({ page }) => {
        const timestamp = Date.now();
        const uniqueUser = {
            username: `search_test_${timestamp}`,
            email: `search_${timestamp}@example.com`,
            fullName: 'Search Target',
            password: 'password123'
        };
        await adminPage.createUser(uniqueUser);

        await adminPage.filterUsers({ search: uniqueUser.username });
        await adminPage.verifyUserExists(uniqueUser.username);

        // Verify other users are hidden (optional, depends on data)
        // await expect(adminPage.userTableRows).toHaveCount(1); 

        await adminPage.clearFilters();
    });

    test('should filter users by role', async ({ page }) => {
        // Filter by Admin
        await adminPage.filterUsers({ role: 'admin' });
        // Verify at least one admin exists (the current logged in user)
        await expect(adminPage.userTableRows.first()).toContainText('Admin');

        await adminPage.clearFilters();
    });

    test('should filter users by status', async ({ page }) => {
        // Create an inactive user
        const timestamp = Date.now();
        const inactiveUser = {
            username: `inactive_${timestamp}`,
            email: `inactive_${timestamp}@example.com`,
            fullName: 'Inactive User',
            password: 'password123',
            isAdmin: false,
            isActive: false
        };

        await adminPage.createUser(inactiveUser);

        // Filter by Inactive
        await adminPage.filterUsers({ status: 'inactive' });
        await adminPage.verifyUserExists(inactiveUser.username);

        // Verify active users are not shown (optional, but good for verification)
        // Since we just created an inactive user, checking if it's there is good.
        // We could also check that an active user is NOT there.

        await adminPage.clearFilters();
    });
});
