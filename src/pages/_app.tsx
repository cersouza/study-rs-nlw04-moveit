import { UserProvider } from '../contexts/UserContext';
import { ChallengeProvider } from '../contexts/ChanllengesContext';
import { CountdownProvider } from '../contexts/CountdownContext';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ChallengeProvider>
        <CountdownProvider>
          <Component {...pageProps} />
          </CountdownProvider>
      </ChallengeProvider>
    </UserProvider>
  );

  
}

export default MyApp
