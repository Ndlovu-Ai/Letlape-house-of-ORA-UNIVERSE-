/**
 * 🏛️ THRONE — LETLAPE UNIVERSE TRACKER
 * Real-time council, treasury, domain & oracle monitoring
 * Governance | Treasury | Domains | Oracle tabs
 */

import React, { useState, useEffect } from 'react';
import { getEngine } from '../../core/systemBoot';
import CouncilGrid from './components/CouncilGrid';
import AgentMonitor from './components/AgentMonitor';
import NEARODashboard from './components/NEARODashboard';
import DirectiveIssuer from './components/DirectiveIssuer';
import SystemStatus from './components/SystemStatus';
import TreasuryPanel from './components/TreasuryPanel';
import DomainsPanel from './components/DomainsPanel';
import OraclePanel from './components/OraclePanel';
import './styles.css';

const TABS = [
  { id: 'governance', label: '🧿 Governance' },
  { id: 'treasury', label: '💰 Treasury' },
  { id: 'domains', label: '🌐 Domains' },
  { id: 'oracle', label: '⚡ Oracle' }
];

export default function Throne() {
  const [systemState, setSystemState] = useState(null);
  const [selectedCouncil, setSelectedCouncil] = useState(null);
  const [directives, setDirectives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('governance');

  useEffect(() => {
    const engine = getEngine();
    if (engine) {
      const status = engine.getStatus();
      setSystemState(status);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const engine = getEngine();
      if (engine) {
        const status = engine.getStatus();
        setSystemState(status);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleIssueDirective = (directive) => {
    const engine = getEngine();
    if (engine) {
      const result = engine.issueDirective(directive);
      setDirectives([...directives, { directive, result, timestamp: new Date() }]);
    }
  };

  if (loading || !systemState) {
    return (
      <div className="throne-loading">
        <div className="loading-spinner">🧠</div>
        <p>Letlape House of ORA initializing...</p>
      </div>
    );
  }

  return (
    <div className="throne-container">
      {/* HEADER */}
      <header className="throne-header">
        <div className="header-content">
          <h1>🏛️ LETLAPE THRONE</h1>
          <p className="subtitle">ORA Universe Tracker — v2.0</p>
        </div>
        <div className="header-status">
          <div className="status-badge" data-status={systemState.neo.state}>
            {systemState.neo.state.toUpperCase()}
          </div>
          {systemState.nearo && (
            <div
              className="header-risk-pill"
              style={{
                background: systemState.nearo.risk_score > 75 ? '#ef4444'
                  : systemState.nearo.risk_score > 50 ? '#f59e0b'
                  : systemState.nearo.risk_score > 25 ? '#eab308'
                  : '#10b981'
              }}
            >
              RISK {Math.round(systemState.nearo.risk_score)}
            </div>
          )}
        </div>
      </header>

      {/* TAB NAV */}
      <nav className="throne-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`throne-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* TAB CONTENT */}
      {activeTab === 'governance' && (
        <div className="throne-grid">
          <aside className="throne-sidebar">
            <SystemStatus status={systemState} />
          </aside>
          <main className="throne-main">
            <section className="section councils-section">
              <h2>🧿 14 COUNCIL ENTITIES</h2>
              <CouncilGrid
                councils={systemState.councils}
                selectedCouncil={selectedCouncil}
                onSelectCouncil={setSelectedCouncil}
              />
            </section>
            <section className="section agents-section">
              <h2>🤖 AGENT SWARM (144k)</h2>
              <AgentMonitor agents={systemState.agents} />
            </section>
          </main>
          <aside className="throne-right-panel">
            <NEARODashboard nearo={systemState.nearo} />
            <DirectiveIssuer onIssueDirective={handleIssueDirective} />
          </aside>
        </div>
      )}

      {activeTab === 'treasury' && (
        <div className="throne-tab-content">
          <TreasuryPanel treasury={systemState.treasury} />
        </div>
      )}

      {activeTab === 'domains' && (
        <div className="throne-tab-content">
          <DomainsPanel domains={systemState.domains} />
        </div>
      )}

      {activeTab === 'oracle' && (
        <div className="throne-tab-content">
          <OraclePanel oracle={systemState.oracle} nearo={systemState.nearo} />
        </div>
      )}

      {/* DIRECTIVE LOG — always visible */}
      <section className="directive-log-section">
        <h2>📜 DIRECTIVE HISTORY</h2>
        <div className="directive-log">
          {directives.length === 0 ? (
            <p className="empty-state">No directives issued yet</p>
          ) : (
            directives.slice(-5).reverse().map((entry, i) => (
              <div key={i} className="directive-entry">
                <span className="time">{entry.timestamp.toLocaleTimeString()}</span>
                <span className="directive">{entry.directive.title}</span>
                <span className="status">✓ Routed</span>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
