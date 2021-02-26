import { useContext, useEffect, useState } from 'react';
import { ChallengeContext } from '../contexts/ChanllengesContext';
import styles from '../styles/components/CountDown.module.css';

interface CountDownProps {
    intialTimeInSeconds: number;
}

let countDownTimeout: NodeJS.Timeout;

export default function CountDown(props: CountDownProps) {

    const { startNewChallenge } = useContext(ChallengeContext);

    const [isActive, setIsActive] = useState(false);
    const [time, setTime] = useState(props.intialTimeInSeconds);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const [leftMinute, rigthMinute] = minutes.toString().padStart(2, '0').split('');

    const seconds = time % 60;
    const [leftSecond, rightSecond] = seconds.toString().padStart(2, '0').split('');

    useEffect(() => {
        if(isActive && time > 0) {
            countDownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000);
        } else if (isActive && time == 0) {
            setIsActive(false);
            setHasFinished(true);
            startNewChallenge();
        }
    }, [isActive, time])

    function resetCountDown() {
        setIsActive(false);
        clearTimeout(countDownTimeout);        
        setTime(props.intialTimeInSeconds);
    }

    function startCountDown() {
        setIsActive(true);
    }

    return(
        <div>
            <div className={styles.countDownContainer}>
                <div>
                    <span>{leftMinute}</span>
                    <span>{rigthMinute}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{leftSecond}</span>
                    <span>{rightSecond}</span>
                </div>
            </div>
            
            { 

            hasFinished ?
                <button
                disabled
                className={styles.countDownButton}
                >
                    Ciclo encerrado
                </button>
            :
            
            isActive ?
                <button
                type="button"
                className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
                onClick={ resetCountDown }
                >
                    Abandonar ciclo
                </button>
            :
                <button
                    type="button"
                    className={styles.countDownButton}
                    onClick={ startCountDown }
                >
                    Iniciar um ciclo
                </button>                
            }
        </div>
    );
}