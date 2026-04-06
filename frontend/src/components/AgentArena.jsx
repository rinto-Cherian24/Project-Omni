import React from 'react';
import { agents } from '../data/mockData';

const AgentArena = ({ activeLines }) => {
  return (
    <div className="left-panel glass-panel">
      <h2 style={{ position: 'absolute', top: '1.5rem', left: '2rem', zIndex: 10, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
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
          
          {/* Draw lines between nodes when simulating */}
          <line 
            x1="20%" y1="70%" x2="50%" y2="20%" 
            stroke="url(#lineGrad1)" strokeWidth="3" 
            strokeDasharray="8 8"
            opacity={activeLines ? 0.6 : 0.05}
            style={{ transition: 'opacity 0.5s ease', animation: activeLines ? 'dash 1s linear infinite' : 'none' }} 
          />
          <line 
            x1="50%" y1="20%" x2="80%" y2="70%" 
            stroke="url(#lineGrad2)" strokeWidth="3" 
            strokeDasharray="8 8"
            opacity={activeLines ? 0.6 : 0.05}
            style={{ transition: 'opacity 0.5s ease 0.2s', animation: activeLines ? 'dash 1s linear infinite reverse' : 'none' }} 
          />
          <line 
            x1="80%" y1="70%" x2="20%" y2="70%" 
            stroke="url(#lineGrad3)" strokeWidth="3" 
            strokeDasharray="8 8"
            opacity={activeLines ? 0.6 : 0.05}
            style={{ transition: 'opacity 0.5s ease 0.4s', animation: activeLines ? 'dash 1.5s linear infinite' : 'none' }} 
          />
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
              transition: 'transform 0.3s ease'
            }}
          >
            <div 
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: agent.color,
                boxShadow: activeLines ? `0 0 25px ${agent.color}` : `0 0 10px rgba(0,0,0,0.5)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid rgba(255,255,255,0.1)',
                transition: 'all 0.4s ease',
                transform: activeLines ? 'scale(1.1)' : 'scale(1)'
              }}
            >
              {/* Pulse wave when active */}
              {activeLines && (
                <div style={{
                  position: 'absolute', width: '100%', height: '100%', borderRadius: '50%',
                  border: `1px solid ${agent.color}`, animation: 'pulse 1.5s infinite'
                }} />
              )}
            </div>
            <div style={{ textAlign: 'center', background: 'rgba(0,0,0,0.4)', padding: '0.2rem 0.6rem', borderRadius: '4px', backdropFilter: 'blur(4px)' }}>
              <div style={{ fontWeight: 600, color: 'white', fontSize: '0.9rem' }}>{agent.label}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{agent.role}</div>
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
