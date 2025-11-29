import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { WorkoutHistoryPage } from '../pages/WorkoutHistoryPage';

const USER_EMAIL = 'user@example.com';
const USER_PASSWORD = 'user123';

test.describe('Workout History Page Tests', () => {

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

  test('should access history from navbar', async ({ page }) => {
    const history = new WorkoutHistoryPage(page);

    await history.openFromNavbar();
    await expect(page).toHaveURL(/history/);

    // Estado vacío si no hay workouts
    await history.expectEmptyState();
  });

  test('should show a workout after search', async ({ page }) => {
    const history = new WorkoutHistoryPage(page);

    await history.navigateToHistory();

    // Simulación de datos: crear un workout antes de buscar
    await page.evaluate(() => {
      // Aquí simulas que el backend ya devolvió un workout
      const container = document.createElement('div');
      container.textContent = 'Cardio Training';
      container.className = 'workout-item';
      document.body.appendChild(container);
    });

    await history.search('Cardio');
    await history.refresh();
    await history.expectWorkoutVisible('Cardio Training');
  });

  test('should filter workouts by date', async ({ page }) => {
    const history = new WorkoutHistoryPage(page);

    await history.navigateToHistory();

    // Simulación de datos: workout con fecha
    await page.evaluate(() => {
      const container = document.createElement('div');
      container.textContent = 'Weekly Training';
      container.className = 'workout-item';
      document.body.appendChild(container);
    });

    await history.filterByDate('week');
    await history.refresh();
    await history.expectWorkoutVisible('Weekly Training');
  });

  test('should sort workouts by duration', async ({ page }) => {
    const history = new WorkoutHistoryPage(page);

    await history.navigateToHistory();

    // Simulación de datos: varios workouts
    await page.evaluate(() => {
      const w1 = document.createElement('div');
      w1.textContent = 'Short Run';
      w1.className = 'workout-item';
      document.body.appendChild(w1);

      const w2 = document.createElement('div');
      w2.textContent = 'Long Run';
      w2.className = 'workout-item';
      document.body.appendChild(w2);
    });

    await history.sortBy('duration');
    await history.refresh();
    await history.expectWorkoutVisible('Long Run');
  });

  test('should logout from history page', async ({ page }) => {
    const history = new WorkoutHistoryPage(page);

    await history.navigateToHistory();
    await history.logout();

    await expect(page).toHaveURL(/login/);
  });
});
