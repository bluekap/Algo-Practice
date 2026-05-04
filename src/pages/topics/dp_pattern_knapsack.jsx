import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CodeBlock from '../../components/CodeBlock';

export default function DpPatternKnapsack() {
    const [activeTab, setActiveTab] = useState('dp');

    return (
        <div className="topic-page">
            <div className="page-header">
                <Link to="/topics/dp/guide" className="nav-back">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to DP Guide
                </Link>
                <h1 style={{ background: 'linear-gradient(135deg, #60a5fa, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Knapsack DP</h1>
                <p>Signal: binary selection, finite resources, bounded optimization</p>
            </div>

            <div className="container">
                <div className="section-card">
                    <div className="section-card-header">
                        <span style={{ fontSize: '16px' }}>🎒</span>
                        <h2>Pattern Breakdown</h2>
                    </div>
                    <div className="section-card-body">
                        <div className="signals-card" style={{ borderLeftColor: '#60a5fa' }}>
                            <div className="signals-card-label">🎯 Recognition Signals</div>
                            <div className="signals-pills">
                                <span className="signal-pill">take or skip each item</span>
                                <span className="signal-pill">limited capacity / budget</span>
                                <span className="signal-pill">subset sum / equal partition</span>
                                <span className="signal-pill">0/1 binary choice per element</span>
                                <span className="signal-pill">maximize value under constraint</span>
                            </div>
                        </div>
                        <div className="mental-model">
                            <strong>Mental Model:</strong> For each item, you make a binary choice: <em>take it or leave it.</em> <code>dp[i][w]</code> = max value using first <code>i</code> items with capacity <code>w</code>. The key insight: if you take item <code>i</code>, you use up <code>weight[i]</code> capacity, so you look back at <code>dp[i-1][w - weight[i]]</code>.
                        </div>
                        <div className="recurrence">
                            <span className="label">0/1 Knapsack recurrence</span>
                            <span className="hl-blue">dp[i][w]</span> = max(<span className="hl-yellow">dp[i-1][w]</span>,  <span className="cm"># skip item i</span><br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="hl-green">dp[i-1][w - wt[i]]</span> + val[i])  <span className="cm"># take item i</span>
                        </div>

                        {/* ── RECURRENCE VISUALIZATION ── */}
                        <div className="recurrence-viz">
                            <div className="recurrence-viz-header">
                                <span>📊</span> Recurrence Visualization — 3 items, capacity W=4
                            </div>
                            <div className="recurrence-viz-body">
                                {/* items: wt=[2,3,1] val=[3,4,2] */}
                                <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '8px' }}>
                                    Items: item1(wt=2,val=3), item2(wt=3,val=4), item3(wt=1,val=2) &nbsp;|&nbsp; Capacity W=4
                                </div>
                                {/* Header */}
                                <div className="viz-row">
                                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', minWidth: '58px' }}></span>
                                    {['w=0','w=1','w=2','w=3','w=4'].map(h => (
                                        <span key={h} className="viz-label" style={{ minWidth: '46px' }}>{h}</span>
                                    ))}
                                </div>
                                {/* Row 0: no items */}
                                <div className="viz-row">
                                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', minWidth: '58px' }}>i=0 (∅)</span>
                                    {[0,0,0,0,0].map((v,i) => <span key={i} className="viz-cell done" style={{ minWidth: '40px' }}>{v}</span>)}
                                </div>
                                {/* Row 1: item1 wt=2 val=3 */}
                                <div className="viz-row">
                                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', minWidth: '58px' }}>i=1 (2,3)</span>
                                    <span className="viz-cell done" style={{ minWidth: '40px' }}>0</span>
                                    <span className="viz-cell done" style={{ minWidth: '40px' }}>0</span>
                                    <span className="viz-cell done" style={{ minWidth: '40px' }}>3</span>
                                    <span className="viz-cell done" style={{ minWidth: '40px' }}>3</span>
                                    <span className="viz-cell done" style={{ minWidth: '40px' }}>3</span>
                                </div>
                                {/* Row 2: item2 wt=3 val=4 */}
                                <div className="viz-row">
                                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', minWidth: '58px' }}>i=2 (3,4)</span>
                                    <span className="viz-cell done" style={{ minWidth: '40px' }}>0</span>
                                    <span className="viz-cell done" style={{ minWidth: '40px' }}>0</span>
                                    <span className="viz-cell done" style={{ minWidth: '40px' }}>3</span>
                                    <span className="viz-cell source" style={{ minWidth: '40px' }}>4</span>
                                    <span className="viz-cell active" style={{ minWidth: '40px' }}>7</span>
                                </div>
                                {/* Annotation */}
                                <div className="viz-row" style={{ marginTop: '12px', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>dp[2][4]:</span>
                                    <span style={{ fontSize: '11px', color: '#64748b' }}>skip→</span>
                                    <span className="viz-cell done" style={{ minWidth: '42px' }}>dp[1][4]=3</span>
                                    <span className="viz-arrow">vs</span>
                                    <span style={{ fontSize: '11px', color: '#64748b' }}>take→</span>
                                    <span className="viz-cell source" style={{ minWidth: '54px' }}>dp[1][4-3]=3</span>
                                    <span className="viz-arrow">+4</span>
                                    <span className="viz-arrow">=</span>
                                    <span className="viz-cell active" style={{ minWidth: '38px' }}>7 ✓</span>
                                </div>
                                <div className="viz-note">
                                    🟡 <strong style={{color:'#fbbf24'}}>Yellow</strong> = current cell &nbsp;|&nbsp;
                                    🟣 <strong style={{color:'#c084fc'}}>Purple</strong> = take-item source (w - wt) &nbsp;|&nbsp;
                                    🟢 <strong style={{color:'#34d399'}}>Green</strong> = filled &nbsp;|&nbsp;
                                    Fill: <strong style={{color:'#a78bfa'}}>item by item, left→right</strong>
                                </div>
                            </div>
                        </div>

                        <div className="complexity-strip">
                            <span className="complexity-strip-label">Complexity</span>
                            <span className="complexity-badge time">⏱ Time: O(n×W)</span>
                            <span className="complexity-badge space">💾 Space: O(n×W)</span>
                            <span className="complexity-badge opt">⚡ Optimized: O(W) reversed</span>
                        </div>
                        {/* ── SOLUTION TABS ── */}
                        <div className="sol-section-label">Solutions</div>
                        <div className="sol-tabs">
                            <button className={`sol-tab${activeTab === 'dp' ? ' active' : ''}`} onClick={() => setActiveTab('dp')}>
                                🗃️ DP Table — O(n×W) space
                            </button>
                            <button className={`sol-tab opt${activeTab === 'opt' ? ' active opt' : ''}`} onClick={() => setActiveTab('opt')}>
                                ⚡ Space Optimized — O(W) space
                            </button>
                        </div>
                        <div className="sol-panel">
                            {activeTab === 'dp' ? (
                                <div>
                                    <CodeBlock 
                                        language="python"
                                        title="python — 0/1 knapsack full 2D table"
                                        code={`def knapsack(weights, values, capacity):
    n = len(weights)
    # dp[i][w] = max value using first i items, capacity w
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(capacity + 1):
            # Choice 1: skip item i
            dp[i][w] = dp[i-1][w]
            # Choice 2: take item i (if it fits)
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w],
                    dp[i-1][w - weights[i-1]] + values[i-1])

    return dp[n][capacity]

# Partition Equal Subset Sum (0/1 knapsack variant):
def canPartition(nums):
    total = sum(nums)
    if total % 2: return False
    target = total // 2
    dp = [[False]*(target+1) for _ in range(len(nums)+1)]
    for i in range(len(nums)+1): dp[i][0] = True
    for i in range(1, len(nums)+1):
        for w in range(1, target+1):
            dp[i][w] = dp[i-1][w]
            if nums[i-1] <= w:
                dp[i][w] = dp[i][w] or dp[i-1][w - nums[i-1]]
    return dp[len(nums)][target]`} 
                                    />
                                    <div className="sol-panel-inner">
                                        <strong>Why this works:</strong> Row <code>i</code> is built entirely from row <code>i-1</code> (the previous item). We never modify earlier rows — every skip/take decision is independent per item.
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <CodeBlock 
                                        language="python"
                                        title="python — 1D reverse traversal O(W) space"
                                        code={`def knapsack(weights, values, capacity):
    # Collapse 2D table to 1D by processing w RIGHT-TO-LEFT.
    # Why reverse? If we went left→right, dp[w - wt] would
    # already be updated for item i, letting us "take" the
    # same item twice (unbounded knapsack bug!).
    # Going right→left ensures dp[w - wt] is still item i-1's value.

    dp = [0] * (capacity + 1)

    for i in range(len(weights)):
        for w in range(capacity, weights[i] - 1, -1):  # ← reverse!
            dp[w] = max(dp[w],
                        dp[w - weights[i]] + values[i])

    return dp[capacity]

# Unbounded knapsack (item reuse OK) — go LEFT-TO-RIGHT:
def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for w in range(coin, amount + 1):  # ← forward, reuse allowed
            dp[w] = min(dp[w], dp[w - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`} 
                                    />
                                    <div className="sol-panel-inner">
                                        <strong>Critical Insight — Reverse Traversal:</strong> In 0/1 knapsack, each item can only be used once. If we updated <code>dp[w]</code> left-to-right, then when computing <code>dp[w]</code>, <code>dp[w - wt]</code> would already reflect item <code>i</code> being added — allowing it to be "taken twice." Going <strong>right-to-left</strong> guarantees we always read from the <em>previous item's</em> state.
                                        <div className="opt-highlight">🟢 Space: O(n×W) → <strong>O(W)</strong> &nbsp;|&nbsp; 0/1 = reverse loop &nbsp;|&nbsp; Unbounded = forward loop</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="pitfalls-card">
                            <div className="pitfalls-header">Common Pitfalls</div>
                            <div className="pitfall-item">0/1 inner loop = <code>range(W, wt-1, -1)</code> (reverse). Unbounded = <code>range(wt, W+1)</code> (forward). Mixing them lets items be reused incorrectly.</div>
                            <div className="pitfall-item">Always check <code>weights[i] &lt;= w</code> before reading <code>dp[w - weights[i]]</code> — a negative index silently wraps around in Python, causing subtle bugs.</div>
                            <div className="pitfall-item">In the 1D version, the array reflects the previous item's row. It's safe to read <code>dp[w - wt]</code> only because the reverse loop hasn't overwritten that position yet.</div>
                        </div>
                        <div className="example-box">
                            <h3>
                                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                Example Case: 416. Partition Equal Subset Sum
                            </h3>
                            <p style={{ marginBottom: '8px' }}><strong>Problem:</strong> Determine if an array can be partitioned into two subsets with equal sum.</p>
                            <p><strong>Explanation:</strong> This is a 0/1 Knapsack problem where the capacity is <code>sum / 2</code>. You want to know if a subset of elements adds up exactly to this target. <code>dp[w] = dp[w] or dp[w - num]</code>.</p>
                        </div>

                        <div style={{ marginTop: '24px', fontSize: '14px', fontWeight: 600, color: 'var(--text-muted-bright)' }}>Essential Problem Set</div>
                        <div className="problems-row">
                            <span className="problem-tag medium">322. Coin Change</span>
                            <span className="problem-tag medium">416. Partition Equal Subset Sum</span>
                            <span className="problem-tag medium">518. Coin Change II</span>
                            <span className="problem-tag hard">474. Ones and Zeroes</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
