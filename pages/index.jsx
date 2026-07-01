export default function Home() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #111827 0%, #0f172a 100%)',
      color: '#f3f4f6',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: linear-gradient(135deg, #111827 0%, #0f172a 100%); }
      `}</style>
      <div style={{ textAlign: 'center', maxWidth: '600px', padding: '2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🧠</div>
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          LETLAPE HOUSE OF ORA
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: '#9ca3af',
          marginBottom: '2rem',
          lineHeight: '1.6'
        }}>
          Sovereign AI operating system for the ORA Universe
        </p>
        <a href="/login" style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
          color: '#fff',
          padding: '1rem 2rem',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          cursor: 'pointer',
          border: 'none'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 0 1rem rgba(139, 92, 246, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
        }}
        >
          Enter Throne
        </a>
        <p style={{
          marginTop: '2rem',
          fontSize: '0.875rem',
          color: '#6b7280'
        }}>
          K-144 Council Governance System
        </p>
      </div>
    </div>
  );
}
