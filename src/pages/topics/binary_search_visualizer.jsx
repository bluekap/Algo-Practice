import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const guides = {
    1: {
        title: "Exact Search",
        complexity: { tc: "O(log n)", sc: "O(1)" },
        code: [
            "def binary_search(arr, target):",
            "    lo, hi = 0, len(arr) - 1",
            "    while lo <= hi:",
            "        mid = (lo + hi) // 2",
            "        if arr[mid] == target:",
            "            return mid",
            "        elif arr[mid] < target:",
            "            lo = mid + 1",
            "        else:",
            "            hi = mid - 1",
            "    return -1"
        ]
    },
    2: {
        title: "Min in Rotated Array",
        complexity: { tc: "O(log n)", sc: "O(1)" },
        code: [
            "def findMin(nums):",
            "    left, right = 0, len(nums) - 1",
            "    while left < right:",
            "        mid = (left + right) // 2",
            "        if nums[mid] > nums[right]:",
            "            left = mid + 1",
            "        else:",
            "            right = mid",
            "    return nums[left]"
        ]
    },
    3: {
        title: "First Position",
        complexity: { tc: "O(log n)", sc: "O(1)" },
        code: [
            "def first_occurrence(nums, target):",
            "    lo, hi = 0, len(nums) - 1",
            "    while lo < hi:",
            "        mid = (lo + hi) // 2",
            "        if nums[mid] >= target:",
            "            hi = mid",
            "        else:",
            "            lo = mid + 1",
            "    return lo if nums[lo] == target else -1"
        ]
    },
    4: {
        title: "Boolean Search",
        complexity: { tc: "O(log n)", sc: "O(1)" },
        code: [
            "def first_true(arr):",
            "    lo, hi = 0, len(arr) - 1",
            "    while lo < hi:",
            "        mid = (lo + hi) // 2",
            "        if condition(arr[mid]):",
            "            hi = mid",
            "        else:",
            "            lo = mid + 1",
            "    return lo"
        ]
    }
};

const defaults = {
    1: { arr: "2, 3, 5, 7, 11, 13, 17, 19, 23", target: "7" },
    2: { arr: "15, 18, 2, 3, 6, 12", target: "" },
    3: { arr: "1, 2, 2, 2, 3, 4, 5, 5, 6", target: "2" },
    4: { arr: "F, F, F, T, T, T", target: "T" }
};

function generateSteps(mode, arr, target) {
    const s = [];
    const n = arr.length;
    
    if (mode === 1) {
        let lo = 0, hi = n - 1;
        s.push({ lo, hi, mid: null, range: [lo, hi], line: 1, msg: `Initialize <code>lo=0</code>, <code>hi=${hi}</code>.` });
        while (lo <= hi) {
            s.push({ lo, hi, mid: null, range: [lo, hi], line: 2, msg: `Loop condition: <code>${lo} <= ${hi}</code> is True.` });
            let mid = Math.floor((lo + hi) / 2);
            s.push({ lo, hi, mid, range: [lo, hi], line: 3, msg: `Calculate <code>mid = (${lo} + ${hi}) // 2 = ${mid}</code>.` });
            if (arr[mid] === target) {
                s.push({ lo, hi, mid, range: [lo, hi], found: mid, line: 5, msg: `Found target! <code>arr[${mid}] = ${target}</code>.` });
                return s;
            } else if (arr[mid] < target) {
                lo = mid + 1;
                s.push({ lo, hi, mid: null, range: [lo, hi], line: 7, msg: `<code>arr[${mid}] < ${target}</code>. Move <code>lo</code> to <code>mid + 1</code> (${lo}).` });
            } else {
                hi = mid - 1;
                s.push({ lo, hi, mid: null, range: [lo, hi], line: 9, msg: `<code>arr[${mid}] > ${target}</code>. Move <code>hi</code> to <code>mid - 1</code> (${hi}).` });
            }
        }
        s.push({ lo, hi, mid: null, range: [lo, hi], line: 10, msg: `Range exhausted. Target not found.` });
    } else if (mode === 2) {
        let l = 0, r = n - 1;
        s.push({ lo: l, hi: r, mid: null, range: [l, r], line: 1, msg: `Initialize binary search for minimum element.` });
        while (l < r) {
            let mid = Math.floor((l + r) / 2);
            s.push({ lo: l, hi: r, mid, range: [l, r], line: 4, msg: `mid = ${mid}. Comparing <code>nums[${mid}]=${arr[mid]}</code> with <code>nums[${r}]=${arr[r]}</code>.` });
            if (arr[mid] > arr[r]) {
                l = mid + 1;
                s.push({ lo: l, hi: r, mid: null, range: [l, r], line: 6, msg: `Min must be on the right. <code>left = mid + 1</code>.` });
            } else {
                r = mid;
                s.push({ lo: l, hi: r, mid: null, range: [l, r], line: 8, msg: `Min must be at mid or on the left. <code>right = mid</code>.` });
            }
        }
        s.push({ lo: l, hi: r, found: l, range: [l, r], line: 9, msg: `Converged! The minimum is <code>${arr[l]}</code> at index ${l}.` });
    } else {
        // First True pattern for mode 3 & 4
        let lo = 0, hi = n - 1;
        s.push({ lo, hi, mid: null, range: [lo, hi], line: 1, msg: `Searching for the first occurrence/True.` });
        while (lo < hi) {
            let mid = Math.floor((lo + hi) / 2);
            s.push({ lo, hi, mid, range: [lo, hi], line: 3, msg: `mid = ${mid}. Check condition at <code>arr[mid]</code>.` });
            const cond = (mode === 4) ? (arr[mid] === 'T' || arr[mid] === true) : (arr[mid] >= target);
            if (cond) {
                hi = mid;
                s.push({ lo, hi, mid: null, range: [lo, hi], line: 5, msg: `Condition is True. Squeeze <code>hi</code> to <code>mid</code>.` });
            } else {
                lo = mid + 1;
                s.push({ lo, hi, mid: null, range: [lo, hi], line: 7, msg: `Condition is False. Squeeze <code>lo</code> to <code>mid + 1</code>.` });
            }
        }
        s.push({ lo, hi, mid: null, found: lo, range: [lo, hi], line: 8, msg: `Search finished. Result index is ${lo}.` });
    }
    return s;
}

export default function BinarySearchVisualizer() {
    const [mode, setMode] = useState(1);
    const [arrayInput, setArrayInput] = useState(defaults[1].arr);
    const [targetInput, setTargetInput] = useState(defaults[1].target);
    const [steps, setSteps] = useState([]);
    const [stepIndex, setStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        handleReset();
    }, [mode]);

    useEffect(() => {
        if (isPlaying) {
            timerRef.current = setInterval(() => {
                setStepIndex(prev => {
                    if (prev < steps.length - 1) return prev + 1;
                    setIsPlaying(false);
                    return prev;
                });
            }, 800);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isPlaying, steps]);

    const handleStart = () => {
        const arr = arrayInput.split(',').map(s => {
            const trimmed = s.trim();
            if (trimmed === 'T' || trimmed === 'True') return 'T';
            if (trimmed === 'F' || trimmed === 'False') return 'F';
            return parseInt(trimmed);
        }).filter(n => n !== null && !isNaN(n) || typeof n === 'string');
        
        const target = isNaN(parseInt(targetInput)) ? targetInput : parseInt(targetInput);
        if (arr.length === 0) return;
        
        const newSteps = generateSteps(mode, arr, target);
        setSteps(newSteps);
        setStepIndex(0);
    };

    const handleReset = () => {
        setSteps([]);
        setStepIndex(0);
        setIsPlaying(false);
        setArrayInput(defaults[mode].arr);
        setTargetInput(defaults[mode].target);
    };

    const currentStep = steps[stepIndex] || null;
    const parsedArray = arrayInput.split(',').map(s => s.trim()).filter(x => x !== "");
    const guide = guides[mode];

    return (
        <div className="topic-page">
            <div className="viz-header">
                <Link to="/topics/binary-search" className="nav-back">
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Masterclass
                </Link>
                <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 8px' }}></div>
                <span className="header-title">🔍 Binary Search Visualizer</span>
                <div className="header-spacer"></div>
                <div className="tabs">
                    {[1, 2, 3, 4].map(m => (
                        <button key={m} className={`tab ${mode === m ? 'active' : ''}`} onClick={() => setMode(m)}>
                            {m}. {guides[m].title}
                        </button>
                    ))}
                </div>
            </div>

            <div className="viz-container">
                <div className="viz-main">
                    <div className="controls">
                        <div className="input-group">
                            <label>Array (sorted)</label>
                            <input value={arrayInput} onChange={e => setArrayInput(e.target.value)} placeholder="1, 2, 3..." />
                        </div>
                        <div className="input-group">
                            <label>Target</label>
                            <input value={targetInput} onChange={e => setTargetInput(e.target.value)} placeholder="X" style={{ width: '80px' }} />
                        </div>
                        <button className="btn btn-primary" onClick={handleStart}>START</button>
                    </div>

                    <div className="viz-area">
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {parsedArray.map((val, i) => {
                                const isLo = currentStep?.lo === i;
                                const isHi = currentStep?.hi === i;
                                const isMid = currentStep?.mid === i;
                                const isFound = currentStep?.found === i;
                                const isDimmed = currentStep && (i < currentStep.range[0] || i > currentStep.range[1]);

                                return (
                                    <div key={i} style={{ textAlign: 'center', transition: 'all 0.3s', opacity: isDimmed ? 0.3 : 1 }}>
                                        <div style={{
                                            width: '46px', height: '46px', border: '2px solid',
                                            borderColor: isFound ? 'var(--color-p3)' : isMid ? '#60a5fa' : isLo ? '#f59e0b' : isHi ? '#ef4444' : 'var(--border)',
                                            borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            background: isFound ? 'rgba(167, 139, 250, 0.1)' : 'var(--code-bg)',
                                            fontSize: '14px', fontWeight: 'bold', position: 'relative'
                                        }}>
                                            {val}
                                            {isMid && <div style={{ position: 'absolute', top: '-18px', fontSize: '9px', color: '#60a5fa' }}>MID</div>}
                                        </div>
                                        <div style={{ marginTop: '6px', height: '14px', display: 'flex', justifyContent: 'center', gap: '4px' }}>
                                            {isLo && <span style={{ color: '#f59e0b', fontSize: '10px', fontWeight: '900' }}>L</span>}
                                            {isHi && <span style={{ color: '#ef4444', fontSize: '10px', fontWeight: '900' }}>R</span>}
                                        </div>
                                        <div style={{ color: 'var(--text-muted)', fontSize: '9px' }}>{i}</div>
                                    </div>
                                );
                            })}
                        </div>
                        {!currentStep && (
                            <div className="viz-empty">
                                <div className="icon">🔍</div>
                                <p>Set inputs and press START to visualize</p>
                            </div>
                        )}
                    </div>

                    <div className="playback">
                        <button className="btn btn-ghost" onClick={handleReset}>Reset</button>
                        <button className="btn btn-ghost" onClick={() => setStepIndex(Math.max(0, stepIndex - 1))}>◀ Prev</button>
                        <button className="btn btn-primary" onClick={() => {
                            if (isPlaying) {
                                setIsPlaying(false);
                            } else {
                                if (steps.length === 0 || stepIndex === steps.length - 1) handleStart();
                                setIsPlaying(true);
                            }
                        }}>
                            {isPlaying ? '⏸ Pause' : (steps.length > 0 && stepIndex === steps.length - 1 ? '↺ Restart' : '▶ Play')}
                        </button>
                        <button className="btn btn-ghost" onClick={() => setStepIndex(Math.min(steps.length - 1, stepIndex + 1))}>Next ▶</button>
                    </div>

                    <div className="explanation-box">
                        {currentStep ? <div dangerouslySetInnerHTML={{ __html: currentStep.msg }} /> : "Select a template and start searching."}
                    </div>
                </div>

                <div className="viz-sidebar">
                    <div className="code-window">
                        {guide.code.map((line, i) => (
                            <div key={i} className={`code-line ${currentStep?.line === i ? 'active' : ''}`}>
                                <div className="ln">{i + 1}</div>
                                <div className="lc">{line}</div>
                            </div>
                        ))}
                    </div>
                    <div className="complexity-bar">
                        <div className="state-row"><span>Logic:</span> <span className="cv">{guide.title}</span></div>
                        <div className="state-row"><span>Time:</span> <span className="cv">{guide.complexity.tc}</span></div>
                        <div className="state-row"><span>Step:</span> <span className="cv">{stepIndex + 1} / {steps.length || 0}</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
