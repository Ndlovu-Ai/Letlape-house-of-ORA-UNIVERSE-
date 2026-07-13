/**
 * Treasury Panel — Revenue streams, 40/30/30 allocation, OTCoin status
 */

import React from 'react';

const ALLOCATION_COLORS = {
  operating: '#10b981',
  reserve: '#3b82f6',
  investment: '#8b5cf6'
};

const CYCLE_BADGE = {
  real_time: { label: 'REAL-TIME', color: '#10b981' },
  continuous: { label: 'CONTINUOUS', color: '#10b981' },
  hourly: { label: 'HOURLY', color: '#3b82f6' },
  daily: { label: 'DAILY', color: '#f59e0b' },
  weekly: { label: 'WEEKLY', color: '#6b7280' },
  monthly: { label: 'MONTHLY', color: '#6b7280' }
};

export default function TreasuryPanel({ treasury }) {
  if (!treasury) return <div className="panel-empty">Treasury data loading...</div>;

  const { total_inflow_today, allocation, otcoin, revenue_streams, status } = treasury;
  const totalPct = allocation.operating + allocation.reserve + allocation.investment;

  return (
    <div className="treasury-panel">
      {/* HEADER STATS */}
      <div className="treasury-header-stats">
        <div className="treasury-stat-card">
          <span className="tstat-label">TODAY'S INFLOW</span>
          <span className="tstat-value green">R {total_inflow_today.toLocaleString()}</span>
        </div>
        <div className="treasury-stat-card">
          <span className="tstat-label">OTZA PRICE</span>
          <span className="tstat-value purple">R {otcoin.price_zar}</span>
        </div>
        <div className="treasury-stat-card">
          <span className="tstat-label">CIRCULATING OTZA</span>
          <span className="tstat-value">{otcoin.circulating.toLocaleString()}</span>
        </div>
        <div className="treasury-stat-card">
          <span className="tstat-label">BURNED TODAY</span>
          <span className="tstat-value amber">{otcoin.burned_today.toLocaleString()}</span>
        </div>
        <div className="treasury-stat-card">
          <span className="tstat-label">STATUS</span>
          <span className="tstat-value green">{(status || 'active').toUpperCase()}</span>
        </div>
      </div>

      {/* 40/30/30 ALLOCATION */}
      <div className="treasury-allocation-section">
        <h3>TREASURY ALLOCATION</h3>
        <div className="allocation-bar-wrap">
          {Object.entries(allocation).map(([key, pct]) => (
            <div
              key={key}
              className="allocation-segment"
              style={{ width: `${(pct / totalPct) * 100}%`, background: ALLOCATION_COLORS[key] }}
              title={`${key}: ${pct}%`}
            />
          ))}
        </div>
        <div className="allocation-legend">
          {Object.entries(allocation).map(([key, pct]) => (
            <div key={key} className="legend-item">
              <span className="legend-dot" style={{ background: ALLOCATION_COLORS[key] }} />
              <span className="legend-label">{key.toUpperCase()}</span>
              <span className="legend-pct">{pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* REVENUE STREAMS */}
      <div className="treasury-streams-section">
        <h3>REVENUE STREAMS ({revenue_streams.length})</h3>
        <div className="streams-table">
          <div className="streams-header">
            <span>SOURCE</span>
            <span>TYPE</span>
            <span>CYCLE</span>
            <span>TODAY (R)</span>
          </div>
          {revenue_streams.map((s, i) => {
            const badge = CYCLE_BADGE[s.settlement_cycle] || { label: s.settlement_cycle.toUpperCase(), color: '#6b7280' };
            return (
              <div key={i} className="stream-row">
                <span className="stream-source">{s.source}</span>
                <span className="stream-type">{s.type.replace(/_/g, ' ')}</span>
                <span className="stream-cycle" style={{ color: badge.color }}>{badge.label}</span>
                <span className="stream-amount">R {s.amount_today.toLocaleString()}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
