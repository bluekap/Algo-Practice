import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function DpPatternLcsLis() {
    const [activeTab, setActiveTab] = useState('dp');

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

                        {/* ── RECURRENCE VISUALIZATION ── */}
                        <div className="recurrence-viz">
                            <div className="recurrence-viz-header">
                                <span>📊</span> Recurrence Visualization — LCS("ABCD", "ACBD")
                            </div>
                            <div className="recurrence-viz-body">
                                <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '8px' }}>
                                    s1 = "ABCD" &nbsp;|&nbsp; s2 = "ACBD" &nbsp;|&nbsp; LCS = "ABD" (length 3)
                                </div>

                                {/* Column headers */}
                                <div className="viz-row">
                                    <span style={{ minWidth: '60px', fontSize: '10px', color: 'var(--text-muted)' }}></span>
                                    {['""','A','C','B','D'].map((h,i) => (
                                        <span key={i} className="viz-label" style={{ minWidth: '44px' }}>{h}</span>
                                    ))}
                                </div>

                                {/* Grid rows */}
                                {[
                                    { row: '""', vals: ['0','0','0','0','0'], types: ['done','done','done','done','done'] },
                                    { row: 'A',  vals: ['0','1','1','1','1'], types: ['done','done','done','done','done'] },
                                    { row: 'B',  vals: ['0','1','1','2','2'], types: ['done','done','done','done','done'] },
                                    { row: 'C',  vals: ['0','1','2','2','2'], types: ['done','done','source','source','source'] },
                                    { row: 'D',  vals: ['0','1','2','2','3'], types: ['done','done','done','done','active'] },
                                ].map((r, ri) => (
                                    <div key={ri} className="viz-row">
                                        <span style={{ fontSize: '11px', color: 'var(--text-muted-bright)', minWidth: '60px', fontWeight: 600 }}>{r.row}</span>
                                        {r.vals.map((v, ci) => (
                                            <span key={ci} className={`viz-cell ${r.types[ci]}`} style={{ minWidth: '38px' }}>{v}</span>
                                        ))}
                                    </div>
                                ))}

                                {/* Arrow annotation */}
                                <div className="viz-row" style={{ marginTop: '12px', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>dp[4][4]:</span>
                                    <span style={{ fontSize: '11px', color: '#64748b' }}>s1[3]='D'==s2[3]='D' →</span>
                                    <span className="viz-cell source" style={{ minWidth: '54px', fontSize: '11px' }}>dp[3][3]=2</span>
                                    <span className="viz-arrow">+1 =</span>
                                    <span className="viz-cell active" style={{ minWidth: '38px' }}>3</span>
                                </div>
                                <div className="viz-note">
                                    🟡 <strong style={{color:'#fbbf24'}}>Yellow</strong> = cell being computed &nbsp;|&nbsp;
                                    🟣 <strong style={{color:'#c084fc'}}>Purple</strong> = source cells &nbsp;|&nbsp;
                                    🟢 <strong style={{color:'#34d399'}}>Green</strong> = filled &nbsp;|&nbsp;
                                    Match → diagonal+1 &nbsp;|&nbsp; No match → max(↑, ←)
                                </div>
                            </div>
                        </div>

                        {/* LIS separate viz */}
                        <div className="recurrence-viz" style={{ marginBottom: '12px' }}>
                            <div className="recurrence-viz-header">
                                <span>📊</span> Recurrence Visualization — LIS([3, 1, 4, 2, 5])
                            </div>
                            <div className="recurrence-viz-body">
                                <div className="viz-row">
                                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', minWidth: '50px' }}>nums</span>
                                    {[3,1,4,2,5].map((v,i) => <span key={i} className="viz-cell" style={{ minWidth: '42px' }}>{v}</span>)}
                                </div>
                                <div className="viz-row" style={{ marginTop: '4px' }}>
                                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', minWidth: '50px' }}>dp</span>
                                    <span className="viz-cell done" style={{ minWidth: '42px' }}>1</span>
                                    <span className="viz-cell done" style={{ minWidth: '42px' }}>1</span>
                                    <span className="viz-cell done" style={{ minWidth: '42px' }}>2</span>
                                    <span className="viz-cell source" style={{ minWidth: '42px' }}>2</span>
                                    <span className="viz-cell active" style={{ minWidth: '42px' }}>3</span>
                                </div>
                                <div className="viz-row" style={{ marginTop: '10px', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>dp[4]: nums[4]=5 &gt; nums[2]=4</span>
                                    <span className="viz-arrow">→</span>
                                    <span className="viz-cell source" style={{ minWidth: '44px', fontSize: '11px' }}>dp[2]=2</span>
                                    <span className="viz-arrow">+1 =</span>
                                    <span className="viz-cell active" style={{ minWidth: '38px' }}>3</span>
                                    <span style={{ fontSize: '11px', color: '#64748b' }}>(LIS: 1→4→5)</span>
                                </div>
                                <div className="viz-note">
                                    For each index i: scan all j &lt; i where nums[j] &lt; nums[i], take max dp[j]+1
                                </div>
                            </div>
                        </div>

                        {/* ── SOLUTION TABS ── */}
                        <div className="sol-section-label">Solutions</div>
                        <div className="sol-tabs">
                            <button className={`sol-tab${activeTab === 'dp' ? ' active' : ''}`} onClick={() => setActiveTab('dp')}>
                                🗃️ DP Table — O(n²) / O(m×n)
                            </button>
                            <button className={`sol-tab opt${activeTab === 'opt' ? ' active opt' : ''}`} onClick={() => setActiveTab('opt')}>
                                ⚡ Space Optimized — O(n) / O(n log n)
                            </button>
                        </div>
                        <div className="sol-panel">
                            {activeTab === 'dp' ? (
                                <div>
                                    <div className="code-container" style={{ borderRadius: '0', border: 'none' }}>
                                        <div className="code-header">
                                            <div className="dots"><div className="dot red"></div><div className="dot yellow"></div><div className="dot green"></div></div>
                                            <span className="code-lang">python — LCS O(m×n) + LIS O(n²)</span>
                                        </div>
                                        <pre>{`def lcs(s1, s2):
    m, n = len(s1), len(s2)
    # dp[i][j] = LCS length of s1[:i] and s2[:j]
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(1, m+1):
        for j in range(1, n+1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1  # match: extend diagonal
            else:
                dp[i][j] = max(dp[i-1][j],    # skip char from s1
                               dp[i][j-1])    # skip char from s2
    return dp[m][n]

def lis(nums):  # O(n²) — intuitive version
    n = len(nums)
    # dp[i] = length of LIS ending exactly at index i
    dp = [1] * n    # every element is an LIS of length 1
    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:       # can extend
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)`}</pre>
                                    </div>
                                    <div className="sol-panel-inner">
                                        <strong>LCS:</strong> Match → diagonal (both chars consumed). No match → take max of skipping one char from either sequence. The grid fills left-to-right, top-to-bottom.<br /><br />
                                        <strong>LIS:</strong> <code>dp[i]</code> is always at least 1 (just the element itself). We extend it by looking at every valid predecessor <code>j</code> where <code>nums[j] &lt; nums[i]</code>.
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="code-container" style={{ borderRadius: '0', border: 'none' }}>
                                        <div className="code-header">
                                            <div className="dots"><div className="dot red"></div><div className="dot yellow"></div><div className="dot green"></div></div>
                                            <span className="code-lang">python — LCS O(n) rolling rows + LIS O(n log n) patience sort</span>
                                        </div>
                                        <pre>{`# ── LCS: Two Rolling Rows ──────────────────────────────
# dp[i][j] only needs the row above (dp[i-1]).
# Replace the full 2D table with two 1D arrays.

def lcs(s1, s2):
    m, n = len(s1), len(s2)
    prev = [0] * (n + 1)
    curr = [0] * (n + 1)
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                curr[j] = prev[j-1] + 1     # diagonal
            else:
                curr[j] = max(prev[j],       # from above
                              curr[j-1])     # from left
        prev, curr = curr, [0] * (n + 1)    # roll row
    return prev[n]


# ── LIS: O(n log n) Patience Sorting ───────────────────
# Maintain a "tails" array where tails[k] = smallest
# tail element of any LIS of length k+1 seen so far.
# Binary search to find where each element fits.

import bisect

def lis(nums):
    tails = []          # tails[i] = min tail for LIS len i+1
    for num in nums:
        pos = bisect.bisect_left(tails, num)   # find insert point
        if pos == len(tails):
            tails.append(num)   # extend LIS by 1
        else:
            tails[pos] = num    # replace to keep tails minimal
    return len(tails)
    # Note: tails is NOT the actual LIS, just tracks lengths!`}</pre>
                                    </div>
                                    <div className="sol-panel-inner">
                                        <strong>LCS rolling rows:</strong> <code>dp[i][j]</code> only reads from <code>dp[i-1][j]</code> (above) and <code>dp[i][j-1]</code> (left). Two rows suffice — swap them after each outer loop iteration.<br /><br />
                                        <strong>LIS patience sort:</strong> The key insight is that we don't need to track exact sequences — only the <em>minimum possible tail</em> for each LIS length. A smaller tail gives more future extension options. Binary search makes each element O(log n).
                                        <div className="opt-highlight">🟢 LCS: O(m×n) → <strong>O(n)</strong> two rows &nbsp;|&nbsp; LIS: O(n²) → <strong>O(n log n)</strong> patience sort</div>
                                    </div>
                                </div>
                            )}
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
