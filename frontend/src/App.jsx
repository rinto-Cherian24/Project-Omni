import { useState } from 'react';
import './App.css';
import AgentArena from './components/AgentArena';
import ContextPanel from './components/ContextPanel';
import SimulationResultModal from './components/SimulationResultModal';
import { mockSimulationResult } from './data/mockData';

function App() {
  const [prompt, setPrompt] = useState('Launch a 50% discount blitz for 24h via pop-ups and push notifications.');
  const [isSimulating, setIsSimulating] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [activeLines, setActiveLines] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState([]);

  const handleSimulate = () => {
    if (!prompt.trim()) return;
    setIsSimulating(true);
    setShowSummary(false);
    setVisibleMessages([]);
    
    // Simulate interaction delay
    setTimeout(() => setActiveLines(true), 100);
    
    // Render conversations simulating AI delays
    mockSimulationResult.conversation.forEach((msg) => {
      setTimeout(() => {
        setVisibleMessages(prev => [...prev, msg]);
      }, msg.timeOffset);
    });
    
    // Finish simulation
    setTimeout(() => {
      setIsSimulating(false);
      setActiveLines(false);
      setShowSummary(true);
    }, 5500);
  };

  const handleRewrite = () => {
    setPrompt(mockSimulationResult.saferVariant);
    setShowSummary(false);
  };

  return (
    <div className="layout-container">
      <AgentArena activeLines={activeLines} />

      <ContextPanel 
        prompt={prompt}
        setPrompt={setPrompt}
        isSimulating={isSimulating}
        onSimulate={handleSimulate}
        visibleMessages={visibleMessages}
      />

      {showSummary && (
        <SimulationResultModal 
          onClose={() => setShowSummary(false)}
          onRewrite={handleRewrite}
        />
      )}
    </div>
  );
}

export default App;
