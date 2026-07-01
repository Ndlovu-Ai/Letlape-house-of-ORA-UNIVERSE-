/**
 * NEARO monitoring dashboard — risk scoring, alerts, recommendations
 */

import React from 'react';

export default function NEARODashboard({ nearo }) {
  const getRiskColor = (score) => {
    if (score > 75) return '#ef4444'; // red
    if (score > 50) return '#f59e0b'; // amber
    return '#10b981'; // green
  };

  const getRiskStatus = (score) => {
    if (score > 75) return 'CRITICAL';
    if (score > 50) return 'WARNING';
    return 'NOMINAL';
  };

  return (
    <div className="nearo-dashboard">
      <h3>🛡️ NEARO SHIELD</h3>

      <div className="risk-gauge">
        <div
          className="gauge-circle"
          style={{
            background: `conic-gradient(${getRiskColor(nearo.risk_score)} 0deg ${(nearo.risk_score / 100) * 360}deg, #e5e7eb ${(nearo.risk_score / 100) * 360}deg)`
          }}
        >
          <div className="gauge-inner">
            <p className="gauge-value">{Math.round(nearo.risk_score)}</p>
            <p className="gauge-label">RISK</p>
          </div>
        </div>
      </div>

      <div className="risk-status-badge" data-status={getRiskStatus(nearo.risk_score)}>
        {getRiskStatus(nearo.risk_score)}
      </div>

      <div className="nearo-metrics">
        <h4>METRICS</h4>
        <div className="metrics-list">
          <div className="metric">
            <span className="metric-label">Fraud Detections</span>
            <span className="metric-value">
              {nearo.performance_metrics?.fraud_detections || 0}
            </span>
          </div>
          <div className="metric">
            <span className="metric-label">Economic Imbalances</span>
            <span className="metric-value">
              {nearo.performance_metrics?.economic_imbalances || 0}
            </span>
          </div>
          <div className="metric">
            <span className="metric-label">Agent Anomalies</span>
            <span className="metric-value">
              {nearo.performance_metrics?.agent_anomalies || 0}
            </span>
          </div>
          <div className="metric">
            <span className="metric-label">Council Flags</span>
            <span className="metric-value">
              {nearo.performance_metrics?.council_flags || 0}
            </span>
          </div>
        </div>
      </div>

      <div className="nearo-alerts">
        <h4>ALERTS</h4>
        {nearo.alerts && nearo.alerts.length > 0 ? (
          <ul className="alerts-list">
            {nearo.alerts.slice(0, 3).map((alert, i) => (
              <li key={i} className="alert-item">
                {alert}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-alerts">No alerts</p>
        )}
      </div>
    </div>
  );
}
