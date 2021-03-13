import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import challenges from '../../challenges.json';
import Cookie from 'js-cookie';
import { UserContext } from "./UserContext";

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
    updateDataFromLocal: () => void;
}

interface ChallengeData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

interface ChallengeProviderProps {
    children: ReactNode;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({ children } : ChallengeProviderProps) {
    const { currentlyUsername } = useContext(UserContext);
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    useEffect(() => {    
        updateDataFromLocal();

        setCurrentExperience(currentExperience);
        setChallengesCompleted(challengesCompleted);
        setLevel(level);

        Notification.requestPermission();
                
    }, []);

    useEffect( () => {
        updateDataFromLocal();
    }, [currentlyUsername]);

    useEffect(() => {   
         
        let challengeData = {
            level, 
            currentExperience, 
            challengesCompleted
        };

        if(currentlyUsername)
            localStorage.setItem(`challengedata_${currentlyUsername}`, JSON.stringify(challengeData));

    }, [level, currentExperience, challengesCompleted]);

    function updateDataFromLocal() {
        let challengeData: ChallengeData = JSON.parse(localStorage.getItem(`challengedata_${currentlyUsername}`));

        if(challengeData) {
            setLevel(challengeData.level);
            setChallengesCompleted(challengeData.challengesCompleted);
            setCurrentExperience(challengeData.currentExperience);
        } else {
            setLevel(1);
            setChallengesCompleted(0);
            setCurrentExperience(0);
        }
    }

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge(displayNotification: boolean = true) {
        const ramdomChallengeIndex = Math.floor(Math.random() * challenges.length );
        const challenge = challenges[ramdomChallengeIndex];

        if (displayNotification) {
            new Audio('/notification.mp3').play();
        
            if (Notification.permission == 'granted') {
                new Notification(`Novo Desafio 🎉 !`, {
                    body: `Valendo ${challenge.amount} xp!`,
                    silent: true,
                    icon: '/favicon.png'
                });
            }
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
                updateDataFromLocal
            }}
        >
            { children }
        </ChallengeContext.Provider>
    );
}