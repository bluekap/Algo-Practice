import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NODE_SIZE = 52;
const LEVEL_H = 90;

const HEAP_CODE = [
    "def heappush(heap, item):",
    "    heap.append(item)",
    "    _sifth(heap, 0, len(heap)-1)",
    "",
    "def heappop(heap):",
    "    lastelt = heap.pop()",
    "    if heap:",
    "        returnitem = heap[0]",
    "        heap[0] = lastelt",
    "        _siftl(heap, 0)",
    "        return returnitem",
    "    return lastelt"
];

export default function HeapVisualizer() {
    const [heapIdx, setHeapIdx] = useState(0); // For switching topics if needed, but not used here
    const [heapType, setHeapType] = useState('min');
    const [inputs, setInputs] = useState({ push: '', heapify: '15,10,8,5,3,12,7' });
    const [steps, setSteps] = useState([]);
    const [stepIdx, setStepIdx] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const playTimerRef = useRef(null);
    const vizAreaRef = useRef(null);
    const [vizWidth, setVizWidth] = useState(800);

    const currentStep = steps[stepIdx] || null;

    useEffect(() => {
        if (isPlaying) {
            playTimerRef.current = setInterval(() => {
                setStepIdx(prev => {
                    if (prev < steps.length - 1) return prev + 1;
                    setIsPlaying(false);
                    return prev;
                });
            }, 800);
        } else {
            clearInterval(playTimerRef.current);
        }
        return () => clearInterval(playTimerRef.current);
    }, [isPlaying, steps]);

    useEffect(() => {
        const updateWidth = () => {
            if (vizAreaRef.current) setVizWidth(vizAreaRef.current.clientWidth);
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const resetViz = () => {
        setIsPlaying(false);
        setSteps([]);
        setStepIdx(0);
    };

    const generatePushSteps = (val) => {
        const s = [];
        const h = [...(currentStep?.heap || [])];
        s.push({ heap: [...h], active: -1, comparing: [], swapping: [], line: 0, msg: `Pushing <b>${val}</b> into the ${heapType}-heap.` });
        h.push(val);
        s.push({ heap: [...h], active: h.length - 1, comparing: [], swapping: [], line: 1, msg: `Append <b>${val}</b> to the end of the array.` });
        
        let curr = h.length - 1;
        while (curr > 0) {
            const parent = Math.floor((curr - 1) / 2);
            s.push({ heap: [...h], active: -1, comparing: [curr, parent], swapping: [], line: 2, msg: `Sift up: Compare <code>[${curr}]=${h[curr]}</code> with parent <code>[${parent}]=${h[parent]}</code>.` });
            
            const isViolation = heapType === 'min' ? h[curr] < h[parent] : h[curr] > h[parent];
            if (isViolation) {
                s.push({ heap: [...h], active: -1, comparing: [], swapping: [curr, parent], line: 2, msg: `Violation! Swapping child with parent.` });
                [h[curr], h[parent]] = [h[parent], h[curr]];
                curr = parent;
            } else {
                s.push({ heap: [...h], active: -1, comparing: [], swapping: [], line: 2, msg: `Property satisfied. ✓` });
                break;
            }
        }
        s.push({ heap: [...h], active: -1, comparing: [], swapping: [], line: 2, msg: `Push complete.` });
        setSteps(s);
        setStepIdx(0);
    };

    const generatePopSteps = () => {
        const h = [...(currentStep?.heap || [])];
        if (h.length === 0) return;
        const s = [];
        const rootVal = h[0];
        s.push({ heap: [...h], active: 0, comparing: [], swapping: [], line: 4, msg: `Popping root element <b>${rootVal}</b>.` });
        
        if (h.length === 1) {
            h.pop();
            s.push({ heap: [], active: -1, comparing: [], swapping: [], line: 11, msg: `Heap is now empty.` });
        } else {
            const last = h.pop();
            s.push({ heap: [...h], active: -1, comparing: [], swapping: [], line: 5, msg: `Remove last element <b>${last}</b>.` });
            h[0] = last;
            s.push({ heap: [...h], active: 0, comparing: [], swapping: [], line: 8, msg: `Move last element to root.` });
            
            let curr = 0;
            while (true) {
                const l = 2 * curr + 1;
                const r = 2 * curr + 2;
                let target = curr;
                const compare = (a, b) => heapType === 'min' ? a < b : a > b;
                
                if (l < h.length && compare(h[l], h[target])) target = l;
                if (r < h.length && compare(h[r], h[target])) target = r;
                
                if (target !== curr) {
                    s.push({ heap: [...h], active: curr, comparing: [l, r].filter(i => i < h.length), swapping: [], line: 9, msg: `Sift down: Compare root with children.` });
                    s.push({ heap: [...h], active: -1, comparing: [], swapping: [curr, target], line: 9, msg: `Swap <code>[${curr}]</code> with <code>[${target}]</code>.` });
                    [h[curr], h[target]] = [h[target], h[curr]];
                    curr = target;
                } else {
                    s.push({ heap: [...h], active: -1, comparing: [], swapping: [], line: 10, msg: `Property satisfied. ✓` });
                    break;
                }
            }
        }
        s.push({ heap: [...h], active: -1, comparing: [], swapping: [], line: 11, msg: `Pop complete.` });
        setSteps(s);
        setStepIdx(0);
    };

    const getPos = (index, totalWidth = vizWidth) => {
        const level = Math.floor(Math.log2(index + 1));
        const count = Math.pow(2, level);
        const posInLvl = index - (count - 1);
        const x = (posInLvl * (totalWidth / count)) + (totalWidth / count / 2);
        const y = 40 + level * LEVEL_H + (NODE_SIZE / 2);
        return { x, y };
    };

    return (
        <div className="topic-page">
            <div className="viz-header">
                <Link to="/topics/heap" className="nav-back">
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Masterclass
                </Link>
                <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 8px' }}></div>
                <span className="header-title">🏔️ Heap Visualizer</span>
                <div className="header-spacer"></div>
                <div className="tabs">
                    <button className={`tab ${heapType === 'min' ? 'active' : ''}`} onClick={() => { resetViz(); setHeapType('min'); }}>MIN-HEAP</button>
                    <button className={`tab ${heapType === 'max' ? 'active' : ''}`} onClick={() => { resetViz(); setHeapType('max'); }}>MAX-HEAP</button>
                </div>
            </div>

            <div className="viz-container">
                <div className="viz-main">
                    <div className="controls">
                        <div className="input-group">
                            <label>Push Value</label>
                            <input 
                                type="number" 
                                value={inputs.push} 
                                onChange={(e) => setInputs({...inputs, push: e.target.value})}
                                onKeyDown={(e) => e.key === 'Enter' && generatePushSteps(parseInt(inputs.push))}
                                placeholder="e.g. 42"
                            />
                        </div>
                        <button className="btn btn-primary" onClick={() => generatePushSteps(parseInt(inputs.push))}>START PUSH</button>
                        <div style={{ width: '1px', height: '30px', background: 'var(--border)' }}></div>
                        <button className="btn btn-ghost" onClick={generatePopSteps}>POP ROOT</button>
                        <button className="btn btn-ghost" onClick={() => { setSteps([{ heap: [15,10,8,5,3,12,7], active: -1, comparing: [], swapping: [], line: -1, msg: "Demo loaded." }]); setStepIdx(0); }}>LOAD DEMO</button>
                    </div>

                    <div className="viz-area" ref={vizAreaRef}>
                        {currentStep ? (
                            <svg style={{ width: '100%', height: '100%', minHeight: '350px' }}>
                                {currentStep.heap.map((_, i) => {
                                    const l = 2 * i + 1;
                                    const r = 2 * i + 2;
                                    return (
                                        <React.Fragment key={`lines-${i}`}>
                                            {l < currentStep.heap.length && (
                                                <line x1={getPos(i).x} y1={getPos(i).y} x2={getPos(l).x} y2={getPos(l).y} stroke="#1e3a5f" strokeWidth="2" />
                                            )}
                                            {r < currentStep.heap.length && (
                                                <line x1={getPos(i).x} y1={getPos(i).y} x2={getPos(r).x} y2={getPos(r).y} stroke="#1e3a5f" strokeWidth="2" />
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                                {currentStep.heap.map((val, i) => {
                                    const { x, y } = getPos(i);
                                    let className = 'node';
                                    if (i === 0) className += ' root';
                                    if (currentStep.comparing.includes(i) || currentStep.active === i) className += ' comparing';
                                    if (currentStep.swapping.includes(i)) className += ' swapping';

                                    return (
                                        <g key={`node-${i}`} style={{ transform: `translate(${x - NODE_SIZE/2}px, ${y - NODE_SIZE/2}px)`, transition: 'all 0.3s ease' }}>
                                            <circle cx={NODE_SIZE/2} cy={NODE_SIZE/2} r={NODE_SIZE/2 - 2} fill={currentStep.swapping.includes(i) ? 'var(--accent-yellow)' : 'var(--card-bg)'} stroke={currentStep.comparing.includes(i) ? 'var(--accent-blue)' : 'var(--border)'} strokeWidth="2" />
                                            <text x={NODE_SIZE/2} y={NODE_SIZE/2} dominantBaseline="middle" textAnchor="middle" fill="#fff" fontWeight="bold">{val}</text>
                                        </g>
                                    );
                                })}
                            </svg>
                        ) : (
                            <div className="viz-empty">
                                <div className="icon">🏔️</div>
                                <p>Push values to build the tree</p>
                            </div>
                        )}
                    </div>

                    <div className="playback">
                        <button className="btn btn-ghost" onClick={resetViz}>Reset</button>
                        <button className="btn btn-ghost" onClick={() => setStepIdx(Math.max(0, stepIdx - 1))}>◀ Prev</button>
                        <button className="btn btn-primary" onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? '⏸ Pause' : '▶ Play'}</button>
                        <button className="btn btn-ghost" onClick={() => setStepIdx(Math.min(steps.length - 1, stepIdx + 1))}>Next ▶</button>
                    </div>

                    <div className="explanation-box">
                        {currentStep ? <div dangerouslySetInnerHTML={{ __html: currentStep.msg }} /> : "Initialize an operation to see logic."}
                    </div>
                </div>

                <div className="viz-sidebar">
                    <div className="code-window">
                        {HEAP_CODE.map((line, i) => (
                            <div key={i} className={`code-line ${currentStep?.line === i ? 'active' : ''}`}>
                                <div className="ln">{i + 1}</div>
                                <div className="lc">{line}</div>
                            </div>
                        ))}
                    </div>
                    <div className="complexity-bar">
                        <div className="state-row"><span>Logic:</span> <span className="cv">Python heapq</span></div>
                        <div className="state-row"><span>Time:</span> <span className="cv">O(log N)</span></div>
                        <div className="state-row"><span>Step:</span> <span className="cv">{stepIdx + 1} / {steps.length || 0}</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
