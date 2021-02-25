import styles from '../styles/components/Profile.module.css';

interface ProfileProps {
    name: string;
    urlAvatar: string;    
    level: number;
}

export default function Profile(props: ProfileProps) {
    return(
        <div className={styles.profileContainer}>
            <img src={props.urlAvatar} alt={props.name}/>
            <div>
                <strong>{props.name}</strong>
                <p>
                    <img src="icons/level.svg" alt="Level Up"/>
                    Level {props.level}
                </p>
            </div>
        </div>
    );
}