import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AdminPage } from '../pages/AdminPage';


test.describe('Authentication Tests', () => {

    // -----------------------------
    //        LOGIN VALIDATION
    // -----------------------------

    test('should show error for wrong password', async ({ page }) => {
        const login = new LoginPage(page);

        await login.navigate('/login');
        await login.usernameInput.fill('admin@example.com');
        await login.passwordInput.fill('wrongpassword');
        await login.submitButton.click();

        const error = page.locator('text=Incorrect email or password');
        await expect(error).toBeVisible();

        await expect(page).toHaveURL(/login/);
    });

    test('should show error for non-existing user', async ({ page }) => {
        const login = new LoginPage(page);

        await login.navigate('/login');
        await login.usernameInput.fill('noexist@example.com');
        await login.passwordInput.fill('whatever123');
        await login.submitButton.click();

        const error = page.locator('text=Incorrect email or password');
        await expect(error).toBeVisible();

        await expect(page).toHaveURL(/login/);
    });

    test('should validate required fields', async ({ page }) => {
        const login = new LoginPage(page);

        await login.navigate('/login');

        // Submit sin llenar campos
        await login.submitButton.click();

        // Dependiendo de tus mensajes reales de error
        await expect(page.locator('text=Email')).toBeVisible();
        await expect(page.locator('text=Password')).toBeVisible();

        await expect(page).toHaveURL(/login/);
    });


    // -----------------------------
    //        NON-ADMIN ACCESS
    // -----------------------------

    test('non-admin user must NOT access /admin and should be redirected', async ({ page }) => {
        const login = new LoginPage(page);

        await login.login('user@example.com', 'user123');

        await page.goto('/admin');

        // Debe impedir acceso
        await expect(page).not.toHaveURL('**/admin');
        await expect(page).toHaveURL(/dashboard|forbidden|unauthorized/);
    });

    test('non-admin user must NOT see Add User button', async ({ page }) => {
        const login = new LoginPage(page);
        const adminPage = new AdminPage(page);

        await login.login('user@example.com', 'user123');
        await adminPage.navigate('/admin');

        await expect(adminPage.addUserButton).not.toBeVisible();
    });

    test('non-admin user must NOT see Edit/Delete buttons', async ({ page }) => {
        const login = new LoginPage(page);
        const adminPage = new AdminPage(page);

        await login.login('user@example.com', 'user123');
        await adminPage.navigate('/admin');

        const editButtons = page.locator('button:has-text("Edit")');
        const deleteButtons = page.locator('button:has-text("Delete")');

        await expect(editButtons).toHaveCount(0);
        await expect(deleteButtons).toHaveCount(0);
    });

});
