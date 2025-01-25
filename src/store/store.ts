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
    addSet: (newSet: ISetCreation) => Promise<void>;
    updateSet: (setId: number, parameters: ISetParameters) => Promise<void>;
    unselectWorkout: () => void;

    timer: number | null;
    seconds: number;
    setTimer: (seconds: number) => void;
    resetTimer: () => void;
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
            set({workouts});
        } catch (error) {
            alert(error);
        }
    },
    loadWorkout: async (workoutId) => {
        try {
            const workout = await wsService.findById(workoutId);
            const sets = await wsService.getSets(workoutId);
            set({workout, sets});
        } catch (error) {
            alert(error);
        }
    },
    addSet: async (newSet: ISetCreation) => {
        const workout = useAppStore.getState().workout?.id;
        if (workout) {
            await wsService.addSet(workout, newSet);
            const sets = await wsService.getSets(workout);
            set({sets});
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

    timer: null,
    seconds: 0,
    setTimer: (seconds) => {
        if (!seconds || seconds < 0) {
            return;
        }
        let left = seconds;
        const interval = setInterval(() => {
            if (left === 0) {
                const timer = useAppStore.getState().timer;
                if (timer) {
                    useAppStore.getState().resetTimer();
                    if (!window.navigator.vibrate) {
                        alert("Your device does not support the Vibration API. Try on an Android phone!");
                    } else {
                        window.navigator.vibrate(1500);
                    }
                }
            } else {
                set({seconds: --left});
            }
        }, 1000);
        useAppStore.getState().resetTimer();
        set({timer: interval});
    },
    resetTimer: () => {
        const timer = useAppStore.getState().timer;
        if (timer) {
            clearInterval(timer);
            set({timer: null, seconds: 0});
        }
    }
}));

export default useAppStore;
