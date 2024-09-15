import React, {useEffect, useRef, useState} from "react";
import {Checkbox, Input, Wrapper, Button, SetRow} from "./SetStyles";
import {ISet} from "../../../model/ISet";
import SetService from "../../../services/SetService";

interface SetProps {
    set: ISet;
}

const Set: React.FC<SetProps> = (props) => {
    const service = useRef(new SetService());
    const [completed, setCompleted] = useState<boolean>();
    const [load, setLoad] = useState<number>();
    const [reps, setReps] = useState<number>();
    const [rest, setRest] = useState<number>();
    const [hasChanges, setHasChanges] = useState<boolean>(false);
    const [seconds, setSeconds] = useState(0);
    const [timer, setTimer] = useState<any>();

    const onCompletionChangedHandler =  async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = e.target.checked;
        await service.current.updateSet(props.set.id, {
            load,
            reps,
            rest,
            completed: newChecked
        });
        setHasChanges(false);
        setCompleted(newChecked);
        if(newChecked && rest) {
            setSeconds(rest);
            const interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
                console.log(new Date().getTime());
            }, 1000);
            if(timer) {
                clearInterval(timer);
            }
            setTimer(interval);
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
        await service.current.updateSet(props.set.id, {
            load,
            reps,
            rest,
            completed
        })
        setHasChanges(false);
    }

    useEffect(() => { // todo do it without props-state connection
        setCompleted(props.set.completed);
        setLoad(props.set.load);
        setReps(props.set.reps);
        setRest(props.set.rest);
    }, [props.set]);

    useEffect(() => {
        if(seconds === 0 && timer) {
            clearInterval(timer);
            setTimer(null);
        }
    }, [seconds, timer]);

    return <Wrapper>
        <SetRow>
            <Checkbox type="checkbox" checked={completed} onChange={onCompletionChangedHandler}/>
            <Input type="number" placeholder="Вес" value={load || ''} onChange={onLoadChangedHandler}/>
            <Input type="number" placeholder="Повторения" value={reps || ''} onChange={onRepsChangeHandler}/>
            <Input type="number" placeholder="Отдых" value={rest || ''} onChange={onRestChangedHandler}/>
        </SetRow>
        {hasChanges && <Button onClick={onClickSaveHandler}>Сохранить</Button>}
        {seconds>0 && <div>
            <h1>{seconds} секунд</h1>
        </div> }
    </Wrapper>
}
export default Set;