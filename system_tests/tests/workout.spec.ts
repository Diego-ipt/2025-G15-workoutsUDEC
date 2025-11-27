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
        // Esperemos que la pagina cargue bien
        await page.waitForTimeout(100);
        
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

    test('Should add a set, complete it and finish workout', async ({page}) => {
        // Inicia workout
        await workoutPage.startEmptyWorkout();

        // Agrega Cardio (time based)
        await workoutPage.AddExercise('Cardio');

        // Agrega BenchPress (weight based)
        await workoutPage.AddExercise('Bench Press');

        // Agregar set a cardio (15 minutos)
        await workoutPage.addSetToExercise('Cardio', '15', '0');

        // Agregar set a bench press
        await workoutPage.addSetToExercise('Bench Press', '60', '8');
        
        // Completar ambos
        await workoutPage.completeLastSet('Cardio');
        await workoutPage.completeLastSet('Bench Press');

        await workoutPage.page.getByText('Done');
    });
})