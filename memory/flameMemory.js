/**
 * 🔥 FLAME MEMORY SYSTEM
 * In-memory state storage with persistence hooks
 * Linked to system core
 */

const flameMemory = new Map();
const memoryIndex = new Map();

export function initMemory() {
  console.log('    Initializing Flame Memory...');
  return {
    set,
    get,
    delete: deleteKey,
    exists,
    getAll,
    search,
    clear,
    stats
  };
}

export function set(key, value) {
  flameMemory.set(key, {
    value,
    timestamp: new Date().toISOString(),
    accessCount: 0
  });
  
  // Index by prefix for faster searching
  const prefix = key.split('_')[0];
  if (!memoryIndex.has(prefix)) {
    memoryIndex.set(prefix, []);
  }
  memoryIndex.get(prefix).push(key);
}

export function get(key) {
  const entry = flameMemory.get(key);
  if (entry) {
    entry.accessCount++;
    return entry.value;
  }
  return null;
}

export function deleteKey(key) {
  return flameMemory.delete(key);
}

export function exists(key) {
  return flameMemory.has(key);
}

export function getAll() {
  const all = {};
  flameMemory.forEach((entry, key) => {
    all[key] = entry.value;
  });
  return all;
}

export function search(prefix) {
  const keys = memoryIndex.get(prefix) || [];
  const results = {};
  keys.forEach(key => {
    const entry = flameMemory.get(key);
    if (entry) results[key] = entry.value;
  });
  return results;
}

export function clear() {
  flameMemory.clear();
  memoryIndex.clear();
}

export function stats() {
  return {
    total_keys: flameMemory.size,
    total_indexed: memoryIndex.size,
    memory_usage_bytes: JSON.stringify([...flameMemory.entries()]).length
  };
}

export default flameMemory;