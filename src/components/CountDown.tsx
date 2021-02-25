import { useEffect, useState } from 'react';
import styles from '../styles/components/CountDown.module.css';

interface CountDownProps {
    intialTimeInSeconds: number;
}

export default function CountDown(props: CountDownProps) {

    const [activeCountDown, setActiveCountDown] = useState(false);
    const [time, setTime] = useState(props.intialTimeInSeconds);

    const minutes = Math.floor(time / 60);
    const [leftMinute, rigthMinute] = minutes.toString().padStart(2, '0').split('');

    const seconds = time % 60;
    const [leftSecond, rightSecond] = seconds.toString().padStart(2, '0').split('');

    useEffect(() => {
        if(activeCountDown) {
            setTimeout(() => {
                setTime(time - 1)
            }, 1000);
        }
    }, [activeCountDown, time])

    function changeStateCountDown() {
        setActiveCountDown(!activeCountDown)
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
            
            <button
                type="button"
                className={styles.countDownButton}
                onClick={ changeStateCountDown }
            >
                {
                    activeCountDown ?
                        'Parar o ':
                        'Iniciar um '
                } 
                ciclo
            </button>
        </div>
    );
}