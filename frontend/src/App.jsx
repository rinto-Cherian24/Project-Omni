import { useState } from 'react';
import './App.css';
import AgentArena from './components/AgentArena';
import ContextPanel from './components/ContextPanel';
import SimulationResultModal from './components/SimulationResultModal';
import { mockContextMemory, mockSimulationResult } from './data/mockData';

function App() {
  const [prompt, setPrompt] = useState('Launch a 50% discount blitz for 24h via pop-ups and push notifications.');
  const [isSimulating, setIsSimulating] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState(null);
  const [visibleMessages, setVisibleMessages] = useState([]);
  
  // Phase 2: Dynamic state mapping for ambient extraction
  const [contextMemory, setContextMemory] = useState(mockContextMemory);

  const handleTranscriptAdded = (transcriptText) => {
    const text = transcriptText.toLowerCase();
    
    // Simple logic engine simulating backend keyword extraction
    let type = null;
    if (text.includes('deadline')) type = 'deadline';
    else if (text.includes('decision')) type = 'decision';
    else if (text.includes('task')) type = 'task';
    
    if (type) {
      const newMemory = {
        id: `amb-${Date.now()}`,
        type: type,
        topic: 'Ambient Extraction',
        content: `"${transcriptText}"`,
        time: 'Just now'
      };
      setContextMemory(prev => [newMemory, ...prev]);
    } else {
      const rawMemory = {
        id: `amb-${Date.now()}`,
        type: 'note',
        topic: 'Raw Audio Note',
        content: `"${transcriptText}"`,
        time: 'Just now'
      };
      setContextMemory(prev => [rawMemory, ...prev]);
    }
  };

  const handleSimulate = () => {
    if (!prompt.trim()) return;
    setIsSimulating(true);
    setShowSummary(false);
    setVisibleMessages([]);
    setActiveSpeaker(null);
    
    // Render conversations simulating AI delays and 'thinking' status
    mockSimulationResult.conversation.forEach((msg) => {
      // Begin "Thinking" 1000ms before sending their message
      setTimeout(() => {
        setActiveSpeaker(msg.agentId);
      }, Math.max(0, msg.timeOffset - 1000));

      // Append Message
      setTimeout(() => {
        setVisibleMessages(prev => [...prev, msg]);
      }, msg.timeOffset);
    });
    
    // Clear final speaker shortly after last message completes
    const finalOffset = mockSimulationResult.conversation[mockSimulationResult.conversation.length - 1].timeOffset;
    setTimeout(() => {
      setActiveSpeaker(null);
    }, finalOffset + 1500);

    // Finish simulation roughly synced
    setTimeout(() => {
      setIsSimulating(false);
      setShowSummary(true);
    }, 5500);
  };

  const handleRewrite = () => {
    setPrompt(mockSimulationResult.saferVariant);
    setShowSummary(false);
  };

  return (
    <div className="layout-container">
      <AgentArena activeSpeaker={activeSpeaker} />

      <ContextPanel 
        prompt={prompt}
        setPrompt={setPrompt}
        isSimulating={isSimulating}
        onSimulate={handleSimulate}
        visibleMessages={visibleMessages}
        contextMemory={contextMemory}
        onTranscriptAdded={handleTranscriptAdded}
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
