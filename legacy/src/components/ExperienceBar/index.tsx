import './styles.css';

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
        <header className="experience-bar">
            <span>{ props.minScore || 0 } px</span>
            <div>
                <div style={{ width: getCurrentScorePercent() }} />
                <span className="current-experience" style={{ left: getCurrentScorePercent()}}>
                    { props.currenteScore } px
                </span>
            </div>
            <span>{ props.maxScore } px</span>
        </header>
    );
}

export default ExperienceBar;