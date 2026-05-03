import React from 'react';
import { Link } from 'react-router-dom';

const dpPatterns = [
    { title: 'Linear State (1D)', icon: '🪜', path: '/topics/dp/pattern-1d', color: '#fcd34d', signal: 'Single index, fixed lookback, linear progression', complexity: 'Time O(n) · Space O(1)–O(n)' },
    { title: 'Grid DP (2D)', icon: '🗺️', path: '/topics/dp/pattern-2d', color: '#34d399', signal: 'Grid navigation, two strings/sequences, path discovery', complexity: 'Time O(m×n) · Space O(n)' },
    { title: 'Knapsack', icon: '🎒', path: '/topics/dp/pattern-knapsack', color: '#60a5fa', signal: 'Items with weight/value, limited capacity, binary choice', complexity: 'Time O(n×W) · Space O(W)' },
    { title: 'Subsequences', icon: '🧬', path: '/topics/dp/pattern-subsequence', color: '#c084fc', signal: 'Longest common/increasing, non-contiguous matching', complexity: 'LCS O(m×n) · LIS O(n log n)' },
    { title: 'Interval DP', icon: '🔗', path: '/topics/dp/pattern-interval', color: '#f87171', signal: 'Subarray/substring ranges, merge costs, optimal split', complexity: 'Time O(n³) · Space O(n²)' },
];

const attackSteps = [
    { label: 'Recognize DP', desc: 'Look for optimal substructure + overlapping subproblems. Can brute-force be memoized? Are you asked for min/max/count?' },
    { label: 'Define dp[i] in English', desc: 'Before any code — write one sentence: "dp[i] = the maximum profit considering the first i items." This sentence IS the solution.' },
    { label: 'Write the recurrence', desc: 'What choices exist at state i? Express dp[i] in terms of smaller subproblems. Usually 2–3 choices (take/skip, match/skip, move right/down).' },
    { label: 'Set base cases + answer location', desc: 'Initialize dp[0], dp[1] or dp[i][0] etc. Decide: is the answer dp[n], dp[n-1], or max(dp)?' },
    { label: 'Optimize space', desc: 'If dp[i] only needs the last k rows/values, replace the array with rolling variables or a single row.' },
];

const dpKeywords = [
    { text: 'maximum / minimum', type: '' },
    { text: 'count ways', type: 'green' },
    { text: 'longest / shortest', type: '' },
    { text: 'can you reach', type: 'blue' },
    { text: 'fewest steps', type: 'blue' },
    { text: 'total combinations', type: 'green' },
    { text: 'is it possible', type: 'blue' },
    { text: 'optimal strategy', type: '' },
    { text: 'partition / split', type: 'red' },
    { text: 'select items', type: 'red' },
    { text: 'subsequence', type: '' },
    { text: 'non-adjacent', type: 'red' },
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

                {/* ── 5-STEP ATTACK PLAN ── */}
                <div className="dp-hero">
                    <div className="dp-hero-title">⚔️ Universal DP Attack Plan</div>
                    <div className="attack-plan">
                        {attackSteps.map((step, i) => (
                            <div key={i} className="attack-step">
                                <div className="attack-step-num">{i + 1}</div>
                                <div className="attack-step-content">
                                    <strong>{step.label}</strong>
                                    <span>{step.desc}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── RECOGNITION KEYWORDS ── */}
                <div className="section-card" style={{ marginBottom: '14px' }}>
                    <div className="section-card-header">
                        <span style={{ fontSize: '16px' }}>🔍</span>
                        <h2 style={{ color: '#a78bfa' }}>Keywords That Signal DP</h2>
                    </div>
                    <div className="section-card-body">
                        <p style={{ fontSize: '13px', color: '#475569', marginBottom: '12px' }}>
                            When you see these words in a problem statement, immediately think DP. They indicate that an optimal substructure exists and brute-force enumeration would be exponential.
                        </p>
                        <div className="keyword-cloud">
                            {dpKeywords.map((kw, i) => (
                                <span key={i} className={`keyword-pill ${kw.type}`}>{kw.text}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── 3 SIGNALS ── */}
                <div className="section-card" style={{ marginBottom: '14px' }}>
                    <div className="section-card-header">
                        <span style={{ fontSize: '16px' }}>✅</span>
                        <h2 style={{ color: '#34d399' }}>3 Signals This Is DP</h2>
                    </div>
                    <div className="section-card-body">
                        <div className="three-signals-grid">
                            <div className="signal-check-item">
                                <div className="signal-check-icon">🔁</div>
                                <div className="signal-check-title">Overlapping Subproblems</div>
                                <div className="signal-check-desc">The same sub-computation is needed multiple times. Recursion without memoization would recalculate it exponentially.</div>
                            </div>
                            <div className="signal-check-item">
                                <div className="signal-check-icon">🏆</div>
                                <div className="signal-check-title">Optimal Substructure</div>
                                <div className="signal-check-desc">The optimal solution to the big problem can be built from optimal solutions to smaller sub-problems.</div>
                            </div>
                            <div className="signal-check-item">
                                <div className="signal-check-icon">🎛️</div>
                                <div className="signal-check-title">Countable Choices</div>
                                <div className="signal-check-desc">At each state, you have a small fixed set of decisions (take/skip, match/advance, split here). Not an infinite search space.</div>
                            </div>
                        </div>
                        <div className="recurrence" style={{ marginBottom: 0 }}>
                            <span className="label">Quick Check — Ask Yourself</span>
                            <span style={{ color: '#a78bfa' }}>1.</span> Can I define a subproblem that has a smaller input size? &nbsp;
                            <span style={{ color: '#a78bfa' }}>2.</span> Can I express the answer in terms of that subproblem? &nbsp;
                            <span style={{ color: '#a78bfa' }}>3.</span> Are there only 2–4 choices at each step?
                            <br />If yes to all three → <strong style={{ color: '#34d399' }}>it's almost certainly DP.</strong>
                        </div>
                    </div>
                </div>

                {/* ── PATTERN CARDS ── */}

                <div style={{ marginTop: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <div style={{ height: '1px', flex: 1, background: 'var(--border)' }}></div>
                        <h2 style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Detailed Pattern Masterclasses</h2>
                        <div style={{ height: '1px', flex: 1, background: 'var(--border)' }}></div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                        {dpPatterns.map((p, i) => (
                            <Link key={i} to={p.path} className="guide-pattern-card" style={{ borderTop: `2px solid ${p.color}33`, borderLeft: `2px solid ${p.color}22` }}>
                                <span className="card-icon">{p.icon}</span>
                                <div className="card-title" style={{ color: p.color }}>{p.title}</div>
                                <div className="card-signal">{p.signal}</div>
                                <div className="card-complexity">{p.complexity}</div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
