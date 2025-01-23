import React, {useCallback} from "react";
import {SecondsDisplay, StopButton, TimerContainer} from "./TimerStyles.tsx";
import useAppStore from "../../store/store.ts";

const Timer: React.FC = () => {
    const seconds = useAppStore(s => s.seconds);
    const resetTimer = useAppStore(s => s.resetTimer);
    const onClickHandler = useCallback(() => {
        resetTimer();
    }, [])
    return <TimerContainer>
        {seconds > 0 && <>
            <SecondsDisplay>{seconds}</SecondsDisplay>
            <StopButton onClick={onClickHandler}>Сбросить</StopButton>
        </>}
    </TimerContainer>;
}

export default Timer;