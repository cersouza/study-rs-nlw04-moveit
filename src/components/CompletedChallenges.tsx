import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChanllengesContext';
import styles from '../styles/components/CompletedChallenges.module.css';

export default function CompletedChallenges() {
    const { challengesCompleted } = useContext(ChallengeContext);

    return (
        <div className={styles.completedChallengesContainer}>
            <span>Desafios Completos</span>
            <span>{challengesCompleted}</span>
        </div>
    );
}