import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { ChallengeContext } from '../contexts/ChanllengesContext';
import { UserContext } from '../contexts/UserContext';
import styles from '../styles/components/Profile.module.css';
interface ProfileProps {
    name: string;
    username: string;
    urlAvatar: string;    
    level: number;
}

export default function Profile(props: ProfileProps) {
    const router = useRouter();
    const { name, profileImageUrl, username } = useContext(UserContext);
    const { level } = useContext(ChallengeContext);

    function redirectToLoginPage() {
        router.push(`/?_username=${props.username || username}`);
    }
    
    return(
        <div className={styles.profileContainer}>
            <div className={styles.avatarContainer}>
                <img src={props.urlAvatar || profileImageUrl} alt={props.name || name}/>
            </div>
            <div>
                <strong>
                    {props.name || name}
                    <a
                        type="button"
                        title="Sair"
                        onClick={redirectToLoginPage}
                    >
                        <img src="logout.svg" alt="Sair"/>
                    </a>
                </strong>
                <p>
                    <img src="icons/level.svg" alt="Level Up"/>
                    Level {props.level || level}
                </p>
            </div>
        </div>
    );
}