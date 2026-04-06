// Phase 1 Mock Data (From Developer 1 API Contract Mockups)

export const mockContextMemory = [
  {
    id: 1,
    type: 'decision',
    topic: 'Q3 AWS Budget',
    content: 'AWS budget capped at 800 USD for Q3 to manage operational runway.',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'deadline',
    topic: 'Marketing Metrics',
    content: 'John in marketing needs Q3 metrics by Thursday 4PM.',
    time: '3 hours ago'
  },
  {
    id: 3,
    type: 'task',
    topic: 'Discount Campaign Draft',
    content: 'Draft initial 50% discount blitz strategy for review.',
    time: '1 day ago'
  }
];

export const mockSimulationResult = {
  riskScore: 78,
  riskLevel: 'high',
  sayDoGap: 'Short-term surge vs long-term trust erosion.',
  insight: '60% predicted churn in 30 days due to spam fatigue, despite a strong 70% short-term sales surge.',
  saferVariant: 'Target 10% highly engaged audience with value-based messaging. Avoid intrusive pop-ups.',
  conversation: [
    { agentId: 'manager', agentName: 'Manager', text: 'This 50% discount blitz will definitely spike our Q3 numbers immediately.', timeOffset: 500 },
    { agentId: 'customer', agentName: 'Customer', text: 'Wait, another pop-up? I just bought something yesterday at full price. Unsubscribing.', timeOffset: 2000 },
    { agentId: 'legal', agentName: 'Brand/Legal', text: 'Warning: This violates our brand promise of premium value. Trust metrics are dropping quickly.', timeOffset: 3500 }
  ]
};

// Agent positions in the arena (percentages)
export const agents = [
  { id: 'customer', label: 'Customer', role: 'Value, Trust, Spam', x: 20, y: 70, color: '#3b82f6' },
  { id: 'manager', label: 'Manager', role: 'Conversion, Revenue', x: 50, y: 20, color: '#f59e0b' },
  { id: 'legal', label: 'Brand/Legal', role: 'Reputation, Risk', x: 80, y: 70, color: '#10b981' },
];
