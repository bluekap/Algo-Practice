import React from 'react';
import { Link } from 'react-router-dom';

export default function DpPattern2d() {
    return (
        <div className="topic-page">
            <div className="page-header">
                <Link to="/topics/dp/guide" className="nav-back">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to DP Guide
                </Link>
                <h1>2D Grid DP</h1>
                <p>Signal: grid navigation, two independent variables, path discovery</p>
            </div>

            <div className="container">
                <div className="section-card">
                    <div className="section-card-header">
                        <span style={{ fontSize: '16px' }}>🗺️</span>
                        <h2>Pattern Breakdown</h2>
                    </div>
                    <div className="section-card-body">
                        <div className="mental-model">
                            <strong>Mental Model:</strong> <code>dp[i][j]</code> answers: <em>"What is the best answer to reach cell (i, j)?"</em> You can only come from the top or left (for path problems). Fill the table row by row. The answer is always at <code>dp[m-1][n-1]</code>.
                        </div>
                        <div className="recurrence">
                            <span className="label">Unique Paths / Min Path Sum recurrence</span>
                            <span className="hl-green">dp[i][j]</span> = grid[i][j] + min(<span className="hl-blue">dp[i-1][j]</span>, <span className="hl-yellow">dp[i][j-1]</span>)<br />
                            <span className="cm"># base case: first row and first column filled with prefix sums</span>
                        </div>
                        <div className="code-container">
                            <div className="code-header">
                                <div className="dots"><div className="dot red"></div><div className="dot yellow"></div><div className="dot green"></div></div>
                                <span className="code-lang">python — min path sum template</span>
                            </div>
                            <pre>
{`def minPathSum(grid):
    m, n = len(grid), len(grid[0])
    dp = [[0]*n for _ in range(m)]
    dp[0][0] = grid[0][0]
    for i in range(1, m): dp[i][0] = dp[i-1][0] + grid[i][0]
    for j in range(1, n): dp[0][j] = dp[0][j-1] + grid[0][j]
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])
    return dp[m-1][n-1]`}
                            </pre>
                        </div>
                        
                        <div className="example-box">
                            <h3>
                                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                Example Case: 62. Unique Paths
                            </h3>
                            <p style={{ marginBottom: '8px' }}><strong>Problem:</strong> Find the number of unique paths from top-left to bottom-right of an <code>m x n</code> grid, moving only down or right.</p>
                            <p><strong>Explanation:</strong> To reach any cell <code>(i, j)</code>, you can only come from the cell directly above it <code>(i-1, j)</code> or the cell directly to its left <code>(i, j-1)</code>. The total paths to reach <code>(i, j)</code> is exactly the sum of the paths to those two preceding cells. Thus, <code>dp[i][j] = dp[i-1][j] + dp[i][j-1]</code>.</p>
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
