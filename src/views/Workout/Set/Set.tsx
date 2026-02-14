import React, {useEffect, useState} from "react";
import {Checkbox, Input, SetRow, Wrapper} from "./SetStyles";
import {ISet} from "../../../model/ISet";
import useAppStore from "../../../store/store.ts";
import {IconButton} from "../../../components/IconButton/IconButton.tsx";
import {Check, Trash2} from "lucide-react";

interface SetProps {
    set: ISet;
}

const Set: React.FC<SetProps> = (props) => {
    const [completed, setCompleted] = useState<boolean>();
    const [load, setLoad] = useState<number>();
    const [reps, setReps] = useState<number>();
    const [rest, setRest] = useState<number>();
    const [hasChanges, setHasChanges] = useState<boolean>(false);

    const updateSet = useAppStore(s => s.updateSet);
    const deleteSet = useAppStore(s => s.deleteSet);
    const setTimer = useAppStore(s => s.setTimer);

    const onCompletionChangedHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = e.target.checked;
        await updateSet(props.set.id, {
            load,
            reps,
            rest,
            completed: newChecked
        });
        setHasChanges(false);
        setCompleted(newChecked);
        if (newChecked && rest) {
            setTimer(rest);
        }
    }
    const onLoadChangedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasChanges(true);
        setLoad(Number(e.target.value));
    }
    const onRepsChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasChanges(true);
        setReps(Number(e.target.value));
    }
    const onRestChangedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasChanges(true);
        setRest(Number(e.target.value));
    }
    const onClickSaveHandler = async () => {
        await updateSet(props.set.id, {
            load,
            reps,
            rest,
            completed
        })
        setHasChanges(false);
    }
    const onDeleteClickHandler = () => {
        if (confirm("Are you sure?")) {
            deleteSet(props.set.id);
        }
    }

    useEffect(() => { // todo do it without props-state connection
        setCompleted(props.set.completed);
        setLoad(props.set.load);
        setReps(props.set.reps);
        setRest(props.set.rest);
    }, [props.set]);

    return <Wrapper>
        <SetRow>
            <Checkbox type="checkbox" checked={completed} onChange={onCompletionChangedHandler}/>
            <Input type="number" placeholder="Ве    с" value={load || ''} onChange={onLoadChangedHandler}/>
            <Input type="number" placeholder="Повторения" value={reps || ''} onChange={onRepsChangeHandler}/>
            <Input type="number" placeholder="Отдых" value={rest || ''} onChange={onRestChangedHandler}/>
            <IconButton onClick={onDeleteClickHandler} type={'negative'}><Trash2/></IconButton>
        </SetRow>
        {hasChanges && <IconButton onClick={onClickSaveHandler}><Check/></IconButton>}
    </Wrapper>
}
export default Set;