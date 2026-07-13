/**
 * Domains Panel — 21 Sovereign Domains grid with live status
 */

import React, { useState } from 'react';

const COUNCIL_COLORS = {
  MINDGRID: '#3b82f6',
  VAULT_PRIME: '#f59e0b',
  MDALA_CORE: '#10b981',
  AETHER_NODE: '#8b5cf6',
  TERRA_NODE: '#84cc16',
  JOBHUB_CORE: '#06b6d4',
  CREATOR_CLOUD: '#ec4899',
  FORGE_NODE: '#f97316',
  GLOBAL_LINK: '#14b8a6',
  C1_ARCHIVE_CORE: '#94a3b8',
  FUTURE_CORE: '#a78bfa',
  NEARO_SHIELD: '#ef4444',
  K1_REGISTRY_CORE: '#eab308',
  SWARM_INTEL: '#22d3ee',
  NEO_SUPREME: '#c084fc'
};

export default function DomainsPanel({ domains }) {
  const [filter, setFilter] = useState('ALL');

  if (!domains || domains.length === 0) {
    return <div className="panel-empty">Domains data loading...</div>;
  }

  const councils = ['ALL', ...Array.from(new Set(domains.map(d => d.council)))];
  const filtered = filter === 'ALL' ? domains : domains.filter(d => d.council === filter);
  const activeDomains = domains.filter(d => d.status === 'active').length;
  const avgUptime = (domains.reduce((s, d) => s + parseFloat(d.uptime || 100), 0) / domains.length).toFixed(2);
  const totalRequests = domains.reduce((s, d) => s + (d.requests_today || 0), 0);

  return (
    <div className="domains-panel">
      {/* HEADER STATS */}
      <div className="domains-header-stats">
        <div className="treasury-stat-card">
          <span className="tstat-label">TOTAL DOMAINS</span>
          <span className="tstat-value">{domains.length}</span>
        </div>
        <div className="treasury-stat-card">
          <span className="tstat-label">ACTIVE</span>
          <span className="tstat-value green">{activeDomains}</span>
        </div>
        <div className="treasury-stat-card">
          <span className="tstat-label">AVG UPTIME</span>
          <span className="tstat-value green">{avgUptime}%</span>
        </div>
        <div className="treasury-stat-card">
          <span className="tstat-label">REQUESTS TODAY</span>
          <span className="tstat-value purple">{totalRequests.toLocaleString()}</span>
        </div>
      </div>

      {/* COUNCIL FILTER */}
      <div className="domains-filter">
        {councils.map(c => (
          <button
            key={c}
            className={`filter-btn ${filter === c ? 'active' : ''}`}
            onClick={() => setFilter(c)}
            style={filter === c ? { borderColor: COUNCIL_COLORS[c] || '#8b5cf6', color: COUNCIL_COLORS[c] || '#8b5cf6' } : {}}
          >
            {c.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {/* DOMAINS GRID */}
      <div className="domains-grid">
        {filtered.map((d) => (
          <div key={d.id} className="domain-card">
            <div className="domain-card-header">
              <span
                className="domain-council-dot"
                style={{ background: COUNCIL_COLORS[d.council] || '#8b5cf6' }}
                title={d.council}
              />
              <span className="domain-name">{d.domain}</span>
              <span className={`domain-status-badge ${d.status}`}>{d.status.toUpperCase()}</span>
            </div>
            <div className="domain-card-body">
              <p className="domain-type">{d.type.replace(/_/g, ' ')}</p>
              <p className="domain-council" style={{ color: COUNCIL_COLORS[d.council] || '#8b5cf6' }}>
                {d.council.replace(/_/g, ' ')}
              </p>
            </div>
            <div className="domain-card-footer">
              <span className="domain-stat">⬆ {d.uptime}%</span>
              <span className="domain-stat">📡 {(d.requests_today || 0).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
