import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const SLIDING_WINDOW_CODE = [
    "def lengthOfLongestSubstring(s):",
    "    char_set = set()",
    "    l = 0",
    "    res = 0",
    "    for r in range(len(s)):",
    "        while s[r] in char_set:",
    "            char_set.remove(s[l])",
    "            l += 1",
    "        char_set.add(s[r])",
    "        res = max(res, r - l + 1)",
    "    return res"
];

const TWO_POINTERS_CODE = [
    "def two_sum_sorted(nums, target):",
    "    l, r = 0, len(nums) - 1",
    "    while l < r:",
    "        curr = nums[l] + nums[r]",
    "        if curr == target:",
    "            return [l, r]",
    "        elif curr < target:",
    "            l += 1",
    "        else:",
    "            r -= 1",
    "    return []"
];

function generateSWSteps(s) {
    const steps = [];
    const n = s.length;
    const charSet = new Set();
    let l = 0, res = 0;

    steps.push({ l, r: -1, set: new Set(), res, line: 1, msg: `Initialize empty set <code>char_set = set()</code> and <code>l = 0</code>.` });

    for (let r = 0; r < n; r++) {
        steps.push({ l, r, set: new Set(charSet), res, line: 5, msg: `Expanding: <b>r = ${r}</b> ('${s[r]}').` });
        
        while (charSet.has(s[r])) {
            steps.push({ l, r, set: new Set(charSet), res, line: 6, msg: `Duplicate detected! '${s[r]}' is already in set.` });
            charSet.delete(s[l]);
            steps.push({ l, r, set: new Set(charSet), res, line: 7, msg: `Remove <code>s[${l}]</code> ('${s[l]}') from set.` });
            l++;
            steps.push({ l, r, set: new Set(charSet), res, line: 8, msg: `Increment <code>l</code> to <b>${l}</b>.` });
        }
        
        charSet.add(s[r]);
        steps.push({ l, r, set: new Set(charSet), res, line: 9, msg: `Add <code>s[${r}]</code> ('${s[r]}') to set.` });
        
        const currentLen = r - l + 1;
        res = Math.max(res, currentLen);
        steps.push({ l, r, set: new Set(charSet), res, line: 10, msg: `Update <code>res = max(${res-currentLen}, ${currentLen}) = ${res}</code>.` });
    }
    
    steps.push({ l, r: n - 1, set: new Set(charSet), res, line: 11, msg: `Done! Longest substring length is <b>${res}</b>.` });
    return steps;
}

function generateTPSteps(nums, target) {
    const steps = [];
    let l = 0, r = nums.length - 1;

    steps.push({ l, r, sum: null, line: 1, msg: `Initialize pointers: <code>l = 0</code>, <code>r = ${r}</code>.` });

    while (l < r) {
        const sum = nums[l] + nums[r];
        steps.push({ l, r, sum, line: 2, msg: `Checking <code>l < r</code> (${l} < ${r}). Current sum: <b>${sum}</b>.` });
        
        steps.push({ l, r, sum, line: 3, msg: `Sum <b>${nums[l]} + ${nums[r]} = ${sum}</b>.` });

        if (sum === target) {
            steps.push({ l, r, sum, line: 5, msg: `Success! <b>${sum} == ${target}</b>.` });
            return steps;
        } else if (sum < target) {
            steps.push({ l, r, sum, line: 7, msg: `Sum <b>${sum} < ${target}</b>. Need larger value, increment <code>l</code>.` });
            l++;
        } else {
            steps.push({ l, r, sum, line: 9, msg: `Sum <b>${sum} > ${target}</b>. Need smaller value, decrement <code>r</code>.` });
            r--;
        }
    }

    steps.push({ l, r, sum: null, line: 11, msg: `No solution found.` });
    return steps;
}

export default function ArrayPatternsVisualizer() {
    const [activeTab, setActiveTab] = useState("sliding-window");
    const [input, setInput] = useState("abcabcbb");
    const [target, setTarget] = useState(10);
    const [steps, setSteps] = useState([]);
    const [stepIdx, setStepIdx] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        handleStart();
    }, [activeTab]);

    useEffect(() => {
        if (isPlaying && stepIdx < steps.length - 1) {
            timerRef.current = setInterval(() => {
                setStepIdx(prev => prev + 1);
            }, 800);
        } else {
            setIsPlaying(false);
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isPlaying, stepIdx, steps.length]);

    const handleStart = () => {
        if (activeTab === 'sliding-window') {
            if (!input.trim()) return;
            setSteps(generateSWSteps(input.trim()));
        } else {
            const nums = input.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
            if (nums.length === 0) return;
            setSteps(generateTPSteps(nums, target));
        }
        setStepIdx(0);
        setIsPlaying(false);
    };

    const handleReset = () => {
        setStepIdx(0);
        setIsPlaying(false);
    };

    const currentStep = steps[stepIdx] || null;
    const items = activeTab === 'sliding-window' ? input.split('') : input.split(',').map(n => n.trim()).filter(n => n);
    const code = activeTab === 'sliding-window' ? SLIDING_WINDOW_CODE : TWO_POINTERS_CODE;

    return (
        <div className="topic-page">
            <div className="viz-header">
                <Link to="/topics/arrays" className="nav-back">
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Masterclass
                </Link>
                <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 8px' }}></div>
                <span className="header-title">🧱 Array Patterns Visualizer</span>
                <div className="header-spacer"></div>
                <div className="tabs">
                    <button className={`tab ${activeTab === 'sliding-window' ? 'active' : ''}`} onClick={() => { setActiveTab('sliding-window'); setInput("abcabcbb"); }}>Sliding Window</button>
                    <button className={`tab ${activeTab === 'two-pointers' ? 'active' : ''}`} onClick={() => { setActiveTab('two-pointers'); setInput("2, 3, 4, 6, 8, 9"); }}>Two Pointers</button>
                </div>
            </div>

            <div className="viz-container" style={{ gridTemplateColumns: '1fr 340px' }}>
                <div className="viz-main">
                    <div className="controls">
                        <div className="input-group">
                            <label>{activeTab === 'sliding-window' ? 'Test String' : 'Test Array (Sorted)'}</label>
                            <input value={input} onChange={e => setInput(e.target.value)} placeholder={activeTab === 'sliding-window' ? 'abcabcbb' : '2, 3, 4, 6...'} />
                        </div>
                        {activeTab === 'two-pointers' && (
                            <div className="input-group">
                                <label>Target Sum</label>
                                <input type="number" value={target} onChange={e => setTarget(parseInt(e.target.value) || 0)} style={{ width: '60px' }} />
                            </div>
                        )}
                        <button className="btn btn-primary" onClick={handleStart}>RESTART</button>
                    </div>

                    <div className="viz-area">
                        <div className="array-container" style={{ display: 'flex', gap: '8px', position: 'relative', padding: '40px 0', height: '140px', alignItems: 'center' }}>
                            {items.map((item, i) => {
                                const isL = currentStep?.l === i;
                                const isR = currentStep?.r === i;
                                const inWindow = activeTab === 'sliding-window' ? (currentStep && i >= currentStep.l && i <= currentStep.r) : (isL || isR);
                                const isDuplicate = activeTab === 'sliding-window' && currentStep?.line === 6 && currentStep?.r === i;

                                return (
                                    <div key={i} style={{ textAlign: 'center', transition: 'all 0.3s' }}>
                                        <div style={{
                                            width: '46px', height: '46px', border: '2px solid',
                                            borderColor: isDuplicate ? '#ef4444' : inWindow ? (activeTab === 'sliding-window' ? 'var(--color-p3)' : 'var(--color-p2)') : 'var(--border)',
                                            borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            background: inWindow ? (activeTab === 'sliding-window' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)') : 'var(--code-bg)',
                                            fontSize: '16px', fontWeight: 'bold', position: 'relative', color: inWindow ? '#fff' : 'var(--text-muted-bright)'
                                        }}>
                                            {item}
                                            {isR && <div style={{ position: 'absolute', top: '-22px', fontSize: '11px', color: '#60a5fa', fontWeight: 900 }}>{activeTab === 'sliding-window' ? 'R' : 'R'}</div>}
                                            {isL && <div style={{ position: 'absolute', bottom: '-22px', fontSize: '11px', color: '#f59e0b', fontWeight: 900 }}>L</div>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="playback">
                        <button className="btn btn-ghost" onClick={handleReset}>Reset</button>
                        <button className="btn btn-ghost" onClick={() => setStepIdx(Math.max(0, stepIdx - 1))}>◀ Prev</button>
                        <button className="btn btn-primary" onClick={() => setIsPlaying(!isPlaying)} style={{ width: '100px' }}>{isPlaying ? '⏸ Pause' : '▶ Play'}</button>
                        <button className="btn btn-ghost" onClick={() => setStepIdx(Math.min(steps.length - 1, stepIdx + 1))}>Next ▶</button>
                    </div>

                    <div className="explanation-box">
                        {currentStep ? <div dangerouslySetInnerHTML={{ __html: currentStep.msg }} /> : "Press RESTART to begin."}
                    </div>
                </div>

                <div className="viz-sidebar">
                    <div className="code-window">
                        {code.map((line, i) => (
                            <div key={i} className={`code-line ${currentStep?.line === i ? 'active' : ''}`}>
                                <div className="ln">{i + 1}</div>
                                <div className="lc">{line}</div>
                            </div>
                        ))}
                    </div>
                    <div className="complexity-bar">
                        <div className="state-row"><span>Logic:</span> <span className="cv" style={{ color: activeTab === 'sliding-window' ? 'var(--color-p3)' : 'var(--color-p2)' }}>{activeTab === 'sliding-window' ? 'Sliding Window' : 'Two Pointers'}</span></div>
                        {activeTab === 'sliding-window' ? (
                            <>
                                <div className="state-row"><span>Best Length:</span> <span className="cv">{currentStep?.res || 0}</span></div>
                                <div className="state-row"><span>Set:</span> <span className="cv">{currentStep?.set ? `{ ${Array.from(currentStep.set).join(', ')} }` : '{}'}</span></div>
                            </>
                        ) : (
                            <>
                                <div className="state-row"><span>Current Sum:</span> <span className="cv">{currentStep?.sum || 0}</span></div>
                                <div className="state-row"><span>Target:</span> <span className="cv">{target}</span></div>
                            </>
                        )}
                        <div className="state-row"><span>Step:</span> <span className="cv">{stepIdx + 1} / {steps.length || 0}</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
