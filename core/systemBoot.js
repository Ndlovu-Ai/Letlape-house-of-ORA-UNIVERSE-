/**
 * ⚡ SYSTEM BOOTSTRAP
 * Initializes Letlape House of ORA on startup
 * Loads engine, router, memory, security in order
 */

import LetlapeEngine from './engine.js';
import EmissaryRouter from './router.js';
import { initMemory } from '../memory/flameMemory.js';
import { initAuth } from './auth.js';

let globalEngine = null;
let globalRouter = null;

export async function bootSystem() {
  console.log('🧠 Letlape House of ORA — Initializing...');
  console.log('📅', new Date().toISOString());

  try {
    // 1. Initialize Memory Layer
    console.log('  → Memory layer...');
    const memory = initMemory();

    // 2. Initialize Security
    console.log('  → Security layer...');
    const auth = initAuth();

    // 3. Initialize Engine (loads K-144 spec)
    console.log('  → Core engine (K-144 spec)...');
    globalEngine = new LetlapeEngine();

    // 4. Initialize Router (emissary system)
    console.log('  → Emissary router...');
    globalRouter = new EmissaryRouter();

    const status = globalEngine.getStatus();
    
    console.log('\n✅ SYSTEM ONLINE');
    console.log('━'.repeat(60));
    console.log(`System:    ${status.system.name} ${status.system.version}`);
    console.log(`NEO:       ${status.neo.state.toUpperCase()}`);
    console.log(`Councils:  ${status.councils.length} active`);
    console.log(`Agents:    ${status.agents.total} total (${status.agents.idle} idle)`);
    console.log(`NEARO:     ${status.nearo.state.toUpperCase()} | Risk: ${status.nearo.risk_score}/100`);
    console.log(`Events:    ${status.event_log_size}`);
    console.log('━'.repeat(60));
    console.log('\n🧠 Letlape House of ORA ready for directives\n');

    return {
      status: 'online',
      engine: globalEngine,
      router: globalRouter,
      memory,
      auth,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Boot failed:', error.message);
    throw error;
  }
}

export function getEngine() {
  return globalEngine;
}

export function getRouter() {
  return globalRouter;
}

export default bootSystem;