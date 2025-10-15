import { createContext } from 'react';
import type { ActiveWorkoutContextType } from './ActiveWorkoutContextType';

export const ActiveWorkoutContext = createContext<ActiveWorkoutContextType | undefined>(undefined);
