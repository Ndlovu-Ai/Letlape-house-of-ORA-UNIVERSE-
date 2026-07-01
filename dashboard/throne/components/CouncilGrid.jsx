/**
 * Council grid — all 14 councils with status, performance, alerts
 */

import React from 'react';

export default function CouncilGrid({ councils, selectedCouncil, onSelectCouncil }) {
  return (
    <div className="council-grid">
      {councils.map(council => (
        <div
          key={council.id}
          className={`council-card ${selectedCouncil?.id === council.id ? 'selected' : ''}`}
          onClick={() => onSelectCouncil(council)}
        >
          <div className="council-header">
            <span className="council-id">{council.id}</span>
            <span className="council-name">{council.name}</span>
          </div>
          <div className="council-body">
            <p className="domain">{council.domain || 'unknown'}</p>
            <div className="performance-bar">
              <div
                className="performance-fill"
                style={{
                  width: `${council.performance}%`,
                  backgroundColor:
                    council.performance > 75
                      ? '#10b981'
                      : council.performance > 50
                      ? '#f59e0b'
                      : '#ef4444'
                }}
              />
            </div>
            <span className="performance-text">{Math.round(council.performance)}%</span>
          </div>
          <div className="council-footer">
            <span className="state" data-state={council.state}>
              {council.state.toUpperCase()}
            </span>
            {council.alerts > 0 && (
              <span className="alert-badge">⚠️ {council.alerts}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
