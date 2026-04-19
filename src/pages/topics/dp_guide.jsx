import React from 'react';
import { Link } from 'react-router-dom';

const dpPatterns = [
    { title: 'Linear State (1D)', icon: '🪜', path: '/topics/dp/pattern-1d', color: '#fcd34d', signal: 'Single index, linear state' },
    { title: 'Grid DP (2D)', icon: '🗺️', path: '/topics/dp/pattern-2d', color: '#34d399', signal: 'Grid, two strings/sequences' },
    { title: 'Knapsack', icon: '🎒', path: '/topics/dp/pattern-knapsack', color: '#60a5fa', signal: 'Items with weight/value, capacity' },
    { title: 'Subsequences', icon: '🧬', path: '/topics/dp/pattern-subsequence', color: '#c084fc', signal: 'Longest common/increasing subsequence' },
    { title: 'Interval DP', icon: '🔗', path: '/topics/dp/pattern-interval', color: '#f87171', signal: 'Subarray/substring, merge intervals' }
];

export default function DpGuide() {
    return (
        <div className="topic-page">
            <div className="page-header">
                <Link to="/topics/dp" className="nav-back">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Masterclass
                </Link>
                <h1>Dynamic Programming Revision Guide</h1>
                <p>5 core patterns, mental models, recurrences, and templates</p>
            </div>

            <div className="container">
                {/* Decision Framework */}
                <div className="framework-box">
                    <h2>🧭 Pattern Decision Framework</h2>
                    <div className="decision-grid">
                        {dpPatterns.map((pattern, idx) => (
                            <Link key={idx} to={pattern.path} className="decision-item">
                                <div className="signal">Signal: {pattern.signal}</div>
                                <div className="pattern" style={{ color: pattern.color }}>→ {pattern.title}</div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Pattern Deep Dives */}
                <div style={{ marginTop: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <div style={{ height: '1px', flex: 1, background: 'var(--border)' }}></div>
                        <h2 style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Detailed Pattern Masterclasses</h2>
                        <div style={{ height: '1px', flex: 1, background: 'var(--border)' }}></div>
                    </div>
                    
                    <p style={{ textAlign: 'center', color: 'var(--text-muted-bright)', fontSize: '14px', marginBottom: '32px', lineHeight: 1.6 }}>
                        Each pattern now has a dedicated page with deeper intuition, expanded templates, and interactive problem sets.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                        {dpPatterns.map((pattern, idx) => (
                            <Link key={idx} to={pattern.path} className="decision-item" style={{ padding: '16px', borderLeft: `4px solid ${pattern.color}` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontWeight: 700, color: pattern.color }}>{pattern.title}</span>
                                    <span style={{ fontSize: '16px' }}>{pattern.icon}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
