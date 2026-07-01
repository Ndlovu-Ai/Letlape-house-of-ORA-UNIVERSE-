export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [timestamp, password] = decoded.split(':');
    const CORRECT_PASSWORD = process.env.THRONE_PASSWORD || '@OtYAHWEHTHEGoatRA666*';

    if (password === CORRECT_PASSWORD) {
      return res.status(200).json({ authenticated: true });
    }
  } catch (e) {
    // Token invalid
  }

  return res.status(401).json({ message: 'Invalid token' });
}
