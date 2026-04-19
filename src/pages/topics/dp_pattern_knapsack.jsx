import React from 'react';
import { Link } from 'react-router-dom';

export default function DpPatternKnapsack() {
    return (
        <div className="topic-page">
            <div className="page-header">
                <Link to="/topics/dp/guide" className="nav-back">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to DP Guide
                </Link>
                <h1>Knapsack DP</h1>
                <p>Signal: binary selection, finite resources, bounded optimization</p>
            </div>

            <div className="container">
                <div className="section-card">
                    <div className="section-card-header">
                        <span style={{ fontSize: '16px' }}>🎒</span>
                        <h2>Pattern Breakdown</h2>
                    </div>
                    <div className="section-card-body">
                        <div className="mental-model">
                            <strong>Mental Model:</strong> For each item, you make a binary choice: <em>take it or leave it.</em> <code>dp[i][w]</code> = max value using first <code>i</code> items with capacity <code>w</code>. The key insight: if you take item <code>i</code>, you use up <code>weight[i]</code> capacity, so you look back at <code>dp[i-1][w - weight[i]]</code>.
                        </div>
                        <div className="recurrence">
                            <span className="label">0/1 Knapsack recurrence</span>
                            <span className="hl-blue">dp[i][w]</span> = max(<span className="hl-yellow">dp[i-1][w]</span>,  <span className="cm"># skip item i</span><br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="hl-green">dp[i-1][w - wt[i]]</span> + val[i])  <span className="cm"># take item i</span>
                        </div>
                        <div className="code-container">
                            <div className="code-header">
                                <div className="dots"><div className="dot red"></div><div className="dot yellow"></div><div className="dot green"></div></div>
                                <span className="code-lang">python — 0/1 knapsack template</span>
                            </div>
                            <pre>
{`def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            dp[i][w] = dp[i-1][w]  # skip
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w],
                    dp[i-1][w - weights[i-1]] + values[i-1])
    return dp[n][capacity]

# Coin Change variant (unbounded — item reuse allowed):
def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for w in range(coin, amount + 1):
            dp[w] = min(dp[w], dp[w - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`}
                            </pre>
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
