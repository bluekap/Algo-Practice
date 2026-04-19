import React from 'react';
import { Link } from 'react-router-dom';

export default function DpPatternInterval() {
    return (
        <div className="topic-page">
            <div className="page-header">
                <Link to="/topics/dp/guide" className="nav-back">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to DP Guide
                </Link>
                <h1>Interval DP</h1>
                <p>Signal: subarray/substring ranges, merge costs, optimal subdivision</p>
            </div>

            <div className="container">
                <div className="section-card">
                    <div className="section-card-header">
                        <span style={{ fontSize: '16px' }}>🔗</span>
                        <h2>Pattern Breakdown</h2>
                    </div>
                    <div className="section-card-body">
                        <div className="mental-model">
                            <strong>Mental Model:</strong> <code>dp[i][j]</code> = best answer for the subproblem on the range <code>[i, j]</code>. You iterate by <em>length</em> of the interval (from small to large), and for each interval you try every possible split point <code>k</code>.
                        </div>
                        <div className="recurrence">
                            <span className="label">Interval DP recurrence (e.g. Matrix Chain / Burst Balloons)</span>
                            <span className="hl-red">dp[i][j]</span> = min/max over all k in [i, j-1]:<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="hl-yellow">dp[i][k]</span> + <span className="hl-green">dp[k+1][j]</span> + cost(i, k, j)
                        </div>
                        <div className="code-container">
                            <div className="code-header">
                                <div className="dots"><div className="dot red"></div><div className="dot yellow"></div><div className="dot green"></div></div>
                                <span className="code-lang">python — interval DP template (burst balloons)</span>
                            </div>
                            <pre>
{`def maxCoins(nums):
    nums = [1] + nums + [1]  # pad boundaries
    n = len(nums)
    dp = [[0] * n for _ in range(n)]

    for length in range(2, n):       # interval length
        for i in range(0, n - length):  # left boundary
            j = i + length               # right boundary
            for k in range(i+1, j):     # last balloon to burst
                coins = nums[i] * nums[k] * nums[j]
                dp[i][j] = max(dp[i][j],
                    dp[i][k] + dp[k][j] + coins)
    return dp[0][n-1]`}
                            </pre>
                        </div>
                        
                        <div className="example-box">
                            <h3>
                                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                Example Case: 516. Longest Palindromic Subsequence
                            </h3>
                            <p style={{ marginBottom: '8px' }}><strong>Problem:</strong> Return the length of the longest palindromic subsequence.</p>
                            <p><strong>Explanation:</strong> Let <code>dp[i][j]</code> be LPS in <code>s[i:j]</code>. If <code>s[i] == s[j]</code>, <code>dp[i][j] = dp[i+1][j-1] + 2</code>. Else, <code>dp[i][j] = max(dp[i+1][j], dp[i][j-1])</code>.</p>
                        </div>

                        <div style={{ marginTop: '24px', fontSize: '14px', fontWeight: 600, color: 'var(--text-muted-bright)' }}>Essential Problem Set</div>
                        <div className="problems-row">
                            <span className="problem-tag hard">312. Burst Balloons</span>
                            <span className="problem-tag medium">516. Longest Palindromic Subsequence</span>
                            <span className="problem-tag medium">647. Palindromic Substrings</span>
                            <span className="problem-tag hard">1000. Minimum Cost to Merge Stones</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
