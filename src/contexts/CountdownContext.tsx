import { createContext, useContext, useEffect, useState } from "react";
import { ChallengeContext } from "./ChanllengesContext";

interface CountdownContextData {
    minutes: number;
    seconds: number;
    isActive: boolean;
    hasFinished: boolean;
    startCountDown: () => void;
    resetCountDown: () => void;
    setInitialTime: (intialTimeInSeconds: number) => void;
}

interface CountdownProviderProps {
    children: React.ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countDownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengeContext);
    const [time, setTime] = useState(0);
    const [initialTimeInSeconds, setInitialTimeInSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);    
    const [hasFinished, setHasFinished] = useState(false);

    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    useEffect(() => {
        if(isActive && time > 0) {
            countDownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (isActive && time == 0) {
            setIsActive(false);
            setHasFinished(true);
            startNewChallenge();
        }
    }, [isActive, time]);
    
    function resetCountDown() {
        setIsActive(false);
        setHasFinished(false);
        clearTimeout(countDownTimeout);        
        setTime(initialTimeInSeconds);
    }

    function startCountDown() {
        setIsActive(true);
    }

    function setInitialTime(intialTimeInSeconds: number) {
        setTime(intialTimeInSeconds);
        setInitialTimeInSeconds(intialTimeInSeconds);
    }

    return(
        <CountdownContext.Provider
            value={{
                resetCountDown,
                startCountDown,
                minutes,
                seconds,
                isActive,
                hasFinished,
                setInitialTime,
            }}
        >
            {children}
        </CountdownContext.Provider>
    )
    

}