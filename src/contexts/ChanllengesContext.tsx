import { createContext, ReactNode, useState } from "react";
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
    startNewChallenge: () => void;
    resetChallenge: () => void;
}

interface ChallengeProviderProps {
    children: ReactNode;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({ children } : ChallengeProviderProps) {

    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(10);
    const [challengesCompleted, setChallengesCompleted] = useState(1);
    const [activeChallenge, setActiveChallenge] = useState(null);


    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const ramdomChallengeIndex = Math.floor(Math.random() * challenges.length );
        const challenge = challenges[ramdomChallengeIndex];

        setActiveChallenge(challenge);
    }

    function resetChallenge() {
        setActiveChallenge(null);
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
                experienceToNextLevel
            }}
        >
            { children }
        </ChallengeContext.Provider>
    );
}