import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CodeBlock from '../../components/CodeBlock';

export default function DpPattern2d() {
    const [activeTab, setActiveTab] = useState('dp');

    return (
        <div className="topic-page">
            <div className="page-header">
                <Link to="/topics/dp/guide" className="nav-back">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to DP Guide
                </Link>
                <h1 style={{ background: 'linear-gradient(135deg, #34d399, #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>2D Grid DP</h1>
                <p>Signal: grid navigation, two independent variables, path discovery</p>
            </div>

            <div className="container">
                <div className="section-card">
                    <div className="section-card-header">
                        <span style={{ fontSize: '16px' }}>🗺️</span>
                        <h2>Pattern Breakdown</h2>
                    </div>
                    <div className="section-card-body">
                        <div className="signals-card" style={{ borderLeftColor: '#34d399' }}>
                            <div className="signals-card-label">🎯 Recognition Signals</div>
                            <div className="signals-pills">
                                <span className="signal-pill">move right or down only</span>
                                <span className="signal-pill">count paths in a grid</span>
                                <span className="signal-pill">min cost from top-left to bottom-right</span>
                                <span className="signal-pill">grid[i][j] built from top + left neighbors</span>
                                <span className="signal-pill">path with obstacles</span>
                            </div>
                        </div>
                        <div className="mental-model">
                            <strong>Mental Model:</strong> <code>dp[i][j]</code> answers: <em>"What is the best answer to reach cell (i, j)?"</em> You can only come from the top or left (for path problems). Fill the table row by row. The answer is always at <code>dp[m-1][n-1]</code>.
                        </div>
                        <div className="recurrence">
                            <span className="label">Unique Paths / Min Path Sum recurrence</span>
                            <span className="hl-green">dp[i][j]</span> = grid[i][j] + min(<span className="hl-blue">dp[i-1][j]</span>, <span className="hl-yellow">dp[i][j-1]</span>)<br />
                            <span className="cm"># base case: first row and first column filled with prefix sums</span>
                        </div>

                        {/* ── RECURRENCE VISUALIZATION ── */}
                        <div className="recurrence-viz">
                            <div className="recurrence-viz-header">
                                <span>📊</span> Recurrence Visualization — Unique Paths (3×4 grid)
                            </div>
                            <div className="recurrence-viz-body">
                                <div className="viz-row">
                                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', minWidth: '50px' }}></span>
                                    {['j=0','j=1','j=2','j=3'].map(h => (
                                        <span key={h} className="viz-label" style={{ minWidth: '52px', textAlign: 'center' }}>{h}</span>
                                    ))}
                                </div>
                                <div className="viz-row">
                                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', minWidth: '50px' }}>i=0</span>
                                    {['1','1','1','1'].map((v,i) => <span key={i} className="viz-cell done" style={{ minWidth: '46px' }}>{v}</span>)}
                                </div>
                                <div className="viz-row">
                                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', minWidth: '50px' }}>i=1</span>
                                    {['1','2','3','4'].map((v,i) => <span key={i} className="viz-cell done" style={{ minWidth: '46px' }}>{v}</span>)}
                                </div>
                                <div className="viz-row">
                                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', minWidth: '50px' }}>i=2</span>
                                    <span className="viz-cell done" style={{ minWidth: '46px' }}>1</span>
                                    <span className="viz-cell done" style={{ minWidth: '46px' }}>3</span>
                                    <span className="viz-cell source" style={{ minWidth: '46px' }}>6↑</span>
                                    <span className="viz-cell active" style={{ minWidth: '46px' }}>10</span>
                                </div>
                                <div className="viz-row" style={{ marginTop: '12px', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>dp[2][3]</span>
                                    <span className="viz-arrow">=</span>
                                    <span className="viz-cell source" style={{ minWidth: '42px' }}>dp[1][3]</span>
                                    <span style={{ fontSize: '11px', color: '#64748b' }}>↑top</span>
                                    <span className="viz-arrow">+</span>
                                    <span className="viz-cell source" style={{ minWidth: '42px' }}>dp[2][2]</span>
                                    <span style={{ fontSize: '11px', color: '#64748b' }}>←left</span>
                                    <span className="viz-arrow">=</span>
                                    <span className="viz-cell active" style={{ minWidth: '42px' }}>4+6=10</span>
                                </div>
                                <div className="viz-note">
                                    🟡 <strong style={{color:'#fbbf24'}}>Yellow</strong> = cell being computed &nbsp;|&nbsp;
                                    🟣 <strong style={{color:'#c084fc'}}>Purple</strong> = sources (top + left) &nbsp;|&nbsp;
                                    🟢 <strong style={{color:'#34d399'}}>Green</strong> = already filled &nbsp;|&nbsp;
                                    Fill: <strong style={{color:'#a78bfa'}}>row-by-row →</strong>
                                </div>
                            </div>
                        </div>

                        <div className="complexity-strip">
                            <span className="complexity-strip-label">Complexity</span>
                            <span className="complexity-badge time">⏱ Time: O(m×n)</span>
                            <span className="complexity-badge space">💾 Space: O(m×n)</span>
                            <span className="complexity-badge opt">⚡ Optimized: O(n) one row</span>
                        </div>
                        {/* ── SOLUTION TABS ── */}
                        <div className="sol-section-label">Solutions</div>
                        <div className="sol-tabs">
                            <button className={`sol-tab${activeTab === 'dp' ? ' active' : ''}`} onClick={() => setActiveTab('dp')}>
                                🗃️ DP Table — O(m×n) space
                            </button>
                            <button className={`sol-tab opt${activeTab === 'opt' ? ' active opt' : ''}`} onClick={() => setActiveTab('opt')}>
                                ⚡ Space Optimized — O(n) space
                            </button>
                        </div>
                        <div className="sol-panel">
                            {activeTab === 'dp' ? (
                                <div>
                                    <CodeBlock 
                                        language="python"
                                        title="python — full 2D DP table"
                                        code={`def uniquePaths(m, n):
    dp = [[0] * n for _ in range(m)]
    for j in range(n): dp[0][j] = 1  # base: first row
    for i in range(m): dp[i][0] = 1  # base: first col
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
    return dp[m-1][n-1]

def minPathSum(grid):
    m, n = len(grid), len(grid[0])
    dp = [[0]*n for _ in range(m)]
    dp[0][0] = grid[0][0]
    for i in range(1, m): dp[i][0] = dp[i-1][0] + grid[i][0]
    for j in range(1, n): dp[0][j] = dp[0][j-1] + grid[0][j]
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])
    return dp[m-1][n-1]`} 
                                    />
                                    <div className="sol-panel-inner">
                                        <strong>Why this works:</strong> Every cell <code>(i,j)</code> only depends on <code>(i-1,j)</code> above and <code>(i,j-1)</code> to the left. Filling row-by-row guarantees both are already solved.
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <CodeBlock 
                                        language="python"
                                        title="python — 1D rolling row O(n) space"
                                        code={`def uniquePaths(m, n):
    # Only need ONE row at a time — overwrite in place.
    # dp[j] starts as prev-row value (from above),
    # then gets updated to current row's value.
    dp = [1] * n           # base case: row 0 all 1s
    for i in range(1, m):
        for j in range(1, n):
            dp[j] += dp[j-1]
            # dp[j]   = old value = dp[i-1][j]  (from top)
            # dp[j-1] = new value = dp[i][j-1]  (from left)
    return dp[n-1]

def minPathSum(grid):
    m, n = len(grid), len(grid[0])
    dp = grid[0][:]
    for j in range(1, n): dp[j] += dp[j-1]
    for i in range(1, m):
        dp[0] += grid[i][0]
        for j in range(1, n):
            dp[j] = grid[i][j] + min(dp[j], dp[j-1])
    return dp[n-1]`} 
                                    />
                                    <div className="sol-panel-inner">
                                        <strong>Key Insight:</strong> When processing row <code>i</code>, row <code>i-1</code> is the only prior row needed. We can overwrite it in-place — <code>dp[j]</code> holds the old (top) value until we update it.
                                        <div className="opt-highlight">🟢 Space: O(m×n) → <strong>O(n)</strong> — only keep one row in memory</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="pitfalls-card">
                            <div className="pitfalls-header">Common Pitfalls</div>
                            <div className="pitfall-item">Initialize the entire first row AND first column — <code>dp[0][0]</code> alone is not enough. Miss one and edge cells return wrong values.</div>
                            <div className="pitfall-item">The main double loop starts at <code>(1,1)</code> — <code>dp[0][j]</code> and <code>dp[i][0]</code> are your base cases, set them separately beforehand.</div>
                            <div className="pitfall-item">In the 1D rolling-row, <code>dp[j] += dp[j-1]</code> overwrites in-place. Verify that the old (top) value is read before being overwritten by the left update.</div>
                        </div>
                        <div className="example-box">
                            <h3>
                                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                Example Case: 62. Unique Paths
                            </h3>
                            <p style={{ marginBottom: '8px' }}><strong>Problem:</strong> Find the number of unique paths from top-left to bottom-right of an <code>m x n</code> grid, moving only down or right.</p>
                            <p><strong>Explanation:</strong> To reach any cell <code>(i, j)</code>, you can only come from <code>(i-1, j)</code> or <code>(i, j-1)</code>. Total paths = sum of paths from those two cells: <code>dp[i][j] = dp[i-1][j] + dp[i][j-1]</code>.</p>
                        </div>

                        <div style={{ marginTop: '24px', fontSize: '14px', fontWeight: 600, color: 'var(--text-muted-bright)' }}>Essential Problem Set</div>
                        <div className="problems-row">
                            <span className="problem-tag medium">62. Unique Paths</span>
                            <span className="problem-tag medium">64. Minimum Path Sum</span>
                            <span className="problem-tag medium">221. Maximal Square</span>
                            <span className="problem-tag hard">85. Maximal Rectangle</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
