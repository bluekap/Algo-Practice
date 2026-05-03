import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function DpPatternInterval() {
    const [activeTab, setActiveTab] = useState('dp');

    return (
        <div className="topic-page">
            <div className="page-header">
                <Link to="/topics/dp/guide" className="nav-back">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to DP Guide
                </Link>
                <h1 style={{ background: 'linear-gradient(135deg, #f87171, #dc2626)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Interval DP</h1>
                <p>Signal: subarray/substring ranges, merge costs, optimal subdivision</p>
            </div>

            <div className="container">
                <div className="section-card">
                    <div className="section-card-header">
                        <span style={{ fontSize: '16px' }}>🔗</span>
                        <h2>Pattern Breakdown</h2>
                    </div>
                    <div className="section-card-body">
                        <div className="signals-card" style={{ borderLeftColor: '#f87171' }}>
                            <div className="signals-card-label">🎯 Recognition Signals</div>
                            <div className="signals-pills">
                                <span className="signal-pill">burst / remove elements optimally</span>
                                <span className="signal-pill">merge intervals for min cost</span>
                                <span className="signal-pill">split at optimal pivot point</span>
                                <span className="signal-pill">subproblem is a contiguous range [i,j]</span>
                                <span className="signal-pill">cost depends on boundary elements</span>
                            </div>
                        </div>
                        <div className="mental-model">
                            <strong>Mental Model:</strong> <code>dp[i][j]</code> = best answer for the subproblem on the range <code>[i, j]</code>. You iterate by <em>length</em> of the interval (from small to large), and for each interval you try every possible split point <code>k</code>.
                        </div>
                        <div className="recurrence">
                            <span className="label">Interval DP recurrence (e.g. Matrix Chain / Burst Balloons)</span>
                            <span className="hl-red">dp[i][j]</span> = min/max over all k in [i, j-1]:<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="hl-yellow">dp[i][k]</span> + <span className="hl-green">dp[k+1][j]</span> + cost(i, k, j)
                        </div>

                        {/* ── RECURRENCE VISUALIZATION ── */}
                        <div className="recurrence-viz">
                            <div className="recurrence-viz-header">
                                <span>📊</span> Recurrence Visualization — Interval Build-up (n=4 elements)
                            </div>
                            <div className="recurrence-viz-body">
                                <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '10px' }}>
                                    Fill order: length 1 first (diagonal), then length 2, 3, 4… Each cell dp[i][j] tries all split points k between i and j.
                                </div>

                                {/* Triangle diagram */}
                                {[
                                    { label: 'len=1 (base)', cells: ['dp[0][0]','dp[1][1]','dp[2][2]','dp[3][3]'], type: 'done' },
                                    { label: 'len=2', cells: ['dp[0][1]','dp[1][2]','dp[2][3]', ''], type: 'done' },
                                    { label: 'len=3', cells: ['dp[0][2]','dp[1][3]','',''], type: 'source' },
                                    { label: 'len=4 ★', cells: ['dp[0][3]','','',''], type: 'active' },
                                ].map((row, ri) => (
                                    <div key={ri} className="viz-row" style={{ gap: '4px' }}>
                                        <span style={{ fontSize: '10px', color: 'var(--text-muted)', minWidth: '70px' }}>{row.label}</span>
                                        {row.cells.map((c, ci) => c ? (
                                            <span key={ci} className={`viz-cell ${row.type}`} style={{ minWidth: '62px', fontSize: '11px' }}>{c}</span>
                                        ) : (
                                            <span key={ci} style={{ minWidth: '66px' }}></span>
                                        ))}
                                    </div>
                                ))}

                                {/* Split point annotation */}
                                <div className="viz-row" style={{ marginTop: '12px', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                                    <span className="viz-cell active" style={{ minWidth: '56px', fontSize: '11px' }}>dp[0][3]</span>
                                    <span className="viz-arrow">=</span>
                                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>max over k∈{'{'}0,1,2{'}'}:</span>
                                    <span className="viz-cell source" style={{ minWidth: '52px', fontSize: '10px' }}>dp[0][k]</span>
                                    <span className="viz-arrow">+</span>
                                    <span className="viz-cell source" style={{ minWidth: '52px', fontSize: '10px' }}>dp[k+1][3]</span>
                                    <span className="viz-arrow">+</span>
                                    <span style={{ fontSize: '11px', color: '#64748b' }}>cost(k)</span>
                                </div>
                                <div className="viz-note">
                                    🟡 <strong style={{color:'#fbbf24'}}>Yellow</strong> = target cell (answer) &nbsp;|&nbsp;
                                    🟣 <strong style={{color:'#c084fc'}}>Purple</strong> = sub-intervals tried &nbsp;|&nbsp;
                                    🟢 <strong style={{color:'#34d399'}}>Green</strong> = already solved (smaller length) &nbsp;|&nbsp;
                                    Fill: <strong style={{color:'#a78bfa'}}>by increasing interval length</strong>
                                </div>
                            </div>
                        </div>

                        <div className="complexity-strip">
                            <span className="complexity-strip-label">Complexity</span>
                            <span className="complexity-badge time">⏱ Time: O(n³)</span>
                            <span className="complexity-badge space">💾 Space: O(n²)</span>
                            <span className="complexity-badge opt" style={{ opacity: 0.6 }}>⚡ No trivial space opt</span>
                        </div>
                        {/* ── SOLUTION TABS ── */}
                        <div className="sol-section-label">Solutions</div>
                        <div className="sol-tabs">
                            <button className={`sol-tab${activeTab === 'dp' ? ' active' : ''}`} onClick={() => setActiveTab('dp')}>
                                🗃️ DP Table — O(n²) space
                            </button>
                            <button className={`sol-tab opt${activeTab === 'opt' ? ' active opt' : ''}`} onClick={() => setActiveTab('opt')}>
                                ⚡ Space Optimized — LPS O(n) space
                            </button>
                        </div>
                        <div className="sol-panel">
                            {activeTab === 'dp' ? (
                                <div>
                                    <div className="code-container" style={{ borderRadius: '0', border: 'none' }}>
                                        <div className="code-header">
                                            <div className="dots"><div className="dot red"></div><div className="dot yellow"></div><div className="dot green"></div></div>
                                            <span className="code-lang">python — interval DP (burst balloons)</span>
                                        </div>
                                        <pre>{`def maxCoins(nums):
    nums = [1] + nums + [1]   # pad boundaries
    n = len(nums)
    # dp[i][j] = max coins from bursting all balloons in (i, j)
    dp = [[0] * n for _ in range(n)]

    # Iterate by length of interval (small → large)
    for length in range(2, n):           # interval length
        for i in range(0, n - length):   # left boundary
            j = i + length               # right boundary
            for k in range(i+1, j):      # last balloon to burst
                coins = nums[i] * nums[k] * nums[j]
                dp[i][j] = max(dp[i][j],
                               dp[i][k] + dp[k][j] + coins)
    return dp[0][n-1]

# Longest Palindromic Subsequence (interval DP variant):
def longestPalindromeSubseq(s):
    n = len(s)
    dp = [[0]*n for _ in range(n)]
    for i in range(n): dp[i][i] = 1     # base: single char
    for length in range(2, n+1):
        for i in range(n - length + 1):
            j = i + length - 1
            if s[i] == s[j]:
                dp[i][j] = dp[i+1][j-1] + 2
            else:
                dp[i][j] = max(dp[i+1][j], dp[i][j-1])
    return dp[0][n-1]`}</pre>
                                    </div>
                                    <div className="sol-panel-inner">
                                        <strong>Why iterate by length?</strong> <code>dp[i][j]</code> depends on <code>dp[i][k]</code> and <code>dp[k+1][j]</code> which are <em>shorter</em> intervals. By solving smaller intervals first, all dependencies are ready when we need them.
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="code-container" style={{ borderRadius: '0', border: 'none' }}>
                                        <div className="code-header">
                                            <div className="dots"><div className="dot red"></div><div className="dot yellow"></div><div className="dot green"></div></div>
                                            <span className="code-lang">python — LPS space optimized O(n) with two rolling rows</span>
                                        </div>
                                        <pre>{`# NOTE: General interval DP (Burst Balloons, Matrix Chain)
# cannot be trivially space-optimized because dp[i][j] may
# depend on non-adjacent rows/cols.
#
# HOWEVER, Palindromic Subsequence only depends on
# dp[i+1][j-1], dp[i+1][j], dp[i][j-1] — so we can
# reduce to two rolling rows.

def longestPalindromeSubseq(s):
    n = len(s)
    # prev = dp[i+1] (next inner row), curr = dp[i] (current row)
    prev = [0] * n
    curr = [0] * n

    for i in range(n - 1, -1, -1):
        curr[i] = 1          # single character is palindrome of length 1
        for j in range(i + 1, n):
            if s[i] == s[j]:
                curr[j] = prev[j-1] + 2     # extend diagonal
            else:
                curr[j] = max(prev[j],       # dp[i+1][j]
                              curr[j-1])     # dp[i][j-1]
        prev, curr = curr, [0] * n          # roll the row

    return prev[n-1]`}</pre>
                                    </div>
                                    <div className="sol-panel-inner">
                                        <strong>Why LPS can be optimized but Burst Balloons cannot:</strong> LPS's recurrence <code>dp[i][j]</code> only uses the row directly below (<code>i+1</code>) and values to the left in the same row. This "L-shaped" dependency means two rows suffice. Burst Balloons uses an arbitrary split point <code>k</code>, creating cross-row dependencies that prevent simple rolling.
                                        <div className="opt-highlight">🟢 LPS: O(n²) → <strong>O(n)</strong> with two rows &nbsp;|&nbsp; Burst Balloons stays O(n²)</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="pitfalls-card">
                            <div className="pitfalls-header">Common Pitfalls</div>
                            <div className="pitfall-item">Iterate by interval <strong>length</strong> (2, 3, 4…), not by i or j index. <code>dp[i][k]</code> and <code>dp[k][j]</code> must be fully solved before <code>dp[i][j]</code>.</div>
                            <div className="pitfall-item">Burst Balloons must pad with <code>[1] + nums + [1]</code> — without boundaries, the edge multiplications reference out-of-bounds indices.</div>
                            <div className="pitfall-item">The split point <code>k</code> in Burst Balloons is the <strong>last balloon burst inside (i, j)</strong>, not a midpoint. The interval (i, j) is open — i and j are never burst.</div>
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
