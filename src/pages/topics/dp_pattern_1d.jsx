import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function DpPattern1d() {
    const [activeTab, setActiveTab] = useState('dp');

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

                        {/* ── RECURRENCE VISUALIZATION ── */}
                        <div className="recurrence-viz">
                            <div className="recurrence-viz-header">
                                <span>📊</span> Recurrence Visualization — Climbing Stairs (n=5)
                            </div>
                            <div className="recurrence-viz-body">
                                {/* Index labels */}
                                <div className="viz-row">
                                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', minWidth: '36px' }}>idx</span>
                                    {['0','1','2','3','4','5'].map(i => (
                                        <span key={i} className="viz-label">{i}</span>
                                    ))}
                                </div>
                                {/* DP array values */}
                                <div className="viz-row">
                                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', minWidth: '36px' }}>dp</span>
                                    <span className="viz-cell done">1</span>
                                    <span className="viz-cell done">1</span>
                                    <span className="viz-cell done">2</span>
                                    <span className="viz-cell done">3</span>
                                    <span className="viz-cell done">5</span>
                                    <span className="viz-cell active">8</span>
                                </div>
                                {/* Arrow explanation */}
                                <div className="viz-row" style={{ marginTop: '10px', gap: '6px', alignItems: 'center' }}>
                                    <span style={{ fontSize: '11px', color: '#64748b', minWidth: '36px' }}></span>
                                    <span className="viz-cell source" style={{ minWidth: '38px' }}>5</span>
                                    <span className="viz-arrow">+</span>
                                    <span className="viz-cell source" style={{ minWidth: '38px' }}>3</span>
                                    <span className="viz-arrow">=</span>
                                    <span className="viz-cell active" style={{ minWidth: '38px' }}>8</span>
                                    <span style={{ fontSize: '11px', color: '#94a3b8', marginLeft: '8px' }}>dp[i] = dp[i-1] + dp[i-2]</span>
                                </div>
                                <div className="viz-row" style={{ marginTop: '2px', gap: '6px' }}>
                                    <span style={{ minWidth: '36px' }}></span>
                                    <span style={{ fontSize: '10px', color: '#a78bfa', minWidth: '38px', textAlign: 'center' }}>dp[4]</span>
                                    <span style={{ minWidth: '24px' }}></span>
                                    <span style={{ fontSize: '10px', color: '#a78bfa', minWidth: '38px', textAlign: 'center' }}>dp[3]</span>
                                    <span style={{ minWidth: '24px' }}></span>
                                    <span style={{ fontSize: '10px', color: '#fbbf24', minWidth: '38px', textAlign: 'center' }}>dp[5]</span>
                                </div>
                                <div className="viz-note">
                                    🟡 <strong style={{color:'#fbbf24'}}>Yellow</strong> = cell being computed &nbsp;|&nbsp;
                                    🟣 <strong style={{color:'#c084fc'}}>Purple</strong> = source cells used &nbsp;|&nbsp;
                                    🟢 <strong style={{color:'#34d399'}}>Green</strong> = already filled
                                </div>
                            </div>
                        </div>

                        {/* ── SOLUTION TABS ── */}
                        <div className="sol-section-label">Solutions</div>
                        <div className="sol-tabs">
                            <button
                                className={`sol-tab${activeTab === 'dp' ? ' active' : ''}`}
                                onClick={() => setActiveTab('dp')}
                            >
                                🗃️ DP Table — O(n) space
                            </button>
                            <button
                                className={`sol-tab opt${activeTab === 'opt' ? ' active opt' : ''}`}
                                onClick={() => setActiveTab('opt')}
                            >
                                ⚡ Space Optimized — O(1) space
                            </button>
                        </div>
                        <div className="sol-panel">
                            {activeTab === 'dp' ? (
                                <div>
                                    <div className="code-container" style={{ borderRadius: '0', border: 'none' }}>
                                        <div className="code-header">
                                            <div className="dots"><div className="dot red"></div><div className="dot yellow"></div><div className="dot green"></div></div>
                                            <span className="code-lang">python — 1D DP table (climbing stairs)</span>
                                        </div>
                                        <pre>
{`def climbStairs(n):
    # Step 1: dp[i] = number of ways to reach step i
    # Step 2: recurrence — take 1 step OR take 2 steps
    #         dp[i] = dp[i-1] + dp[i-2]
    # Step 3: base cases — dp[0] = 1, dp[1] = 1
    # Step 4: answer location — dp[n]

    dp = [0] * (n + 1)
    dp[0] = 1          # 1 way to stand at ground
    dp[1] = 1          # 1 way to reach step 1

    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]

    return dp[n]

# House Robber variant: dp[i] = max(skip, rob)
def rob(nums):
    n = len(nums)
    if n == 1: return nums[0]
    dp = [0] * n
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])
    for i in range(2, n):
        dp[i] = max(dp[i-1],          # skip house i
                    dp[i-2] + nums[i]) # rob house i
    return dp[n-1]`}
                                        </pre>
                                    </div>
                                    <div className="sol-panel-inner">
                                        <strong>Why this works:</strong> Each cell only depends on the 1–2 cells before it. The table fills strictly left→right, so all dependencies are already solved when we reach index <code>i</code>.
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="code-container" style={{ borderRadius: '0', border: 'none' }}>
                                        <div className="code-header">
                                            <div className="dots"><div className="dot red"></div><div className="dot yellow"></div><div className="dot green"></div></div>
                                            <span className="code-lang">python — space optimized O(1)</span>
                                        </div>
                                        <pre>
{`def climbStairs(n):
    # Step 5: optimize space
    # We only ever need dp[i-1] and dp[i-2].
    # Drop the array — use two rolling variables instead.

    a, b = 1, 1          # a = dp[i-2], b = dp[i-1]
    for _ in range(2, n + 1):
        a, b = b, a + b  # shift window forward
    return b

# House Robber O(1) space:
def rob(nums):
    prev2, prev1 = 0, 0
    for num in nums:
        prev2, prev1 = prev1, max(prev1, prev2 + num)
    return prev1`}
                                        </pre>
                                    </div>
                                    <div className="sol-panel-inner">
                                        <strong>Key Insight:</strong> Because the recurrence only looks back at a <em>fixed window</em> of 2 cells, the entire O(n) array is redundant. We only need to track <code>dp[i-1]</code> and <code>dp[i-2]</code> as two variables that "roll" forward each iteration.
                                        <div className="opt-highlight">
                                            🟢 Space: O(n) → <strong>O(1)</strong> &nbsp;|&nbsp; Time stays O(n) — no trade-off!
                                        </div>
                                    </div>
                                </div>
                            )}
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
