import { useContext } from 'react';
import { ActiveWorkoutContext } from './ActiveWorkoutContext';

import type { ActiveWorkoutContextType } from './ActiveWorkoutContextType';

export const useActiveWorkout = (): ActiveWorkoutContextType => {
  const context = useContext(ActiveWorkoutContext);
  if (!context) {
    throw new Error('useActiveWorkout must be used within an ActiveWorkoutProvider');
  }
  return context;
};
