import React, { useRef, useEffect } from 'react';
import { mockContextMemory, agents } from '../data/mockData';

const ContextPanel = ({ prompt, setPrompt, isSimulating, onSimulate, visibleMessages }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleMessages]);

  return (
    <div className="right-panel glass-panel">
      <div className="context-memory-section">
        <h2>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          Context Memory
        </h2>
        <div className="context-cards">
          {mockContextMemory.map(mem => (
            <div key={mem.id} className="context-card">
              <div className="context-card-header">
                <span className={`badge ${mem.type}`}>{mem.type}</span>
                <span style={{color: 'rgba(255,255,255,0.3)'}}>{mem.time}</span>
              </div>
              <div style={{fontWeight: 500, margin: '0.3rem 0', color: 'var(--text-main)'}}>{mem.topic}</div>
              <div className="context-card-desc">{mem.content}</div>
            </div>
          ))}
        </div>
      </div>

      {visibleMessages && visibleMessages.length > 0 && (
        <div 
          ref={scrollRef}
          style={{
            flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem',
            background: 'rgba(0,0,0,0.1)', borderRadius: '8px', padding: '1rem', border: '1px solid var(--border-color)',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div style={{color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.2rem'}}>Active Conversation</div>
          {visibleMessages.map((msg, idx) => {
            const agentInfo = agents.find(a => a.id === msg.agentId);
            return (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', animation: 'fadeIn 0.3s ease-out' }}>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', color: agentInfo?.color || '#fff' }}>
                  {msg.agentName}
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.8rem', borderRadius: '8px', color: '#f0f0f5', fontSize: '0.95rem' }}>
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="prompt-section">
        <h3>Test a Policy or Campaign</h3>
        <textarea 
          className="prompt-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="E.g. Launch a 50% discount blitz for 24h via pop-ups..."
          disabled={isSimulating}
        />
        <button 
          className={`simulate-btn ${isSimulating ? 'simulating' : ''}`}
          onClick={onSimulate}
          disabled={isSimulating || !prompt}
        >
          {isSimulating ? 'Running Behavioral Simulation...' : 'Simulate Impact'}
          {!isSimulating && (
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default ContextPanel;
