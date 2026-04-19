import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ArrayPatternsGuide() {
    const [quizSelection, setQuizSelection] = useState(null);
    const [quizFeedback, setQuizFeedback] = useState({ visible: false, correct: false, text: '' });

    const checkQuiz = (selected) => {
        setQuizSelection(selected);
        if (selected === 'sw') {
            setQuizFeedback({
                visible: true,
                correct: true,
                text: '✓ Correct! Contiguous + Sum condition = Sliding Window.'
            });
        } else {
            setQuizFeedback({
                visible: true,
                correct: false,
                text: '✗ Incorrect. Think about contiguous subarray elements.'
            });
        }
    };

    return (
        <div className="topic-page">
            <div className="page-header">
                <Link to="/topics/arrays" className="nav-back">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Masterclass
                </Link>
                <h1>Array Patterns Guide</h1>
                <p>Mental models, recognition triggers, and universal templates</p>
            </div>

            <div className="container">
                {/* Pattern Detector */}
                <div className="section-card">
                    <div className="section-card-header">
                        <span style={{ fontSize: '16px' }}>🔍</span>
                        <h2>Pattern Detector</h2>
                    </div>
                    <div className="section-card-body">
                        <div className="flowchart">
                            <div className="flow-node">
                                <h3>1. Is the input a linear sequence?</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '4px' }}>(Array, String)</p>
                            </div>
                            <div className="flow-arrow">↓</div>
                            <div className="flow-node border-ps">
                                <div className="pattern-badge badge-ps" style={{ marginBottom: '8px' }}>Prefix Sum</div>
                                <h3>2. Asking for multiple range sums?</h3>
                            </div>
                            <div className="flow-arrow">↓ No? Next...</div>
                            <div className="flow-node border-sw">
                                <div className="pattern-badge badge-sw" style={{ marginBottom: '8px' }}>Sliding Window</div>
                                <h3>3. CONTIGUOUS subarray/substring?</h3>
                            </div>
                            <div className="flow-arrow">↓ No? Next...</div>
                            <div className="flow-node border-tp">
                                <div className="pattern-badge badge-tp" style={{ marginBottom: '8px' }}>Two Pointers</div>
                                <h3>4. Sorted? Comparing pairs?</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Templates */}
                <div className="section-card">
                    <div className="section-card-header">
                        <span style={{ fontSize: '16px' }}>📋</span>
                        <h2>Universal Skeleton Templates</h2>
                    </div>
                    <div className="section-card-body">
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>Sliding Window (Variable Size)</p>
                        <div className="code-container border-sw">
                            <div className="code-header">
                                <div className="dots"><div className="dot red"></div><div className="dot yellow"></div><div className="dot green"></div></div>
                                <span className="code-lang">python</span>
                            </div>
                            <pre><span className="kw">def</span> variable_window(nums):{"\n"}
    left = <span className="hl">0</span>{"\n"}
    state = <span className="st">{"{}"}</span>   <span className="cm"># Track your condition</span>{"\n"}
    best = <span className="hl">0</span>    <span className="cm"># Track best result</span>{"\n"}
    <span className="kw">for</span> right <span className="kw">in</span> range(<span className="hl">len</span>(nums)):{"\n"}
        <span className="cm"># add nums[right] to state</span>{"\n"}
        <span className="kw">while</span> <span className="cm">condition is broken</span>:{"\n"}
            <span className="cm"># remove nums[left] from state</span>{"\n"}
            left += <span className="hl">1</span>{"\n"}
        best = <span className="hl">max</span>(best, right - left + <span className="hl">1</span>){"\n"}
    <span className="kw">return</span> best</pre>
                        </div>

                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px', marginTop: '20px' }}>Two Pointers (Inward)</p>
                        <div className="code-container border-tp">
                            <div className="code-header">
                                <div className="dots"><div className="dot red"></div><div className="dot yellow"></div><div className="dot green"></div></div>
                                <span className="code-lang">python</span>
                            </div>
                            <pre><span className="kw">def</span> two_pointers_inward(nums, target):{"\n"}
    left, right = <span className="hl">0</span>, <span className="hl">len</span>(nums) - <span className="hl">1</span>{"\n"}
    <span className="kw">while</span> left &lt; right:{"\n"}
        curr = nums[left] + nums[right]{"\n"}
        <span className="kw">if</span> curr == target: <span className="kw">return</span> [left, right]{"\n"}
        <span className="kw">elif</span> curr &lt; target: left += <span className="hl">1</span>{"\n"}
        <span className="kw">else</span>: right -= <span className="hl">1</span></pre>
                        </div>
                    </div>
                </div>

                {/* Mental Models */}
                <div className="section-card">
                    <div className="section-card-header">
                        <span style={{ fontSize: '16px' }}>🧠</span>
                        <h2>Expert Mental Models</h2>
                    </div>
                    <div className="section-card-body">
                        <div className="mental-model border-sw">
                            <strong>The Core Idea: Sliding Window</strong><br />
                            Add new element on the right, remove old on the left. Turns O(n²) into O(n).
                        </div>
                        <div className="mental-model" style={{ borderLeft: '3px solid #ef4444' }}>
                            <strong>Trick: 'while' vs 'if'</strong><br />
                            Always use <code style={{ fontFamily: 'var(--font-code)', color: '#93c5fd', background: 'rgba(255,255,255,0.04)', padding: '1px 4px', borderRadius: '3px' }}>while</code> for shrinking variable-size windows. A single step left might not be enough.
                        </div>
                    </div>
                </div>

                {/* Problem Mapping */}
                <div className="section-card">
                    <div className="section-card-header">
                        <span style={{ fontSize: '16px' }}>🗺️</span>
                        <h2>Problem Mapping</h2>
                    </div>
                    <div className="section-card-body" style={{ padding: 0 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                    <th style={{ padding: '12px', textAlign: 'left' }}>Pattern</th>
                                    <th style={{ padding: '12px', textAlign: 'left' }}>Triggers</th>
                                    <th style={{ padding: '12px', textAlign: 'left' }}>Condition</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '12px' }}><span className="pattern-badge badge-sw">Var Window</span></td>
                                    <td style={{ padding: '12px' }}><span className="trigger-pill">Longest</span><span className="trigger-pill">Unique</span></td>
                                    <td style={{ padding: '12px' }}><code>s[r] in state</code></td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '12px' }}><span className="pattern-badge badge-tp">Two Pointers</span></td>
                                    <td style={{ padding: '12px' }}><span className="trigger-pill">Sorted</span><span className="trigger-pill">Pair Sum</span></td>
                                    <td style={{ padding: '12px' }}><code>l &gt;= r</code></td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px' }}><span className="pattern-badge badge-ps">Prefix Sum</span></td>
                                    <td style={{ padding: '12px' }}><span className="trigger-pill">Range query</span></td>
                                    <td style={{ padding: '12px' }}>Match target</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quiz */}
                <div className="section-card">
                    <div className="section-card-header">
                        <span style={{ fontSize: '16px' }}>🧩</span>
                        <h2>Identify the Pattern</h2>
                    </div>
                    <div className="section-card-body">
                        <div className="quiz-card" id="q1">
                            <p className="quiz-question">1. "Find the minimal length of a contiguous subarray whose sum is &gt;= k."</p>
                            <div className="quiz-opts" style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                                <button 
                                    className={`quiz-btn ${quizSelection === 'sw' ? 'active' : ''}`} 
                                    onClick={() => checkQuiz('sw')}
                                    style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid var(--border)', background: quizSelection === 'sw' ? 'var(--card-hover-bg)' : 'transparent', color: 'inherit', cursor: 'pointer' }}
                                >
                                    Sliding Window
                                </button>
                                <button 
                                    className={`quiz-btn ${quizSelection === 'tp' ? 'active' : ''}`} 
                                    onClick={() => checkQuiz('tp')}
                                    style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid var(--border)', background: quizSelection === 'tp' ? 'var(--card-hover-bg)' : 'transparent', color: 'inherit', cursor: 'pointer' }}
                                >
                                    Two Pointers
                                </button>
                            </div>
                            {quizFeedback.visible && (
                                <div 
                                    className={`quiz-feedback ${quizFeedback.correct ? 'feedback-correct' : 'feedback-incorrect'}`}
                                    style={{ marginTop: '12px', padding: '10px', borderRadius: '6px', backgroundColor: quizFeedback.correct ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: quizFeedback.correct ? '#34d399' : '#f87171', border: `1px solid ${quizFeedback.correct ? '#059669' : '#b91c1c'}` }}
                                >
                                    {quizFeedback.text}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
