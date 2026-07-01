export default function handler(req, res) {
  res.status(200).json({
    status: 'online',
    system: 'K-144 Council Governance',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
}
