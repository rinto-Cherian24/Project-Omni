import React from 'react';
import { mockSimulationResult } from '../data/mockData';

const SimulationResultModal = ({ onClose, onRewrite }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="summary-modal glass-panel" onClick={e => e.stopPropagation()}>
        <h2>Simulation Results</h2>
        
        <div className="risk-score">
          <div>
            <div style={{color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.2rem'}}>Systemic Risk Score</div>
            <div style={{color: 'white', fontSize: '1.1rem'}}>{mockSimulationResult.sayDoGap}</div>
          </div>
          <div className={`risk-value ${mockSimulationResult.riskLevel}`}>
            {mockSimulationResult.riskScore}%
          </div>
        </div>

        <div className="insight-section">
          <h4>Behavioral Insight</h4>
          <div className="insight-content">
            {mockSimulationResult.insight}
          </div>
        </div>

        <div className="insight-section" style={{marginBottom: 0}}>
          <h4>Safer Variant Recommendation</h4>
          <div className="better-variant">
            {mockSimulationResult.saferVariant}
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Dismiss</button>
          <button className="btn-primary" onClick={onRewrite}>Apply Rewrite</button>
        </div>
      </div>
    </div>
  );
};

export default SimulationResultModal;
