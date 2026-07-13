/**
 * Oracle Panel — AAON 5 oracle types, fusion engine, signal status
 */

import React from 'react';

const ORACLE_ICONS = {
  economic: '📈',
  risk: '🛡️',
  governance: '⚖️',
  external: '🌐',
  agent: '🤖'
};

const ORACLE_COLORS = {
  economic: '#10b981',
  risk: '#ef4444',
  governance: '#f59e0b',
  external: '#3b82f6',
  agent: '#8b5cf6'
};

export default function OraclePanel({ oracle, nearo }) {
  if (!oracle) return <div className="panel-empty">Oracle data loading...</div>;

  const { nodes, fusion_engine, last_update } = oracle;
  const passingNodes = nodes.filter(n => n.consensus).length;
  const totalSignals = nodes.reduce((s, n) => s + n.signal_count, 0);
  const consensusOk = fusion_engine.current_consensus >= fusion_engine.consensus_required;

  return (
    <div className="oracle-panel">
      {/* FUSION ENGINE STATUS */}
      <div className="fusion-engine-card">
        <div className="fusion-header">
          <span className="fusion-title">⚡ SIGNAL FUSION ENGINE</span>
          <span className={`fusion-badge ${consensusOk ? 'passing' : 'failing'}`}>
            {consensusOk ? 'CONSENSUS PASSING' : 'CONSENSUS FAILING'}
          </span>
        </div>
        <div className="fusion-stats">
          <div className="fusion-stat">
            <span className="fusion-stat-label">REQUIRED</span>
            <span className="fusion-stat-val">{fusion_engine.consensus_required} / 5</span>
          </div>
          <div className="fusion-stat">
            <span className="fusion-stat-label">CONFIRMED</span>
            <span className="fusion-stat-val green">{fusion_engine.current_consensus} / 5</span>
          </div>
          <div className="fusion-stat">
            <span className="fusion-stat-label">TOTAL SIGNALS</span>
            <span className="fusion-stat-val purple">{totalSignals.toLocaleString()}</span>
          </div>
          <div className="fusion-stat">
            <span className="fusion-stat-label">LAST UPDATE</span>
            <span className="fusion-stat-val muted">{new Date(last_update).toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* ORACLE NODES */}
      <div className="oracle-nodes-section">
        <h3>ORACLE NODES ({nodes.length})</h3>
        <div className="oracle-nodes-grid">
          {nodes.map((node) => (
            <div key={node.type} className="oracle-node-card">
              <div className="oracle-node-header">
                <span className="oracle-node-icon">{ORACLE_ICONS[node.type]}</span>
                <span className="oracle-node-label">{node.label}</span>
                <span
                  className={`oracle-node-consensus ${node.consensus ? 'ok' : 'fail'}`}
                  title={node.consensus ? 'Contributing to consensus' : 'Not in consensus'}
                >
                  {node.consensus ? '✓' : '✗'}
                </span>
              </div>
              <div className="oracle-node-signals">
                <span
                  className="signal-bar-fill"
                  style={{
                    width: `${Math.min(100, (node.signal_count / 15000) * 100)}%`,
                    background: ORACLE_COLORS[node.type]
                  }}
                />
              </div>
              <div className="oracle-node-footer">
                <span className="oracle-signal-count" style={{ color: ORACLE_COLORS[node.type] }}>
                  {node.signal_count.toLocaleString()} signals
                </span>
                <span className={`oracle-status ${node.status}`}>{node.status.toUpperCase()}</span>
              </div>
              <div className="oracle-sources">
                {node.sources.map((src, i) => (
                  <span key={i} className="oracle-source-tag">{src}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NEARO FEED */}
      {nearo && (
        <div className="oracle-nearo-feed">
          <h3>NEARO RISK FEED</h3>
          <div className="nearo-feed-row">
            <div className="nearo-feed-score-bar">
              <div
                className="nearo-feed-fill"
                style={{
                  width: `${nearo.risk_score}%`,
                  background: nearo.risk_score > 75 ? '#ef4444' : nearo.risk_score > 50 ? '#f59e0b' : nearo.risk_score > 25 ? '#eab308' : '#10b981'
                }}
              />
            </div>
            <span className="nearo-feed-score">{Math.round(nearo.risk_score)} / 100</span>
            <span className="nearo-feed-state">{nearo.state.toUpperCase()}</span>
          </div>
          <div className="nearo-tier-labels">
            <span style={{ color: '#10b981' }}>0–25 GREEN</span>
            <span style={{ color: '#eab308' }}>26–50 YELLOW</span>
            <span style={{ color: '#f59e0b' }}>51–75 ORANGE</span>
            <span style={{ color: '#ef4444' }}>76–100 RED</span>
          </div>
        </div>
      )}
    </div>
  );
}
