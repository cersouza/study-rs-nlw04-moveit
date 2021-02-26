import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChanllengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css'

export default function ChallengeBox() {
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengeContext);
    const {  resetCountDown  } = useContext(CountdownContext);

    function handleFailedChallenge() {
        resetChallenge();
        resetCountDown();
    }

    function handleSucceededChallenge() {
        completeChallenge();
        resetChallenge();
        resetCountDown();
    }

    return(
        <div className={styles.challengeBoxContainer}>
            {
                activeChallenge ?
                <div className={styles.challengeActive}>
                   <header>Ganhe {activeChallenge.amount} xp</header>
                   <main>
                       <img src={`icons/${activeChallenge.type}.svg`} />
                       <strong>Novo desafio</strong>
                       <p>{activeChallenge.description}</p>
                   </main>
                   <footer>
                       <button
                        type="button"
                        className={styles.challengeFailedButton}
                        onClick={handleFailedChallenge}
                       >
                           Falhei
                       </button>
                       <button
                        type="button"
                        className={styles.challengeSucceededButton}
                        onClick={handleSucceededChallenge}
                       >
                           Completei
                       </button>
                   </footer>
                </div>
                :
                <div className={styles.challengeNotActive}>
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level UP"/>
                        Avance de level completando desafios.
                    </p>
                </div>
            }
        </div>
    );
}