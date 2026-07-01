/**
 * 🔑 MANDINGU CORE KEYS
 * Sovereign override keys aligned with K-144 principles
 */

export const KEYS = {
  KEY01: {
    name: 'heartbeat-monitor',
    function: 'system_health_monitoring',
    level: 'operational',
    active: true
  },
  KEY02: {
    name: 'prophecy-access',
    function: 'future_state_prediction',
    level: 'strategic',
    active: true
  },
  KEY03: {
    name: 'sovereign-override',
    function: 'neo_emergency_intervention',
    level: 'absolute',
    active: true
  }
};

export function validateKey(keyId) {
  return KEYS[keyId]?.active || false;
}

export function getKeyInfo(keyId) {
  return KEYS[keyId] || null;
}

export default KEYS;