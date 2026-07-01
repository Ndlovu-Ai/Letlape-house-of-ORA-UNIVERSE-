/**
 * System status card — NEO state, councils, agents, NEARO risk
 */

import React from 'react';

export default function SystemStatus({ status }) {
  return (
    <div className="system-status">
      <div className="status-card">
        <h3>SYSTEM</h3>
        <p className="system-name">{status.system.name}</p>
        <p className="system-version">{status.system.version}</p>
      </div>

      <div className="status-card">
        <h3>NEO STATE</h3>
        <div className="state-badge" data-state={status.neo.state}>
          {status.neo.state.toUpperCase()}
        </div>
        <p className="directives">Directives: {status.neo.directives_issued}</p>
      </div>

      <div className="status-card">
        <h3>COUNCILS</h3>
        <p className="count">{status.councils.length}</p>
        <div className="councils-mini">
          {status.councils.map(c => (
            <span key={c.id} className="council-mini" title={c.name}>
              {c.id}
            </span>
          ))}
        </div>
      </div>

      <div className="status-card">
        <h3>AGENTS</h3>
        <p className="count">{status.agents.total.toLocaleString()}</p>
        <div className="agent-distribution">
          <span className="agent-stat">
            <span className="label">Active:</span>
            <span className="value">{status.agents.active}</span>
          </span>
          <span className="agent-stat">
            <span className="label">Idle:</span>
            <span className="value">{status.agents.idle}</span>
          </span>
        </div>
      </div>

      <div className="status-card nearo-card">
        <h3>NEARO RISK</h3>
        <div className="risk-score" data-risk={status.nearo.risk_score}>
          {Math.round(status.nearo.risk_score)}/100
        </div>
        <p className="risk-state">{status.nearo.state.toUpperCase()}</p>
      </div>
    </div>
  );
}
