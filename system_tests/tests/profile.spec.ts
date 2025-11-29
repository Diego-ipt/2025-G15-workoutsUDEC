import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProfilePage } from '../pages/ProfilePage';

const USER_EMAIL = 'user@example.com';
const USER_PASSWORD = 'user123';

test.describe('Profile Page Tests', () => {

    // --------------------------------------------------------------------
    // Antes de cada test → loguear y entrar al dashboard
    // --------------------------------------------------------------------
    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);

        await login.navigate('/login');
        await login.login(USER_EMAIL, USER_PASSWORD);

        // Verificamos que realmente estamos en el dashboard
        await expect(page).toHaveURL(/dashboard/);
    });

    test('should access profile from dashboard clickable element', async ({ page }) => {
        const profile = new ProfilePage(page);

        // Aquí es donde sigues el estilo de tus compañeros:
        await page.click('a[href="/profile"]');  // o el botón que corresponda

        await expect(page).toHaveURL(/profile/);

        await expect(profile.usernameInput).toBeVisible();
        await expect(profile.emailInput).toBeVisible();
    });

    test('should access profile from navbar', async ({ page }) => {
        const profile = new ProfilePage(page);

        await page.click('nav >> text=Profile');  // por ejemplo, ajustar al selector real

        await expect(page).toHaveURL(/profile/);
        await expect(profile.fullNameInput).toBeVisible();
    });

    test('should update basic profile information', async ({ page }) => {
        const profile = new ProfilePage(page);

        await page.click('a[href="/profile"]');

        await profile.updateBasicInfo('newUser123', 'newmail@mail.com', 'New Name');
        await profile.submit();

        await profile.expectSuccess('Profile updated successfully!');
        await profile.restoreDefaults();
    });

    test('should change password successfully', async ({ page }) => {
        const profile = new ProfilePage(page);

        await page.click('a[href="/profile"]');

        await profile.changePassword('user123', 'newpass123', 'newpass123');
        await profile.submit();


        profile.updateCurrentPassword('newpass123');
        await profile.expectSuccess('Profile updated successfully!');
        await profile.restoreDefaults();

    });

    // --------------------------------------------------------------------
    // 4) VALIDACIONES DEL FORM
    // --------------------------------------------------------------------

    test('should validate password mismatch error', async ({ page }) => {
        const profile = new ProfilePage(page);

        await page.click('a[href="/profile"]');

        await profile.changePassword('user123', 'abcd1234', 'wrongconfirm');
        await profile.submit()

        await profile.expectError('New passwords do not match');

        //New password must be at least 6 characters
        //Current password is required to change password
    });


    test('should validate new password length', async ({ page }) => {
        const profile = new ProfilePage(page);

        await page.click('a[href="/profile"]');

        await profile.changePassword('user123', 'a', 'a');
        await profile.submit()

        await profile.expectError('New password must be at least 6 characters');

    });

    test('should validate current password not empty', async ({ page }) => {
        const profile = new ProfilePage(page);

        await page.click('a[href="/profile"]');

        await profile.changePassword('', 'abcd1234', 'abcd1234');
        await profile.submit()

        await profile.expectError('Current password is required to change password');

    });
    // --------------------------------------------------------------------
    // 5) ERRORES DEL BACKEND
    // --------------------------------------------------------------------
    test('should show error when current password is incorrect', async ({ page }) => {
        const profile = new ProfilePage(page);

        await page.click('a[href="/profile"]');

        await profile.changePassword('WRONG_PASSWORD', 'abcd1234', 'abcd1234');
        await profile.submit()

        await profile.expectError('Current password is incorrect');

    });


    test('should force re-login if token is missing or expired', async ({ page }) => {
        await page.evaluate(() => localStorage.removeItem('token'));

        await page.goto('/profile');

        await expect(page).toHaveURL(/login/);
    });


    test('should logout successfully', async ({ page }) => {
        const profile = new ProfilePage(page);

        // Ir al perfil
        await page.click('a[href="/profile"]');
        await page.waitForURL(/\/profile/);

        // Ejecutar logout
        await profile.logout();

        // Validar que está en login
        await expect(page).toHaveURL(/\/login/);
    });




});
