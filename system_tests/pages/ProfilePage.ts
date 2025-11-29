import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProfilePage extends BasePage {

    // Navegación
    readonly profileNavLink: Locator;
    readonly viewProfileButton: Locator;

    // Campos del formulario
    readonly usernameInput: Locator;
    readonly emailInput: Locator;
    readonly fullNameInput: Locator;

    // Cambio de contraseña
    readonly currentPasswordInput: Locator;
    readonly newPasswordInput: Locator;
    readonly confirmPasswordInput: Locator;

    // Botón submit
    readonly updateProfileButton: Locator;
    readonly logoutButton: Locator;


    constructor(page: Page) {
        super(page);

        // Botón desde dashboard
        this.viewProfileButton = page.getByRole('button', { name: 'View Profile' });

        // Por si existe el link de navegación superior
        this.profileNavLink = page.getByRole('link', { name: 'Profile' }).or(
            page.getByText('Profile', { exact: true })
        );

        // Inputs principales
        this.usernameInput = page.locator('#username');
        this.emailInput = page.locator('#email');
        this.fullNameInput = page.locator('#full_name');

        // Cambio de contraseña
        this.currentPasswordInput = page.locator('#currentPassword');
        this.newPasswordInput = page.locator('#newPassword');
        this.confirmPasswordInput = page.locator('#confirmPassword');

        // Botón principal
        this.updateProfileButton = page.getByRole('button', { name: 'Update Profile' });
        this.logoutButton = page.getByRole('button', { name: 'Logout' });

    }

    ORIGINAL = {
        username: "regularuser",
        email: "user@example.com",
        fullName: "Regular User Test",
        password: "user123",
    };

    // Se actualiza dinamicamente en cambios de  contraseña en tests
    CURRENT = {
        password: "user123",
    };

    // === Acciones ===

    async logout() {
        await this.logoutButton.click();
        await this.page.waitForURL('/login');
    }

    updateCurrentPassword(newPass: string) {
        this.CURRENT.password = newPass;
    }


    async goToProfile() {
        await this.page.click('a[href="/profile"]');
        await this.page.waitForURL(/\/profile/);
    }

    async openFromDashboard() {
        await this.viewProfileButton.click();
        await expect(this.page).toHaveURL(/profile/);
    }

    async openFromNav() {
        await this.profileNavLink.click();
        await expect(this.page).toHaveURL(/profile/);
    }

    async updateBasicInfo(username: string, email: string, fullName?: string) {
        await this.usernameInput.fill(username);
        await this.emailInput.fill(email);
        if (fullName !== undefined) {
            await this.fullNameInput.fill(fullName);
        }
    }

    async changePassword(current: string, newPass: string, confirm: string) {
        await this.currentPasswordInput.fill(current);
        await this.newPasswordInput.fill(newPass);
        await this.confirmPasswordInput.fill(confirm);
    }

    async submit() {
        await this.updateProfileButton.click();
    }

    // Helpers para asserts

    async expectError(message?: string) {
        const alert = this.page.locator('div.bg-red-50');

        await expect(alert).toBeVisible({ timeout: 8000 });

        if (message) {
            await expect(alert).toContainText(message);
        }
    }


    async expectSuccess(message = 'Profile updated successfully!') {
        const alert = this.page.locator('div.bg-green-50');

        await expect(alert).toBeVisible({ timeout: 8000 });

        if (message) {
            await expect(alert).toContainText(message);
        }
    }




    //funcion auxiliar para volver los datos actualizados a los originales
    async restoreDefaults() {
        // 1) Ir al perfil
        await this.goToProfile();

        // 2) Restaurar username, email, full name
        await this.updateBasicInfo(
            this.ORIGINAL.username,
            this.ORIGINAL.email,
            this.ORIGINAL.fullName
        );

        console.log(this.CURRENT.password)
        console.log(this.ORIGINAL.password)


        // 3) Restaurar password solo si cambió
        if (this.CURRENT.password !== this.ORIGINAL.password) {
            await this.changePassword(
                this.CURRENT.password,
                this.ORIGINAL.password,
                this.ORIGINAL.password
            );

            // Marcar que el password actual vuelve al original
            this.CURRENT.password = this.ORIGINAL.password;
        }

        // 4) Enviar cambios
        await this.submit();

        // 5) Aviso de éxito (ajusta el texto según tu backend)
        await this.expectSuccess('Profile updated successfully!');
    }

}
