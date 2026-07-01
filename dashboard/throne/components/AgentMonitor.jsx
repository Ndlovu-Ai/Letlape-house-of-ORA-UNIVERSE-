/**
 * Agent swarm monitor — pool distribution, queue depth, utilization
 */

import React from 'react';

export default function AgentMonitor({ agents }) {
  const utilization = (
    ((agents.total - agents.idle) / agents.total) *
    100
  ).toFixed(1);

  return (
    <div className="agent-monitor">
      <div className="agent-stats">
        <div className="stat-card">
          <h4>TOTAL AGENTS</h4>
          <p className="stat-value">{agents.total.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <h4>ACTIVE</h4>
          <p className="stat-value" style={{ color: '#10b981' }}>
            {agents.active.toLocaleString()}
          </p>
        </div>
        <div className="stat-card">
          <h4>IDLE</h4>
          <p className="stat-value" style={{ color: '#6b7280' }}>
            {agents.idle.toLocaleString()}
          </p>
        </div>
        <div className="stat-card">
          <h4>UTILIZATION</h4>
          <p className="stat-value" style={{ color: '#3b82f6' }}>
            {utilization}%
          </p>
        </div>
      </div>

      <div className="agent-distribution">
        <h4>POOL DISTRIBUTION</h4>
        <div className="distribution-chart">
          <div className="pool-bar">
            <div
              className="pool-segment active"
              style={{
                width: `${(agents.active / agents.total) * 100}%`
              }}
              title={`Active: ${agents.active}`}
            />
            <div
              className="pool-segment processing"
              style={{
                width: `${(agents.processing / agents.total) * 100}%`
              }}
              title={`Processing: ${agents.processing}`}
            />
            <div
              className="pool-segment idle"
              style={{
                width: `${(agents.idle / agents.total) * 100}%`
              }}
              title={`Idle: ${agents.idle}`}
            />
          </div>
        </div>
      </div>

      <div className="agent-queue">
        <h4>EXECUTION QUEUE</h4>
        <p className="queue-depth">Queued tasks: {agents.queued}</p>
      </div>
    </div>
  );
}
