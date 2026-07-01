/**
 * 🔐 SECURITY & AUTHENTICATION
 * Implements hierarchical access control
 * Aligns with K-144 zero-trust architecture
 */

const MANDINGU_KEYS = {
  KEY01: 'heartbeat-monitor',
  KEY02: 'prophecy-access',
  KEY03: 'sovereign-override'
};

const ROLES = {
  NEO: { level: 10, permissions: ['*'] },
  COUNCIL: { level: 7, permissions: ['directive_issue', 'agent_command', 'monitoring'] },
  AGENT: { level: 4, permissions: ['execute_task', 'report_status'] },
  EXTERNAL: { level: 1, permissions: ['read_status', 'query_public'] }
};

const SESSION_STORE = new Map();

export function initAuth() {
  return {
    keys: MANDINGU_KEYS,
    roles: ROLES,
    sessions: SESSION_STORE,
    verifyKey,
    createSession,
    validateSession,
    hasPermission
  };
}

export function verifyKey(key) {
  return Object.values(MANDINGU_KEYS).includes(key);
}

export function createSession(userId, role, keyUsed) {
  if (!verifyKey(keyUsed)) {
    return null;
  }

  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const session = {
    sessionId,
    userId,
    role,
    keyUsed,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    active: true
  };

  SESSION_STORE.set(sessionId, session);
  return session;
}

export function validateSession(sessionId) {
  const session = SESSION_STORE.get(sessionId);
  if (!session) return null;

  const now = new Date();
  const expiry = new Date(session.expiresAt);

  if (now > expiry || !session.active) {
    session.active = false;
    return null;
  }

  return session;
}

export function hasPermission(sessionId, action) {
  const session = validateSession(sessionId);
  if (!session) return false;

  const role = ROLES[session.role];
  if (!role) return false;

  return role.permissions.includes('*') || role.permissions.includes(action);
}

export default initAuth;