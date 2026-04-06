# API Contract & Schema Definitions

This document ensures strict alignment between the React frontend (Developer 1) and the FastAPI backend logic (Developers 2, 3 & 4). 

## Endpoint: `/api/simulate-praxis`
**Method:** POST  
**Description:** Receives the user's prompt (e.g., a policy or marketing scenario) and initiates a multi-agent debate using Gemini Flash. It returns the structured insights and the verbatim conversation log between the simulated persona agents.

### Expected Payload (Request)
```json
{
  "prompt": "Launch a 50% discount blitz for 24h via pop-ups and push notifications."
}
```

### Expected Response Shell (Response Schema)
The frontend relies strictly on this schema structure. Missing properties or malformed types will throw UI exceptions.

```json
{
  "riskScore": 78,
  "riskLevel": "high", 
  "sayDoGap": "Short-term surge vs long-term trust erosion.",
  "insight": "60% predicted churn in 30 days due to spam fatigue, despite a strong 70% short-term sales surge.",
  "saferVariant": "Target 10% highly engaged audience with value-based messaging. Avoid intrusive pop-ups.",
  "conversation": [
    { 
      "agentId": "manager", 
      "agentName": "Manager", 
      "text": "This 50% discount blitz will definitely spike our Q3 numbers immediately.",
      "timeOffset": 500
    },
    { 
      "agentId": "customer", 
      "agentName": "Customer", 
      "text": "Wait, another pop-up? I just bought something yesterday at full price. Unsubscribing.",
      "timeOffset": 2000
    },
    { 
      "agentId": "legal", 
      "agentName": "Brand/Legal", 
      "text": "Warning: This violates our brand promise of premium value. Trust metrics are dropping quickly.",
      "timeOffset": 3500
    }
  ]
}
```

### Schema Notes
- `riskLevel`: Must be lowercased strings representing `low`, `medium`, or `high` for CSS mapping logic.
- `conversation.agentId`: Must map to `customer`, `manager`, or `legal` to bind to the frontend UI colored agent circles.
- `conversation.timeOffset`: Optional (frontend mocks this natively for delay effect in Phase 1, but API can provide logic delays here if required).
