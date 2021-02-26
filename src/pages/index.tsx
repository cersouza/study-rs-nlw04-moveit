import Head from 'next/head';
import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import CompletedChallenges from '../components/CompletedChallenges';
import CountDown from '../components/CountDown';
import styles from '../styles/pages/Home.module.css';
import ChallengeBox from '../components/ChallengeBox';
import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChanllengesContext';

export default function Home() {
  const { currentExperience, experienceToNextLevel } = useContext(ChallengeContext);

  return (
    <div className={styles.container}>
      <Head>
        <title>Início | MoveIt</title>
      </Head>

      <ExperienceBar 
        currenteScore={currentExperience}        
        maxScore={experienceToNextLevel}
      />

      <section>
        <div>
          <Profile 
            name="Caio Eduardo"
            urlAvatar="https://github.com/cersouza.png"
            level={5}
          />

          <CompletedChallenges />

          <CountDown
            intialTimeInSeconds={0.1 * 60}
          />
        </div>
        <div>
          <ChallengeBox />
        </div>
      </section>

    </div>
  )
}
