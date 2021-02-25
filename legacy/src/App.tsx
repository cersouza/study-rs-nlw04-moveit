
import './styles/global.css';
import ExperienceBar from './components/ExperienceBar';

function App() {
  return (
    <div className="container">
      <ExperienceBar
        maxScore={600}
        currenteScore={300}
      />
    </div>
  );
}

export default App;
