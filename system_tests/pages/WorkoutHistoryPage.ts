import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class WorkoutHistoryPage extends BasePage {

    // --- Navegación ---
    readonly historyTab: Locator;

    // --- Filtros ---
    readonly searchInput: Locator;
    readonly dateFilterSelect: Locator;
    readonly sortBySelect: Locator;
    readonly refreshButton: Locator;

    // --- Resultados ---
    readonly emptyStateIcon: Locator;
    readonly emptyStateTitle: Locator;
    readonly emptyStateMessage: Locator;

    // --- Logout (opcional si lo usas en tests) ---
    readonly logoutButton: Locator;

    constructor(page: Page) {
        super(page);

        // Tab de navegación
        this.historyTab = page.getByRole('link', { name: 'History' });

        // Filtros
        this.searchInput = page.locator('#search');
        this.dateFilterSelect = page.locator('#dateFilter');
        this.sortBySelect = page.locator('#sortBy');
        this.refreshButton = page.getByRole('button', { name: 'Refresh' });

        // Estado vacío
        this.emptyStateIcon = page.locator('svg.text-gray-400');
        this.emptyStateTitle = page.getByText('No workouts yet');
        this.emptyStateMessage = page.getByText('Start your first workout to see your progress here.');

        // Logout
        this.logoutButton = page.getByRole('button', { name: 'Logout' });
    }

    // --- Navegación ---

    async navigateToHistory() {
        await this.page.goto('/history');
        await this.waitForUrl('/history');
    }

    async openFromNavbar() {
        await this.historyTab.click();
        await this.waitForUrl('/history');
    }

    // --- Acciones sobre filtros ---
    
    async search(term: string) {
        await this.searchInput.fill(term);
    }

    async filterByDate(option: 'all' | 'week' | 'month' | '3months') {
        await this.dateFilterSelect.selectOption(option);
    }

    async sortBy(option: 'date' | 'duration' | 'volume' | 'exercises') {
        await this.sortBySelect.selectOption(option);
    }

    async refresh() {
        await this.refreshButton.click();
    }

    // --- Validaciones ---

    async expectEmptyState() {
        await expect(this.emptyStateTitle).toBeVisible();
        await expect(this.emptyStateMessage).toBeVisible();
        await expect(this.emptyStateIcon).toBeVisible();
    }

    async expectWorkoutVisible(workoutName: string) {
        await expect(this.page.getByText(workoutName)).toBeVisible();
    }

    async logout() {
        await this.logoutButton.click();
    }
}
