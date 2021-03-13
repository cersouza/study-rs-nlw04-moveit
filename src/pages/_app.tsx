import { ChallengeProvider } from '../contexts/ChanllengesContext';
import { UserProvider } from '../contexts/UserContext';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ChallengeProvider>
          <Component {...pageProps} />
      </ChallengeProvider>
    </UserProvider>
  );

  
}

export default MyApp
