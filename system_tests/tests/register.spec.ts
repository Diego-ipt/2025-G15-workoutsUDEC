import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';

test.describe('Register Page Tests', () => {

    test.beforeEach(async ({ page }) => {
        const registerPage = new RegisterPage(page);
        await registerPage.navigateToRegister();
    });

    // --- TEST 1: Registro exitoso ---
    test('should register a new user successfully', async ({ page }) => {
        const register = new RegisterPage(page);

        const unique = Date.now(); // para evitar conflictos

        await register.register(
            'Test User',
            `user${unique}`,
            `email${unique}@example.com`,
            'testpass123',
            'testpass123'
        );

        await register.submit();

        await register.expectSuccess('Account created successfully! Please sign in with your email and password.');
    });


    // --- TEST 2: Passwords no coinciden ---
    test('should show error when passwords do not match', async ({ page }) => {
        const register = new RegisterPage(page);

        await register.register(
            'Juan Pérez',
            'juanp',
            'juan@example.com',
            'pass1234',
            'pass9999'
        );

        await register.submit();

        await register.expectError('Passwords do not match');
    });


    test('should show error when username already exists', async ({ page }) => {
        const register = new RegisterPage(page);

        await register.register(
            'Existing User',
            'regularuser',
            'holahola@example.com', // existente
            'abcd1234',
            'abcd1234'
        );

        await register.submit();

        await register.expectError('The user with this username already exists in the system');
    });


    // --- TEST 3: Email ya registrado ---
    test('should show error when email is already taken', async ({ page }) => {
        const register = new RegisterPage(page);

        await register.register(
            'Existing User',
            'existinguser123',
            'user@example.com', // existente
            'abcd1234',
            'abcd1234'
        );

        await register.submit();

        await register.expectError('The user with this email already exists in the system');
    });


    // --- TEST 4: Navegación hacia Login ---
    test('should navigate to login page from register page', async ({ page }) => {
        const register = new RegisterPage(page);

        await register.goToLogin();

        await expect(page).toHaveURL(/\/login/);
    });

});
