import {create} from "zustand/react";
import {IWorkout, IWorkoutCreation} from "../model/IWorkout.ts";
import WorkoutService from "../services/WorkoutService.ts";
import {ISet, ISetCreation, ISetParameters} from "../model/ISet.ts";
import SetService from "../services/SetService.ts";

interface AppStore {
    workouts: IWorkout[];
    workout: IWorkout | null;
    sets: ISet[];
    loadWorkouts: () => Promise<void>;
    addWorkout: (wo: IWorkoutCreation) => Promise<void>;
    loadWorkout: (workout: number) => Promise<void>;
    // loadSets: (workout: number) => Promise<ISet[]>;
    addSet: (newSet: ISetCreation) => Promise<void>;
    updateSet: (setId: number, parameters: ISetParameters) => Promise<void>;
    unselectWorkout: () => void;
}

const wsService = new WorkoutService();
const setService = new SetService();

const useAppStore = create<AppStore>()((set) => ({
    workouts: [],
    workout: null,
    sets: [],
    addWorkout: async (wo: IWorkoutCreation) => {
        try {
            await wsService.create(wo);
            await useAppStore.getState().loadWorkouts();
        } catch (error) {
            alert(error);
        }
    },
    loadWorkouts: async () => {
        try {
            const workouts = await wsService.findAll();
            set({ workouts });
        } catch (error) {
            alert(error);
        }
    },
    loadWorkout: async (workoutId) => {
        try {
            const workout = await wsService.findById(workoutId);
            const sets = await wsService.getSets(workoutId);
            set({ workout, sets });
        } catch (error) {
            alert(error);
        }
    },
    addSet: async (newSet: ISetCreation) => {
        const workout = useAppStore.getState().workout?.id;
        if(workout) {
            await wsService.addSet(workout, newSet);
            const sets = await wsService.getSets(workout);
            set({ sets });
        }
    },
    updateSet: async (setId: number, parameters: ISetParameters) => {
        return setService.updateSet(setId, parameters);
    },
    unselectWorkout: () => {
        set({
            workout: null,
            sets: []
        });
    },
}));

export default useAppStore;
