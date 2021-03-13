import Head from 'next/head';
import { useRouter } from 'next/router';
import { InputUserData } from '../components/InputUserData';
import styles from '../styles/pages/Home.module.css';

export default function Home() {
  return (
      <div className={styles.HomeContainer}>
          <InputUserData />
      </div>
  );
}
