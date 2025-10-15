import type {
  Workout,
  WorkoutCreate,
  WorkoutExerciseCreate,
  ExerciseSetCreate,
  ExerciseSetUpdate
} from '../types/workout';

export interface ActiveWorkoutContextType {
  // State
  activeWorkout: Workout | null;
  loading: boolean;
  error: string | null;
  workoutTimer: number;

  // Actions
  startWorkout: (workoutData: WorkoutCreate) => Promise<void>;
  startWorkoutFromTemplate: (templateId: number, workoutData?: Partial<WorkoutCreate>) => Promise<void>;
  completeWorkout: () => Promise<void>;
  cancelWorkout: () => Promise<void>;
  updateWorkoutNotes: (notes: string) => Promise<void>;

  // Exercise management
  addExerciseToWorkout: (exerciseData: WorkoutExerciseCreate) => Promise<void>;
  removeExerciseFromWorkout: (workoutExerciseId: number) => Promise<void>;
  updateExerciseNotes: (workoutExerciseId: number, notes: string) => Promise<void>;

  // Set management
  addSet: (workoutExerciseId: number, setData: ExerciseSetCreate) => Promise<void>;
  updateSet: (workoutExerciseId: number, setId: number, setData: ExerciseSetUpdate) => Promise<void>;
  deleteSet: (workoutExerciseId: number, setId: number) => Promise<void>;
  completeSet: (workoutExerciseId: number, setId: number) => Promise<void>;

  // Utility
  refreshActiveWorkout: () => Promise<void>;
  clearError: () => void;
}
