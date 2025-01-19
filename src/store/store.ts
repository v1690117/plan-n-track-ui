import {create} from "zustand/react";
import {IWorkout} from "../model/IWorkout.ts";
import WorkoutService from "../services/WorkoutService.ts";

interface AppStore {
    workouts: IWorkout[];
    loadWorkouts: () => Promise<void>;
}

const wsService = new WorkoutService()

const useAppStore = create<AppStore>()((set) => ({
    workouts: [],
    loadWorkouts: async () => {
        try {
            const workouts = await wsService.findAll();
            set({ workouts });
        } catch (error) {
            alert(error);
        }
    }
}));

export default useAppStore;
