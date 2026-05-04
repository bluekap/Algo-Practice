import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CodeBlock from '../../components/CodeBlock';

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
                        <CodeBlock 
                            language="python"
                            code={`def variable_window(nums):
    left = 0
    state = {}   # Track your condition
    best = 0    # Track best result
    for right in range(len(nums)):
        # add nums[right] to state
        while condition is broken:
            # remove nums[left] from state
            left += 1
        best = max(best, right - left + 1)
    return best`} 
                        />

                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px', marginTop: '20px' }}>Two Pointers (Inward)</p>
                        <CodeBlock 
                            language="python"
                            code={`def two_pointers_inward(nums, target):
    left, right = 0, len(nums) - 1
    while left < right:
        curr = nums[left] + nums[right]
        if curr == target: return [left, right]
        elif curr < target: left += 1
        else: right -= 1`} 
                        />
                    </div>
                </div>

                {/* Advanced Extensions */}
                <div className="section-card">
                    <div className="section-card-header">
                        <span style={{ fontSize: '16px' }}>🚀</span>
                        <h2>Advanced Extensions: 3Sum & K-Sum</h2>
                    </div>
                    <div className="section-card-body">
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>3Sum (Application of Two Pointers)</p>
                        <CodeBlock 
                            language="python"
                            code={`def three_sum(nums, target):
    nums.sort()
    res = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i-1]: continue
        l, r = i + 1, len(nums) - 1
        while l < r:
            curr = nums[i] + nums[l] + nums[r]
            if curr == target:
                res.append([nums[i], nums[l], nums[r]])
                while l < r and nums[l] == nums[l+1]: l += 1
                while l < r and nums[r] == nums[r-1]: r -= 1
                l += 1; r -= 1
            elif curr < target: l += 1
            else: r -= 1
    return res`} 
                        />

                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px', marginTop: '20px' }}>Generalized K-Sum (Recursive)</p>
                        <CodeBlock 
                            language="python"
                            code={`def KSum(nums, target, k):
    nums.sort()
    result = []

    def recurse(nums, target, k, tmp):
        if k == 2:
            return twosum(nums, target, tmp)
        
        avg = target // k
        if nums[0] > avg or nums[-1] < avg: return

        for i in range(len(nums)):
            if i > 0 and nums[i] == nums[i-1]: continue
            recurse(nums[i+1:], target - nums[i], k-1, tmp + [nums[i]])

    def twosum(nums, target, tmp):
        l, r = 0, len(nums) - 1
        while l < r:
            s = nums[l] + nums[r]
            if s == target:
                result.append(tmp + [nums[l], nums[r]])
                l += 1
                while l < r and nums[l] == nums[l-1]: l += 1
            elif s < target: l += 1
            else: r -= 1
            
    recurse(nums, target, k, [])
    return result`} 
                        />
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
                                    <td style={{ padding: '12px' }}><span className="trigger-pill">Sorted</span><span className="trigger-pill">Pair Sum</span><span className="trigger-pill">3Sum</span></td>
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
