import {create} from "zustand/react";
import {IWorkout, IWorkoutCreation} from "../model/IWorkout.ts";
import WorkoutService from "../services/WorkoutService.ts";
import {ISet, ISetCreation, ISetParameters} from "../model/ISet.ts";
import SetService from "../services/SetService.ts";
import {IExercise, IExerciseCreation} from "../model/IExercise.ts";
import ExerciseService from "../services/ExerciseService.ts";

interface AppStore {
    workouts: IWorkout[];
    workout: IWorkout | null;
    sets: ISet[];

    loadWorkouts: () => Promise<void>;
    addWorkout: (wo: IWorkoutCreation) => Promise<void>;
    deleteWorkout: (id: number) => Promise<void>;
    loadWorkout: (workout: number) => Promise<void>;
    loadExercise: (exercise: number) => Promise<void>;
    addSet: (newSet: ISetCreation) => Promise<void>;
    updateSet: (setId: number, parameters: ISetParameters) => Promise<void>;
    deleteSet: (setId: number) => Promise<void>;
    unselectWorkout: () => void;

    exercises: IExercise[];
    exercise: IExercise | null;
    loadExercises: () => Promise<void>;
    addExercise: (ex: IExerciseCreation) => Promise<void>;
    deleteExercise: (id: number) => Promise<void>;
    unselectExercise: () => void;

    timer: number | null;
    seconds: number;
    setTimer: (seconds: number) => void;
    resetTimer: () => void;
}

const wsService = new WorkoutService();
const setService = new SetService();
const exService = new ExerciseService();

const useAppStore = create<AppStore>()((set) => ({
    workouts: [],
    workout: null,
    exercise: null,
    sets: [],
    addWorkout: async (wo: IWorkoutCreation) => {
        try {
            await wsService.create(wo);
            await useAppStore.getState().loadWorkouts();
        } catch (error) {
            alert(error);
        }
    },
    deleteWorkout: async (id) => {
        try {
            await wsService.delete(id);
            useAppStore.getState().unselectWorkout();
        } catch (error) {
            alert(error);
        }
    },
    loadWorkouts: async () => {
        try {
            const workouts = await wsService.findAll();
            set({
                workouts: workouts.sort((f, s) => s.date - f.date)
            });
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
    deleteSet: async (setId: number) => {
        const workout = useAppStore.getState().workout?.id;
        if (workout) {
            await setService.deleteSet(setId);
            const sets = await wsService.getSets(workout);
            set({sets});
        }
    },
    updateSet: async (setId: number, parameters: ISetParameters) => {
        await setService.updateSet(setId, parameters);
        const workout = useAppStore.getState().workout?.id;
        if (workout) {
            const sets = await wsService.getSets(workout);
            set({sets});
        }
    },
    unselectWorkout: () => {
        set({
            workout: null,
            sets: []
        });
    },

    exercises: [],
    addExercise: async (ex: IExerciseCreation) => {
        try {
            await exService.create(ex);
            await useAppStore.getState().loadExercises();
        } catch (error) {
            alert(error);
        }
    },
    loadExercise: async (exId) => {
        try {
            const exercise = await exService.findById(exId);
            set({exercise});
        } catch (error) {
            alert(error);
        }
    },
    deleteExercise: async (id) => {
        try {
            await exService.delete(id);
        } catch (error) {
            alert(error);
        }
    },
    loadExercises: async () => {
        try {
            const exercises = await exService.findAll();
            set({
                exercises: exercises.sort()
            });
        } catch (error) {
            alert(error);
        }
    },
    unselectExercise: () => {
        set({
            exercise: null
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
