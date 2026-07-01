/**
 * 🧠 LETLAPE HOUSE OF ORA — CORE ENGINE
 * K-144 Council Governance Engine
 * 
 * Integrates K-144 spec (docs/k144_spec.yaml) as source of truth
 * Orchestrates Neo → Council → Agents → NEARO feedback loop
 */

import YAML from 'js-yaml';
import fs from 'fs';
import path from 'path';

const K144_SPEC_PATH = path.join(process.cwd(), 'docs', 'k144_spec.yaml');

/**
 * Core System Engine
 * Loads K-144 spec and bootstraps governance layer
 */
export class LetlapeEngine {
  constructor() {
    this.spec = this.loadSpec();
    this.neo = this.initNeo();
    this.councils = this.initCouncils();
    this.agents = this.initAgents();
    this.nearo = this.initNEARO();
    this.memory = new Map();
    this.eventLog = [];
  }

  /**
   * Load K-144 YAML spec as source of truth
   */
  loadSpec() {
    try {
      const specFile = fs.readFileSync(K144_SPEC_PATH, 'utf8');
      return YAML.load(specFile);
    } catch (e) {
      console.warn('⚠️  K-144 spec not found. Using defaults.');
      return this.defaultSpec();
    }
  }

  /**
   * Fallback spec if YAML load fails
   */
  defaultSpec() {
    return {
      system: { name: 'K-144 Council', version: 'v1.0' },
      neo: { role: 'Supreme core', functions: [] },
      councils: [],
      agents: { total: 144000 },
      nearo: { functions: [] },
      principles: [],
      outputs: { format: [] }
    };
  }

  /**
   * Initialize NEO (Supreme Governance Core)
   */
  initNeo() {
    return {
      role: this.spec.neo?.role || 'Supreme core',
      functions: this.spec.neo?.functions || [],
      personality: this.spec.neo?.personality || { frame: 'calm_sovereign' },
      state: 'active',
      directives: [],
      history: []
    };
  }

  /**
   * Initialize 14 Council Entities from spec
   */
  initCouncils() {
    const councils = {};
    (this.spec.councils || []).forEach(c => {
      councils[c.id] = {
        id: c.id,
        name: c.name,
        domain: c.domain,
        responsibilities: c.responsibilities || [],
        state: 'active',
        agents_assigned: c.id ? 12000 : 0,
        performance_score: 100,
        alerts: []
      };
    });
    return councils;
  }

  /**
   * Initialize Agent Swarm (144,000 distributed agents)
   */
  initAgents() {
    const spec = this.spec.agents || {};
    return {
      total: spec.total || 144000,
      distribution: spec.distribution || {
        per_council: 12000,
        cross_domain_hybrid: 24000,
        autonomous_optimization: 24000
      },
      behavior: spec.behavior || [
        'stateless_individuals',
        'stateful_collective',
        'self_optimizing'
      ],
      pools: {
        active: 0,
        idle: spec.total || 144000,
        processing: 0
      },
      execution_queue: [],
      feedback_buffer: []
    };
  }

  /**
   * Initialize NEARO (Monitoring & Risk Layer)
   */
  initNEARO() {
    const spec = this.spec.nearo || {};
    return {
      functions: spec.functions || [],
      capabilities: spec.capabilities || [],
      risk_score: 25,
      alerts: [],
      performance_metrics: {
        fraud_detections: 0,
        economic_imbalances: 0,
        agent_anomalies: 0,
        council_flags: 0
      },
      state: 'monitoring'
    };
  }

  /**
   * NEO issues directive
   * (Step 1 of governance flow)
   */
  issueDirective(directive) {
    const timestamp = new Date().toISOString();
    const event = {
      type: 'NEO_DIRECTIVE',
      directive,
      timestamp,
      status: 'issued'
    };
    this.neo.directives.push(event);
    this.logEvent(event);
    return this.routeToCouncils(directive);
  }

  /**
   * Route directive to appropriate Council(s)
   * (Step 2 of governance flow)
   */
  routeToCouncils(directive) {
    const assignments = [];
    Object.values(this.councils).forEach(council => {
      if (this.matchesCouncilDomain(directive, council.domain)) {
        const assignment = {
          council_id: council.id,
          council_name: council.name,
          directive,
          timestamp: new Date().toISOString(),
          status: 'assigned'
        };
        assignments.push(assignment);
        this.logEvent({
          type: 'COUNCIL_ASSIGNMENT',
          ...assignment
        });
      }
    });
    return this.activateAgents(assignments);
  }

  /**
   * Match directive to council domain
   */
  matchesCouncilDomain(directive, domain) {
    const keywords = (directive.keywords || []);
    const domainKeywords = {
      economic_architecture: ['economy', 'inflation', 'vault'],
      treasury_capital_flow: ['treasury', 'reserves', 'bonds'],
      digital_property: ['digital', 'aether', 'nft'],
      real_world_assets: ['physical', 'terra', 'asset'],
      ai_infrastructure: ['infrastructure', 'mindgrid', 'compute'],
      agent_swarm_command: ['swarm', 'agents', 'execution'],
      governance_and_law: ['rules', 'law', 'proposal'],
      security_and_risk: ['security', 'fraud', 'risk'],
      human_capital: ['talent', 'jobhub', 'employment'],
      revenue_engine: ['revenue', 'forge', 'monetization'],
      external_interface: ['api', 'integration', 'global'],
      culture_and_creation: ['content', 'creator', 'media'],
      memory_and_history: ['memory', 'archive', 'lineage'],
      system_evolution: ['evolution', 'upgrade', 'future']
    };
    
    const domainTerms = domainKeywords[domain] || [];
    return keywords.some(kw => 
      domainTerms.some(dt => kw.toLowerCase().includes(dt))
    );
  }

  /**
   * Activate agents to execute directive
   * (Step 3 of governance flow)
   */
  activateAgents(assignments) {
    const executionPlan = {
      timestamp: new Date().toISOString(),
      assignments,
      agents_activated: 0,
      execution_tasks: []
    };

    assignments.forEach(assignment => {
      const agentCount = Math.min(
        100,
        Math.floor(this.agents.pools.idle / assignments.length)
      );
      
      executionPlan.agents_activated += agentCount;
      this.agents.pools.idle -= agentCount;
      this.agents.pools.processing += agentCount;
      
      executionPlan.execution_tasks.push({
        council_id: assignment.council_id,
        agents_assigned: agentCount,
        task_type: 'execute_directive',
        directive: assignment.directive
      });
    });

    this.logEvent({
      type: 'AGENT_EXECUTION_PLAN',
      ...executionPlan
    });

    return this.evaluateRisk(executionPlan);
  }

  /**
   * NEARO evaluates system health and risk
   * (Step 6 of governance flow)
   */
  evaluateRisk(executionPlan) {
    const riskFactors = {
      agent_utilization: this.agents.pools.processing / this.agents.total,
      council_stability: Object.values(this.councils).reduce(
        (sum, c) => sum + c.performance_score, 0
      ) / (Object.keys(this.councils).length * 100),
      economic_imbalance: Math.random() * 30,
      fraud_signals: Math.random() * 10
    };

    const riskScore = (
      riskFactors.agent_utilization * 30 +
      (1 - riskFactors.council_stability) * 40 +
      riskFactors.economic_imbalance +
      riskFactors.fraud_signals
    );

    this.nearo.risk_score = Math.min(100, riskScore);

    const riskReport = {
      timestamp: new Date().toISOString(),
      risk_score: this.nearo.risk_score,
      factors: riskFactors,
      status: riskScore > 75 ? 'CRITICAL' : riskScore > 50 ? 'WARNING' : 'NOMINAL',
      recommendations: this.generateRecommendations(riskScore)
    };

    this.logEvent({
      type: 'NEARO_RISK_SCORE',
      ...riskReport
    });

    return riskReport;
  }

  /**
   * Generate NEARO recommendations based on risk
   */
  generateRecommendations(riskScore) {
    const recommendations = [];
    if (riskScore > 75) {
      recommendations.push('PAUSE_AGENTS');
      recommendations.push('FLAG_ALL_COUNCILS');
      recommendations.push('ACTIVATE_EMERGENCY_STABILIZATION');
    } else if (riskScore > 50) {
      recommendations.push('MONITOR_CLOSELY');
      recommendations.push('REDUCE_AGENT_THROUGHPUT');
    }
    return recommendations;
  }

  /**
   * Log event for auditability
   */
  logEvent(event) {
    this.eventLog.push(event);
    this.memory.set(`event_${this.eventLog.length}`, event);
  }

  /**
   * Get system status
   */
  getStatus() {
    return {
      system: this.spec.system,
      neo: {
        state: this.neo.state,
        directives_issued: this.neo.directives.length
      },
      councils: Object.values(this.councils).map(c => ({
        id: c.id,
        name: c.name,
        state: c.state,
        performance: c.performance_score,
        alerts: c.alerts.length
      })),
      agents: {
        total: this.agents.total,
        active: this.agents.pools.processing,
        idle: this.agents.pools.idle,
        queued: this.agents.execution_queue.length
      },
      nearo: {
        risk_score: this.nearo.risk_score,
        state: this.nearo.state,
        alerts: this.nearo.alerts.length
      },
      event_log_size: this.eventLog.length
    };
  }

  /**
   * Format output per K-144 Section 8
   */
  formatOutput(directive, assignments, executionPlan, riskReport) {
    return {
      NEO_DIRECTIVE: directive,
      COUNCIL_ASSIGNMENT: assignments,
      AGENT_EXECUTION_PLAN: executionPlan,
      EXPECTED_ECONOMIC_OR_SYSTEM_RESULT: {
        status: 'pending_execution',
        council_actions: assignments.length,
        agents_engaged: executionPlan.agents_activated
      },
      NEARO_RISK_SCORE: riskReport.risk_score
    };
  }
}

export default LetlapeEngine;