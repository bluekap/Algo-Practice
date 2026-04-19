import React from 'react';
import { Link } from 'react-router-dom';

export default function DpPatternLcsLis() {
    return (
        <div className="topic-page">
            <div className="page-header">
                <Link to="/topics/dp/guide" className="nav-back">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to DP Guide
                </Link>
                <h1>LCS / LIS (Subsequence DP)</h1>
                <p>Signal: non-contiguous order, pattern matching, longest valid sequence</p>
            </div>

            <div className="container">
                <div className="section-card">
                    <div className="section-card-header">
                        <span style={{ fontSize: '16px' }}>🧬</span>
                        <h2>Pattern Breakdown</h2>
                    </div>
                    <div className="section-card-body">
                        <div className="mental-model">
                            <strong>Mental Model (LCS):</strong> <code>dp[i][j]</code> = length of LCS of <code>s1[:i]</code> and <code>s2[:j]</code>. If characters match, extend the diagonal. If not, take the best of skipping one character from either string.<br /><br />
                            <strong>Mental Model (LIS):</strong> <code>dp[i]</code> = length of LIS ending at index <code>i</code>. For each <code>i</code>, scan all <code>j &lt; i</code> where <code>nums[j] &lt; nums[i]</code> and extend.
                        </div>
                        <div className="recurrence">
                            <span className="label">LCS recurrence</span>
                            <span className="kw">if</span> s1[i-1] == s2[j-1]: <span className="hl-purple">dp[i][j]</span> = <span className="hl-blue">dp[i-1][j-1]</span> + 1<br />
                            <span className="kw">else</span>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="hl-purple">dp[i][j]</span> = max(<span className="hl-yellow">dp[i-1][j]</span>, <span className="hl-green">dp[i][j-1]</span>)
                        </div>
                        <div className="code-container">
                            <div className="code-header">
                                <div className="dots"><div className="dot red"></div><div className="dot yellow"></div><div className="dot green"></div></div>
                                <span className="code-lang">python — LCS + LIS templates</span>
                            </div>
                            <pre>
{`def lcs(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(1, m+1):
        for j in range(1, n+1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]

def lis(nums):  # O(n^2) — easy to remember
    n = len(nums)
    dp = [1] * n
    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)`}
                            </pre>
                        </div>
                        
                        <div className="example-box">
                            <h3>
                                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                Example Case: 300. Longest Increasing Subsequence
                            </h3>
                            <p style={{ marginBottom: '8px' }}><strong>Problem:</strong> Return the length of the longest strictly increasing subsequence.</p>
                            <p><strong>Explanation:</strong> Let <code>dp[i]</code> be the max LIS ending exactly at index <code>i</code>. Initialize <code>dp = [1, 1, ..., 1]</code>. For every <code>i</code>, scan preceding <code>j</code>. If <code>nums[j] &lt; nums[i]</code>, <code>dp[i] = max(dp[i], dp[j] + 1)</code>.</p>
                        </div>

                        <div style={{ marginTop: '24px', fontSize: '14px', fontWeight: 600, color: 'var(--text-muted-bright)' }}>Essential Problem Set</div>
                        <div className="problems-row">
                            <span className="problem-tag medium">1143. Longest Common Subsequence</span>
                            <span className="problem-tag medium">300. Longest Increasing Subsequence</span>
                            <span className="problem-tag medium">72. Edit Distance</span>
                            <span className="problem-tag hard">115. Distinct Subsequences</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
