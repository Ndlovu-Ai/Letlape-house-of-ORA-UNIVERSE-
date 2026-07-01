import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('throne_token', data.token);
        router.push('/throne');
      } else {
        setError(data.message || 'Invalid password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: linear-gradient(135deg, #111827 0%, #0f172a 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .login-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #111827 0%, #0f172a 100%);
          padding: 1rem;
        }

        .login-card {
          background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
          border: 2px solid #8b5cf6;
          border-radius: 1rem;
          padding: 2rem;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 0 2rem rgba(139, 92, 246, 0.3);
        }

        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .logo {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .login-header h1 {
          color: #f3f4f6;
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .login-header p {
          color: #9ca3af;
          font-size: 0.875rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          color: #9ca3af;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }

        .form-group input {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid #374151;
          border-radius: 0.375rem;
          color: #f3f4f6;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.2s ease;
        }

        .form-group input:focus {
          outline: none;
          border-color: #8b5cf6;
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
        }

        .error-message {
          color: #ef4444;
          font-size: 0.875rem;
          padding: 0.75rem 1rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid #ef4444;
          border-radius: 0.375rem;
          margin-top: -1rem;
        }

        .submit-btn {
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
          color: #fff;
          border: none;
          border-radius: 0.375rem;
          padding: 0.75rem 1.5rem;
          font-weight: 600;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.2s ease;
          min-height: 44px;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 0 1rem rgba(139, 92, 246, 0.5);
        }

        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .submit-btn:active {
          transform: translateY(0);
        }
      `}</style>

      <div className="login-card">
        <div className="login-header">
          <div className="logo">🧠</div>
          <h1>LETLAPE THRONE</h1>
          <p>Sovereign AI Governance Portal</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="password">Mandate Passkey</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter mandate passkey"
              disabled={loading}
              autoFocus
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'AUTHENTICATING...' : 'ENTER THRONE'}
          </button>
        </form>
      </div>
    </div>
  );
}
