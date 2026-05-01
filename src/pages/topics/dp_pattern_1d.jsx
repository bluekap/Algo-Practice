import React from 'react';
import { Link } from 'react-router-dom';

export default function DpPattern1d() {
    return (
        <div className="topic-page">
            <div className="page-header">
                <Link to="/topics/dp/guide" className="nav-back">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to DP Guide
                </Link>
                <h1>1D DP (Linear State)</h1>
                <p>Signal: single index, linear progression, fixed lookback</p>
            </div>

            <div className="container">
                <div className="section-card">
                    <div className="section-card-header">
                        <span style={{ fontSize: '16px' }}>🪜</span>
                        <h2>Pattern Breakdown</h2>
                    </div>
                    <div className="section-card-body">
                        <div className="mental-model">
                            <strong>Mental Model:</strong> Each cell <code>dp[i]</code> answers: <em>"What is the best answer considering the first i elements?"</em> You only look back at a fixed number of previous states. Think of it as climbing stairs — each step depends on a few steps behind you.
                        </div>
                        <div className="recurrence">
                            <span className="label">5 Steps for 1D DP Framework</span>
                            <ol style={{ margin: '8px 0 0 24px', padding: 0, color: 'var(--text)', fontSize: '15px', lineHeight: '1.6' }}>
                                <li><strong>dp[i] = ?</strong> → define in plain English first</li>
                                <li><strong>recurrence?</strong> → what choices exist at step i?</li>
                                <li><strong>base cases?</strong> → dp[0], dp[1]</li>
                                <li><strong>answer location?</strong> → dp[n-1]? dp[n]? max(dp)?</li>
                                <li><strong>can I optimize space?</strong></li>
                            </ol>
                        </div>
                        <div className="code-container">
                            <div className="code-header">
                                <div className="dots"><div className="dot red"></div><div className="dot yellow"></div><div className="dot green"></div></div>
                                <span className="code-lang">python — 5 steps applied to climbing stairs</span>
                            </div>
                            <pre>
{`def countWays(n):
    # 1. dp[i] = number of ways to reach current ith step
    # 2. recurrence? choices at each step - take 1 step or 2
    # 3. base cases? dp[0] = 1, dp[1] = 1
    # 4. answer location? dp[n]
    
    dp = [0] * (n + 1)
    dp[0] = 1
    dp[1] = 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
        
    return dp[n]

# 5. can I optimize space? (O(1) space):
def countWaysOpt(n):
    a, b = 1, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b`}
                            </pre>
                        </div>
                        
                        <div className="example-box">
                            <h3>
                                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                Example Case: 198. House Robber
                            </h3>
                            <p style={{ marginBottom: '8px' }}><strong>Problem:</strong> Rob houses along a street to maximize money, but you cannot rob adjacent houses.</p>
                            <p><strong>Explanation:</strong> To maximize money at house <code>i</code>, you can either: <br />1. <strong>Skip</strong> this house and take the profit from the previous house: <code>dp[i-1]</code>. <br />2. <strong>Rob</strong> this house, which means you can't rob the previous one, so you take this house's money plus the profit from two houses back: <code>dp[i-2] + nums[i]</code>.<br />Therefore, <code>dp[i] = max(dp[i-1], dp[i-2] + nums[i])</code>.</p>
                        </div>

                        <div style={{ marginTop: '24px', fontSize: '14px', fontWeight: 600, color: 'var(--text-muted-bright)' }}>Essential Problem Set</div>
                        <div className="problems-row">
                            <span className="problem-tag easy">70. Climbing Stairs</span>
                            <span className="problem-tag medium">198. House Robber</span>
                            <span className="problem-tag medium">322. Coin Change</span>
                            <span className="problem-tag medium">139. Word Break</span>
                            <span className="problem-tag medium">300. Longest Increasing Subsequence</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
