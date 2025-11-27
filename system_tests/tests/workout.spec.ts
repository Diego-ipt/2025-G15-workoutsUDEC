import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { WorkoutPage } from '../pages/WorkoutPage';

test.describe('Workout Flow', () => {
    let loginPage: LoginPage;
    let workoutPage: WorkoutPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        workoutPage = new WorkoutPage(page);

        /* De create_regular_user.py en backend
        {
                "email": "user@example.com",
                "username": "regularuser",
                "password": "user123",
                "full_name": "Regular User Test"
            }
        */
        await loginPage.login("user@example.com", "user123");
        /*
        Bug extraño:
        Si hay un workout en progreso entonces no deja crear otro.
        por alguna razon cuando se abre la pagina despues de borrar las cookies (Tal como lo hace playwright en cada sesion),
        entonces no aparece que hay un workout en progreso hasta recargar la pagina, por eso se implementa un reload manual aca
        */
        await page.reload();
        await page.waitForTimeout(500);
        const continueWorkoutBtn = page.getByRole('button', { name: /continue workout/i }).first();
        
        // Si no hay ejercicio solo espera 2 segundos
        if (await continueWorkoutBtn.isVisible({ timeout: 2000 })) {
            console.log('Limpiando workout activo...');
            await continueWorkoutBtn.click();
            await workoutPage.cancelWorkout();
            await page.waitForTimeout(500);
        }
        
        await workoutPage.navigateToWorkouts();
    });

    test('Should start empty workout', async ({page}) => {
        const myWorkoutName = 'Test Playwright Workout';
        await workoutPage.startEmptyWorkout(myWorkoutName);
        await workoutPage.verifyWorkoutIsActive();
    });

    test('Should add exercise to workout', async ({page}) => {
        // Inicia workout
        await workoutPage.startEmptyWorkout();

        // Agrega ejercicio
        const exerciseName = 'Cardio'
        await workoutPage.AddExercise(exerciseName);

        // Verificar que aparece
        await workoutPage.verifyExerciseInList(exerciseName);
    });
})