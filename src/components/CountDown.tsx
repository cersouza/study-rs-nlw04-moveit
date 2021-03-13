import { useContext, useEffect, useState } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/CountDown.module.css';

interface CountDownProps {
    intialTimeInSeconds: number;
}

export default function CountDown(props: CountDownProps) {

    const {  
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountDown,
        resetCountDown,
        setInitialTime,
    } = useContext(CountdownContext);

    useEffect(() => {
        setInitialTime(props.intialTimeInSeconds);
    }, []);
    
    const [leftMinute, rigthMinute] = String(minutes).padStart(2, '0').split('');    
    const [leftSecond, rightSecond] = String(seconds).padStart(2, '0').split('');

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
                    Abandonar
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