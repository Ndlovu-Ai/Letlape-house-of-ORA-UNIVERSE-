/**
 * Directive issuer — form to issue NEO directives
 */

import React, { useState } from 'react';

export default function DirectiveIssuer({ onIssueDirective }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    const directive = {
      title,
      description,
      keywords: keywords.split(',').map(k => k.trim()),
      timestamp: new Date().toISOString()
    };

    onIssueDirective(directive);

    // Reset form
    setTitle('');
    setDescription('');
    setKeywords('');
    setSubmitting(false);
  };

  return (
    <div className="directive-issuer">
      <h3>📜 ISSUE DIRECTIVE</h3>
      <form onSubmit={handleSubmit} className="directive-form">
        <div className="form-group">
          <label htmlFor="directive-title">Directive Title</label>
          <input
            id="directive-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Optimize economic reserves"
            disabled={submitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="directive-desc">Description</label>
          <textarea
            id="directive-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional context for the directive..."
            rows="3"
            disabled={submitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="directive-keywords">Keywords (comma-separated)</label>
          <input
            id="directive-keywords"
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g., vault, economy, treasury"
            disabled={submitting}
          />
        </div>

        <button type="submit" disabled={submitting || !title.trim()} className="btn-issue">
          {submitting ? 'ISSUING...' : 'ISSUE DIRECTIVE'}
        </button>
      </form>
    </div>
  );
}
