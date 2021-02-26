import { createContext, ReactNode, useEffect, useState } from "react";
import challenges from '../../challenges.json';

interface Challenge {
    type: 'eye' | 'body';
    description: string;
    amount: number;
}

interface ChallengeContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: (displayNotification?: boolean) => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

interface User {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

interface ChallengeProviderProps {
    children: ReactNode;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({ children } : ChallengeProviderProps) {

    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    useEffect(() => {
        Notification.requestPermission();

        const {
            currentExperience,
            challengesCompleted,
            level
        } = getUserData();

        setCurrentExperience(currentExperience);
        setChallengesCompleted(challengesCompleted);
        setLevel(level);
                
    }, []);

    useEffect(() => {
        const dataUser = {
            level,
            currentExperience,
            challengesCompleted
        };

        localStorage.setItem('moveit-user-local-data', JSON.stringify(dataUser));  

    }, [level, currentExperience, completeChallenge]);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    function getUserData() : User {
        let dataUser = {
            level,
            currentExperience,
            challengesCompleted
        };

        const dataUserString = localStorage.getItem('moveit-user-local-data');

        if(dataUserString) {
            dataUser = JSON.parse(dataUserString);
        };

        return dataUser;
    }

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge(displayNotification: boolean = true) {
        const ramdomChallengeIndex = Math.floor(Math.random() * challenges.length );
        const challenge = challenges[ramdomChallengeIndex];

        new Audio('/notification.mp3').play();
        
        if (Notification.permission == 'granted' && displayNotification) {
            new Notification(`Novo Desafio 🎉 !`, {
                body: `Valendo ${challenge.amount} xp!`,
                silent: true,
                icon: '/favicon.png'
            });
        }

        setActiveChallenge(challenge);
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge){
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
        
    }

    return (
        <ChallengeContext.Provider
            value={{
                level,
                currentExperience,
                challengesCompleted,
                levelUp,     
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                completeChallenge,
            }}
        >
            { children }
        </ChallengeContext.Provider>
    );
}