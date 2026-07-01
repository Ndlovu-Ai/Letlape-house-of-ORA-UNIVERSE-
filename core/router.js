/**
 * 🧭 EMISSARY ROUTER
 * Routes directives to correct emissary based on keyword matching
 * Bridges engine to execution layer
 */

import fs from 'fs';
import path from 'path';

const EMISSARIES_PATH = path.join(process.cwd(), 'emissaries', 'emissaries.json');

const DEFAULT_EMISSARIES = [
  { name: 'Kamata', role: 'Heart AI', domain: 'core' },
  { name: 'Ntala', role: 'Vault AI', domain: 'treasury' },
  { name: 'Amata', role: 'Security AI', domain: 'security' },
  { name: 'Mandingus', role: 'Router AI', domain: 'routing' },
  { name: 'Nakama', role: 'Bridge AI', domain: 'integration' },
  { name: 'Jetape', role: 'Deployment AI', domain: 'deployment' }
];

export class EmissaryRouter {
  constructor() {
    this.emissaries = this.loadEmissaries();
    this.routes = this.buildRoutes();
    this.routeHistory = [];
  }

  loadEmissaries() {
    try {
      const data = fs.readFileSync(EMISSARIES_PATH, 'utf8');
      return JSON.parse(data).emissaries || DEFAULT_EMISSARIES;
    } catch (e) {
      return DEFAULT_EMISSARIES;
    }
  }

  buildRoutes() {
    return {
      'vault': 'Ntala',
      'treasury': 'Ntala',
      'economy': 'Ntala',
      'security': 'Amata',
      'fraud': 'Amata',
      'risk': 'Amata',
      'deploy': 'Jetape',
      'infrastructure': 'Jetape',
      'integration': 'Nakama',
      'api': 'Nakama',
      'external': 'Nakama',
      'core': 'Kamata',
      'system': 'Kamata',
      'default': 'Mandingus'
    };
  }

  route(input) {
    const keywords = typeof input === 'string' 
      ? input.toLowerCase().split(' ')
      : (input.keywords || []);

    for (const keyword of keywords) {
      if (this.routes[keyword]) {
        const emissary = this.routes[keyword];
        this.routeHistory.push({
          keyword,
          emissary,
          timestamp: new Date().toISOString()
        });
        return emissary;
      }
    }

    return this.routes['default'];
  }

  getEmissary(name) {
    return this.emissaries.find(e => e.name === name) || null;
  }

  getRouteHistory() {
    return this.routeHistory;
  }
}

export default EmissaryRouter;