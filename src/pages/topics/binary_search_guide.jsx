import React from 'react';
import { Link } from 'react-router-dom';
import CodeBlock from '../../components/CodeBlock';

export default function BinarySearchGuide() {
    return (
        <div className="topic-page">
            <div className="page-header">
                <Link to="/topics/binary-search" className="nav-back">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Masterclass
                </Link>
                <h1>Binary Search Revision Guide</h1>
                <p>Definitive mental models and templates for both patterns</p>
            </div>

            <div className="container">
                {/* Pattern 1 */}
                <div className="section-card pattern-1">
                    <div className="section-card-header">
                        <span style={{ fontSize: '16px' }}>🎯</span>
                        <h2>Pattern 1 — Known Target</h2>
                    </div>
                    <div className="section-card-body">
                        <div className="mental-model">
                            <strong>Mental Model:</strong> We are looking for an <em>exact</em> element. If we don't find it at mid, we completely discard mid because it's not the target.
                        </div>

                        <div className="direction-note">
                            <strong style={{ color: 'var(--text-main)' }}>Crucial Direction Fix:</strong><br />
                            <span className="kw">if</span> nums[mid] &lt; target:<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;left = mid + 1 &nbsp;&nbsp;<span className="cm"># target is to the right → move left <span className="highlight-up">UP</span></span><br />
                            <span className="kw">else</span>:<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;right = mid - 1 &nbsp;<span className="cm"># target is to the left → move right <span className="highlight-down">DOWN</span></span>
                        </div>

                        <CodeBlock 
                            language="python"
                            code={`while left <= right:
    mid = (left + right) // 2
    if nums[mid] == target:
        return mid
    elif nums[mid] < target:
        left = mid + 1
    else:
        right = mid - 1
return -1`} 
                        />
                    </div>
                </div>

                {/* Pattern 2 */}
                <div className="section-card pattern-2">
                    <div className="section-card-header">
                        <span style={{ fontSize: '16px' }}>🧱</span>
                        <h2>Pattern 2 — Boundary / Condition</h2>
                    </div>
                    <div className="section-card-body">
                        <div className="mental-model">
                            <strong>Mental Model:</strong> We are looking for the <em>first</em> element that satisfies a condition (a boundary). When we find it, it <em>could</em> be the answer, so we keep it in our search space (<code style={{ fontFamily: 'var(--font-code)', color: '#93c5fd', background: 'rgba(255,255,255,0.04)', padding: '1px 4px', borderRadius: '3px' }}>right = mid</code>). We don't stop until <code style={{ fontFamily: 'var(--font-code)', color: '#93c5fd', background: 'rgba(255,255,255,0.04)', padding: '1px 4px', borderRadius: '3px' }}>left == right</code>.
                        </div>

                        <CodeBlock 
                            language="python"
                            code={`while left < right:
    mid = (left + right) // 2
    if some_condition:
        right = mid
    else:
        left = mid + 1
return nums[left]`} 
                        />
                    </div>
                </div>

                {/* Exception */}
                <div className="section-card exception">
                    <div className="section-card-header">
                        <span style={{ fontSize: '16px' }}>⚠️</span>
                        <h2>The One Exception: Problem 33</h2>
                    </div>
                    <div className="section-card-body">
                        <div className="mental-model" style={{ borderLeft: '3px solid var(--color-warn)' }}>
                            <strong>Search in Rotated Sorted Array</strong> looks like Pattern 1 since there's an exact target, but it actually needs the <code style={{ fontFamily: 'var(--font-code)', color: '#93c5fd', background: 'rgba(255,255,255,0.04)', padding: '1px 4px', borderRadius: '3px' }}>nums[mid] == target</code> early return <em>inside</em> a Pattern 2 loop condition logic.
                        </div>

                        <p className="exception-note">
                            This is the only hybrid you'll typically encounter. Usually, if there's a specific target, use Pattern 1. If you're finding a boundary, use Pattern 2. Problem 33 requires checking bounds of the rotated array while also checking for the exact target.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
