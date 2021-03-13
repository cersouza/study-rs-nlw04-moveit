import styles from '../styles/components/ExperienceBar.module.css';

interface ExperienceBarProps  {
    minScore?: number;
    maxScore: number;
    currenteScore: number;
}

function ExperienceBar(props: ExperienceBarProps) {

    function getCurrentScorePercent() {
        let percent = props.currenteScore * 100 / props.maxScore;
        return `${percent}%`;
    }

    return(
        <header className={styles.experienceBar}>
            <span>{ props.minScore || 0 } px</span>
            <div>
                <div style={{ width: getCurrentScorePercent() }} />
               
                {                 
                    props.currenteScore > 0 
                    &&
                    <span className={styles.currentExperience} style={{ left: getCurrentScorePercent()}}>
                        { props.currenteScore } px
                    </span>
                }
            </div>
            <span>{ props.maxScore } px</span>
        </header>
    );
}

export default ExperienceBar;