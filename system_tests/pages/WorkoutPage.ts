import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class WorkoutPage extends BasePage {

    // Tabs de navegacion de arriba
    readonly workoutsTab: Locator;

    // Pantalla workouts
    readonly startEmptyWorkoutBtn: Locator;

    // Creacion de workout
    readonly workoutNameInput: Locator;
    readonly workoutStartButton: Locator;

    // Current workout
    readonly addExerciseBtn: Locator;
    readonly addFirstExerciseBtn: Locator;
    readonly cancelButton: Locator;
    readonly completeButton: Locator;
    readonly timerLabel: Locator;

    // Agregar ejercicio
    readonly searchExerciseInput: Locator;
    readonly doneButton: Locator;

    // Agregar sets
    readonly addSetBtn: Locator;
    
    constructor(page: Page) {
        super(page);

        // Creacion de workout
        this.workoutsTab = page.getByText('Workouts', { exact: true });
        this.startEmptyWorkoutBtn = page.getByRole('button', {name: 'Start Empty Workout'});
        this.workoutNameInput = page.getByPlaceholder('e.g., Push Day, Morning Run, etc.');
        this.workoutStartButton = page.getByRole('button', {name: 'Start Workout'});

        // Current workout
        this.addExerciseBtn = page.getByRole('button', {name: '+ Add Exercise'});
        this.addFirstExerciseBtn = page.getByRole('button', {name: 'Add First Exercise'});
        this.cancelButton = page.getByRole('button', {name: 'Cancel'});
        this.completeButton = page.getByRole('button', {name: 'Complete'});
        
        // Ejercicios
        this.searchExerciseInput = page.getByPlaceholder('Search by name, muscle group...');
        this.doneButton = page.getByRole('button', {name: 'Done'})

        // Sets
        this.addSetBtn = page.getByRole('button', { name: '+ Add Set'});
    }

    // Acciones

    async navigateToWorkouts() {
        await this.workoutsTab.click();
    }

    async startEmptyWorkout(workoutName?: string) {
        await this.startEmptyWorkoutBtn.click();

        // Esperar al popup

        await expect(this.workoutNameInput).toBeVisible();
        
        if (workoutName) {
            await this.workoutNameInput.fill(workoutName);
        }
        
        // Empezar workout
        await this.workoutStartButton.click();
        
    }

    async AddExercise(exerciseName: string) {
        // Click en agregar ejercicio (intenta el boton grande primero)
        if (await this.addFirstExerciseBtn.isVisible()) {
            await this.addFirstExerciseBtn.click();
        } else {
            await this.addExerciseBtn.click();
        }

        // Buscar en el popup
        await this.searchExerciseInput.fill(exerciseName);
        
        // Esperar a que se filtren
        await this.page.waitForTimeout(500); 

        // Buscamos el ejercicio
        await this.page.locator('div')
            .filter({ hasText: exerciseName })
            .getByRole('button', { name: '+ Add' })
            .first()
            .click();

        // Se cierra solo
        await expect(this.searchExerciseInput).not.toBeVisible();
    }

    async cancelWorkout() {
        // Popup html
        this.page.once('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept();
        });

        await this.cancelButton.click();

        await expect(this.page).not.toHaveURL(/.*workout/);
    }

    async verifyWorkoutIsActive() {
        await expect(this.completeButton).toBeVisible();
    }

    async verifyExerciseInList(exerciseName: string) {
        await expect(this.page.getByText(exerciseName)).toBeVisible();
    }

    async addSetToExercise(weight: string, reps: string) {
        // Click en add set
        await this.page.getByRole('button', { name: '+ Add Set' }).click();
        
        // Buscar set habilitado
        const lastRowInputs = this.page.locator('input[type="number"]');
        
        await lastRowInputs.nth(-4).fill(weight); 
        
        await lastRowInputs.nth(-3).fill(reps);
    }

    async completeLastSet() {
        await this.page.getByTitle('Complete set').last().click();
    }

}