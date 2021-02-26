import Head from 'next/head';
import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import CompletedChallenges from '../components/CompletedChallenges';
import CountDown from '../components/CountDown';
import styles from '../styles/pages/Home.module.css';
import ChallengeBox from '../components/ChallengeBox';
import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChanllengesContext';
import { CountdownProvider } from '../contexts/CountdownContext';

export default function Home() {
  const { currentExperience, experienceToNextLevel, level } = useContext(ChallengeContext);

  return (
    <div className={styles.container}>
      <Head>
        <title>Início | MoveIt</title>
      </Head>

      <ExperienceBar 
        currenteScore={currentExperience}        
        maxScore={experienceToNextLevel}
      />

      <CountdownProvider>
        <section>
          <div>
            <Profile 
              name="Caio Eduardo"
              urlAvatar="https://github.com/cersouza.png"
              level={level}
            />

            <CompletedChallenges />

            <CountDown
              intialTimeInSeconds={25 * 60}
            />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountdownProvider>

    </div>
  )
}
