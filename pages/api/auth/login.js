import { useState } from 'react';

export async function getServerSideProps() {
  // Verify token on server side
  return {
    props: {}
  };
}

export default function ApiAuthLogin(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { password } = req.body;
  const CORRECT_PASSWORD = process.env.THRONE_PASSWORD || '@OtYAHWEHTHEGoatRA666*';

  if (password === CORRECT_PASSWORD) {
    const token = Buffer.from(`${Date.now()}:${password}`).toString('base64');
    return res.status(200).json({
      message: 'Authentication successful',
      token
    });
  }

  return res.status(401).json({
    message: 'Invalid mandate passkey'
  });
}
