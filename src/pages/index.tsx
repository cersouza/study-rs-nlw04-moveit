import Head from 'next/head';
import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import CompletedChallenges from '../components/CompletedChallenges';
import CountDown from '../components/CountDown';

import styles from '../styles/pages/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Início | MoveIt</title>
      </Head>
      <ExperienceBar 
        maxScore={600}
        currenteScore={300}        
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
            intialTimeInSeconds={25 * 60}
          />
        </div>
        <div>

        </div>
      </section>

    </div>
  )
}
