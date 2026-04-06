import React from 'react';
import { agents } from '../data/mockData';

const AgentArena = ({ activeSpeaker }) => {
  const getAgentNode = (id) => agents.find(a => a.id === id);
  const sender = activeSpeaker ? getAgentNode(activeSpeaker) : null;
  const receivers = sender ? agents.filter(a => a.id !== activeSpeaker) : [];
  return (
    <div className="left-panel glass-panel">
      <h2 style={{ position: 'absolute', top: '1.5rem', left: '2rem', zIndex: 10, color: 'var(--text-main)', fontWeight: 600 }}>
        Praxis Copilot Arena
      </h2>
      
      <div className="agent-arena">
        {/* SVG for connection lines */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <defs>
            <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <linearGradient id="lineGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          
          {/* Draw dynamic broadcast lines from active speaker */}
          {sender && receivers.map((receiver) => (
             <line 
                key={`${sender.id}-${receiver.id}`}
                x1={`${sender.x}%`} y1={`${sender.y}%`} 
                x2={`${receiver.x}%`} y2={`${receiver.y}%`} 
                stroke={sender.color} 
                strokeWidth="2" 
                strokeDasharray="6 6"
                style={{ animation: 'dashBlast 0.6s linear infinite' }} 
              />
          ))}
        </svg>

        {/* Render Agents */}
        {agents.map((agent) => (
          <div 
            key={agent.id}
            style={{
              position: 'absolute',
              left: `${agent.x}%`,
              top: `${agent.y}%`,
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.8rem',
              zIndex: 2,
              animation: activeSpeaker === agent.id ? `computeNode 1s ease-in-out infinite` : `floatNode ${4 + agent.id.length % 3}s ease-in-out infinite alternate`,
            }}
          >
            <div 
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: agent.color,
                boxShadow: activeSpeaker === agent.id ? `0 0 15px ${agent.color}, 0 0 0 4px ${agent.color}40` : `0 2px 8px rgba(0,0,0,0.15)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid #ffffff',
                transition: 'all 0.4s ease',
              }}
            >
              {/* Pulse wave when active */}
              {activeSpeaker === agent.id && (
                <div style={{
                  position: 'absolute', width: '100%', height: '100%', borderRadius: '50%',
                  border: `2px solid ${agent.color}`, animation: 'pulse 1s infinite'
                }} />
              )}
            </div>

            {/* Typing Indicator Box */}
            {activeSpeaker === agent.id && (
              <div className="typing-bubble">
                <div className="typing-dot" style={{background: agent.color}}></div>
                <div className="typing-dot" style={{background: agent.color}}></div>
                <div className="typing-dot" style={{background: agent.color}}></div>
              </div>
            )}
            <div style={{ textAlign: 'center', background: '#f8fafc', border: '1px solid var(--border-color)', padding: '0.3rem 0.8rem', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.85rem' }}>{agent.label}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>{agent.role}</div>
            </div>
          </div>
        ))}
        
        <style>{`
          @keyframes dash {
            to { stroke-dashoffset: -16; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default AgentArena;
