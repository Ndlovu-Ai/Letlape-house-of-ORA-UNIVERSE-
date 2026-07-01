/**
 * 🏛️ THRONE — LETLAPE DASHBOARD
 * Real-time council & agent monitoring
 * Live NEARO risk scoring & governance visualization
 */

import React, { useState, useEffect } from 'react';
import { getEngine } from '../../core/systemBoot';
import CouncilGrid from './components/CouncilGrid';
import AgentMonitor from './components/AgentMonitor';
import NEARODashboard from './components/NEARODashboard';
import DirectiveIssuer from './components/DirectiveIssuer';
import SystemStatus from './components/SystemStatus';
import './styles.css';

export default function Throne() {
  const [systemState, setSystemState] = useState(null);
  const [selectedCouncil, setSelectedCouncil] = useState(null);
  const [directives, setDirectives] = useState([]);
  const [loading, setLoading] = useState(true);

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
          <p className="subtitle">K-144 Council Governance Dashboard</p>
        </div>
        <div className="header-status">
          <div className="status-badge" data-status={systemState.neo.state}>
            {systemState.neo.state.toUpperCase()}
          </div>
        </div>
      </header>

      {/* MAIN GRID */}
      <div className="throne-grid">
        {/* LEFT: System Overview */}
        <aside className="throne-sidebar">
          <SystemStatus status={systemState} />
        </aside>

        {/* CENTER: Council & Agent Control */}
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

        {/* RIGHT: NEO & NEARO */}
        <aside className="throne-right-panel">
          <NEARODashboard nearo={systemState.nearo} />
          <DirectiveIssuer onIssueDirective={handleIssueDirective} />
        </aside>
      </div>

      {/* DIRECTIVE LOG */}
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
