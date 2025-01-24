import React, {useCallback, useState} from "react";
import {SecondsDisplay, StartButton, StopButton, TimerContainer} from "./TimerStyles.tsx";
import useAppStore from "../../store/store.ts";
import {Input} from "../Workout/Set/SetStyles.tsx";

const Timer: React.FC = () => {
    const [rest, setRest] = useState(0);
    const seconds = useAppStore(s => s.seconds);
    const resetTimer = useAppStore(s => s.resetTimer);
    const setTimer = useAppStore(s => s.setTimer);
    const onResetClickHandler = useCallback(() => {
        resetTimer();
    }, [resetTimer]);
    const onStartClickHandler = useCallback(() => {
        setTimer(rest);
    }, [rest, setTimer]);
    const onRestChangedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRest(Number(e.target.value));
    }

    return <TimerContainer>
        {
            seconds <= 0 &&
            <>
                <Input type="number" placeholder="Таймер" value={rest} onChange={onRestChangedHandler}/>
                <StartButton onClick={onStartClickHandler}>Запустить</StartButton>
            </>
        }
        {seconds > 0 && <>
            <SecondsDisplay>{seconds}</SecondsDisplay>
            <StopButton onClick={onResetClickHandler}>Сбросить</StopButton>
        </>}
    </TimerContainer>;
}

export default Timer;