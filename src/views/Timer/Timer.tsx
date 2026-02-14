import React, {useCallback, useState} from "react";
import {Input, SecondsDisplay, TimerContainer} from "./TimerStyles.tsx";
import useAppStore from "../../store/store.ts";
import {IconButton} from "../../components/IconButton/IconButton.tsx";
import {Play, RotateCcw} from "lucide-react";

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
        <Input type="number" placeholder="Таймер" value={rest} onChange={onRestChangedHandler}/>
        <IconButton onClick={onStartClickHandler}><Play/></IconButton>
        <SecondsDisplay>{seconds}</SecondsDisplay>
        <IconButton onClick={onResetClickHandler} type={'negative'}><RotateCcw/></IconButton>
    </TimerContainer>;
}

export default Timer;