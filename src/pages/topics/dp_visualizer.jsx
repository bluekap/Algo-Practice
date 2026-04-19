import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const MODES = [
    {
        label: "Climbing Stairs",
        tc: "O(n)", sc: "O(n)",
        inputs: [{ id: "n", label: "n (stairs)", default: "8" }],
        code: [
            "def climbStairs(n):",
            "    if n <= 1: return 1",
            "    dp = [0] * (n + 1)",
            "    dp[0], dp[1] = 1, 1",
            "    for i in range(2, n + 1):",
            "        dp[i] = dp[i-1] + dp[i-2]",
            "    return dp[n]"
        ],
        type: '1d'
    },
    {
        label: "House Robber",
        tc: "O(n)", sc: "O(n)",
        inputs: [{ id: "houses", label: "House values", default: "2,7,9,3,1,6,4" }],
        code: [
            "def rob(nums):",
            "    if not nums: return 0",
            "    if len(houses) == 1: return nums[0]",
            "    dp = [0] * len(nums)",
            "    dp[0] = nums[0]",
            "    dp[1] = max(nums[0], nums[1])",
            "    for i in range(2, len(nums)):",
            "        dp[i] = max(dp[i-1], dp[i-2] + nums[i])",
            "    return dp[-1]"
        ],
        type: '1d'
    },
    {
        label: "Coin Change",
        tc: "O(amount × coins)", sc: "O(amount)",
        inputs: [
            { id: "coins", label: "Coins", default: "1,3,4,5" },
            { id: "amount", label: "Amount", default: "7" }
        ],
        code: [
            "def coinChange(coins, amount):",
            "    dp = [inf] * (amount + 1)",
            "    dp[0] = 0",
            "    for coin in coins:",
            "        for w in range(coin, amount+1):",
            "            dp[w] = min(dp[w], dp[w - coin] + 1)",
            "    return dp[amount] if dp[amount]!=inf else -1"
        ],
        type: '1d'
    },
    {
        label: "LCS",
        tc: "O(m × n)", sc: "O(m × n)",
        inputs: [
            { id: "s1", label: "String 1", default: "ABCBDAB" },
            { id: "s2", label: "String 2", default: "BDCAB" }
        ],
        code: [
            "def lcs(s1, s2):",
            "    m, n = len(s1), len(s2)",
            "    dp = [[0]*(n+1) for _ in range(m+1)]",
            "    for i in range(1, m+1):",
            "        for j in range(1, n+1):",
            "            if s1[i-1] == s2[j-1]:",
            "                dp[i][j] = dp[i-1][j-1] + 1",
            "            else:",
            "                dp[i][j] = max(dp[i-1][j], dp[i][j-1])",
            "    return dp[m][n]"
        ],
        type: '2d'
    },
    {
        label: "Min Path Sum",
        tc: "O(m × n)", sc: "O(m × n)",
        inputs: [{ id: "grid", label: "Grid rows (;-separated)", default: "1,3,1;1,5,1;4,2,1" }],
        code: [
            "def minPathSum(grid):",
            "    m, n = len(grid), len(grid[0])",
            "    dp = [[0]*n for _ in range(m)]",
            "    dp[0][0] = grid[0][0]",
            "    for i in range(1,m): dp[i][0]=dp[i-1][0]+grid[i][0]",
            "    for j in range(1,n): dp[0][j]=dp[0][j-1]+grid[0][j]",
            "    for i in range(1, m):",
            "        for j in range(1, n):",
            "            dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])",
            "    return dp[m-1][n-1]"
        ],
        type: '2d'
    }
];

export default function DpVisualizer() {
    const [modeIdx, setModeIdx] = useState(0);
    const [inputs, setInputs] = useState({});
    const [steps, setSteps] = useState([]);
    const [stepIdx, setStepIdx] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [vizData, setVizData] = useState(null);
    const playTimerRef = useRef(null);

    const mode = MODES[modeIdx];

    // Initialize inputs when mode changes
    useEffect(() => {
        const initial = {};
        mode.inputs.forEach(inp => initial[inp.id] = inp.default);
        setInputs(initial);
        resetViz();
    }, [modeIdx]);

    useEffect(() => {
        if (isPlaying) {
            playTimerRef.current = setInterval(() => {
                setStepIdx(prev => {
                    if (prev < steps.length - 1) return prev + 1;
                    setIsPlaying(false);
                    return prev;
                });
            }, 600);
        } else {
            clearInterval(playTimerRef.current);
        }
        return () => clearInterval(playTimerRef.current);
    }, [isPlaying, steps]);

    const resetViz = () => {
        setIsPlaying(false);
        setSteps([]);
        setStepIdx(0);
        setVizData(null);
    };

    const startViz = () => {
        resetViz();
        let data;
        if (mode.label === "Climbing Stairs") data = generateClimbingStairs(inputs.n);
        else if (mode.label === "House Robber") data = generateHouseRobber(inputs.houses);
        else if (mode.label === "Coin Change") data = generateCoinChange(inputs.coins, inputs.amount);
        else if (mode.label === "LCS") data = generateLCS(inputs.s1, inputs.s2);
        else if (mode.label === "Min Path Sum") data = generateMinPath(inputs.grid);
        
        setSteps(data.steps);
        setVizData(data);
    };

    const generateClimbingStairs = (nStr) => {
        const n = parseInt(nStr) || 8;
        const dp = new Array(n + 1).fill(null);
        const s = [];
        s.push({ dp: [...dp], active: -1, sources: [], line: 0, msg: `Start: <code>climbStairs(${n})</code>. We'll build dp[0..${n}].` });
        if (n <= 1) {
            s.push({ dp: [...dp], active: -1, sources: [], line: 1, msg: `n ≤ 1, return 1 directly.` });
            return { steps: s, type: '1d', n: n + 1 };
        }
        s.push({ dp: [...dp], active: -1, sources: [], line: 2, msg: `Create dp array of size ${n + 1}, all zeros.` });
        dp[0] = 1; dp[1] = 1;
        s.push({ dp: [...dp], active: 0, sources: [], line: 3, msg: `Base cases: <code>dp[0] = 1</code>, <code>dp[1] = 1</code>.` });
        for (let i = 2; i <= n; i++) {
            s.push({ dp: [...dp], active: i, sources: [i - 1, i - 2], line: 4, msg: `computing <code>dp[${i}]</code>. From step ${i - 1} or ${i - 2}.` });
            dp[i] = dp[i - 1] + dp[i - 2];
            s.push({ dp: [...dp], active: i, sources: [i - 1, i - 2], line: 5, msg: `<code>dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${dp[i]}</code>` });
        }
        s.push({ dp: [...dp], active: n, sources: [], line: 6, msg: `Done! Answer: <code>dp[${n}] = ${dp[n]}</code>` });
        return { steps: s, type: '1d', n: n + 1 };
    };

    const generateHouseRobber = (housesStr) => {
        const nums = housesStr.split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x));
        const n = nums.length;
        const dp = new Array(n).fill(null);
        const s = [];
        s.push({ dp: [...dp], active: -1, sources: [], line: 0, msg: `Start: <code>rob([${nums}])</code>. dp[i] = max money robbing houses 0..i.` });
        dp[0] = nums[0];
        s.push({ dp: [...dp], active: 0, sources: [], line: 4, msg: `Base: <code>dp[0] = nums[0] = ${nums[0]}</code>.` });
        if (n > 1) {
            dp[1] = Math.max(nums[0], nums[1]);
            s.push({ dp: [...dp], active: 1, sources: [0], line: 5, msg: `Base: <code>dp[1] = max(${nums[0]}, ${nums[1]}) = ${dp[1]}</code>.` });
        }
        for (let i = 2; i < n; i++) {
            s.push({ dp: [...dp], active: i, sources: [i - 1, i - 2], line: 6, msg: `<code>dp[${i}]</code>: skip house ${i} OR rob it (dp[${i-2}] + nums[${i}]).` });
            dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
            s.push({ dp: [...dp], active: i, sources: [i - 1, i - 2], line: 7, msg: `<code>dp[${i}] = max(${dp[i-1]}, ${dp[i-2]}+${nums[i]}) = ${dp[i]}</code>` });
        }
        s.push({ dp: [...dp], active: n - 1, sources: [], line: 8, msg: `Done! Max: <code>${dp[n - 1]}</code>` });
        return { steps: s, type: '1d', n, labels: nums.map((v, i) => `h${i}:${v}`) };
    };

    const generateCoinChange = (coinsStr, amountStr) => {
        const coins = coinsStr.split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x));
        const amount = parseInt(amountStr) || 7;
        const INF = 9999;
        const dp = new Array(amount + 1).fill(INF);
        dp[0] = 0;
        const s = [];
        s.push({ dp: [...dp], active: -1, sources: [], line: 0, msg: `Start: coins=[${coins}], amount=${amount}.` });
        s.push({ dp: [...dp], active: 0, sources: [], line: 2, msg: `Base: <code>dp[0] = 0</code>.` });
        for (const coin of coins) {
            s.push({ dp: [...dp], active: -1, sources: [], line: 3, msg: `Coin = ${coin}.` });
            for (let w = coin; w <= amount; w++) {
                const prev = dp[w];
                s.push({ dp: [...dp], active: w, sources: [w - coin], line: 4, msg: `<code>dp[${w}] = min(${prev===INF?'∞':prev}, dp[${w-coin}]+1)</code>` });
                dp[w] = Math.min(dp[w], dp[w - coin] + 1);
                s.push({ dp: [...dp], active: w, sources: [w - coin], line: 5, msg: `Updated: <code>dp[${w}] = ${dp[w]}</code>` });
            }
        }
        s.push({ dp: [...dp], active: amount, sources: [], line: 6, msg: `Done! Ans: <code>${dp[amount]===INF?-1:dp[amount]}</code>` });
        return { steps: s, type: '1d', n: amount + 1, displayInf: true };
    };

    const generateLCS = (s1, s2) => {
        const m = s1.length, n = s2.length;
        const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
        const s = [];
        s.push({ dp: dp.map(r => [...r]), active: null, sources: [], line: 0, msg: `LCS of "${s1}" and "${s2}".` });
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                const match = s1[i - 1] === s2[j - 1];
                s.push({ dp: dp.map(r => [...r]), active: [i, j], sources: match ? [[i - 1, j - 1]] : [[i - 1, j], [i, j - 1]], line: match ? 6 : 8, msg: match ? `Match! <code>dp[${i}][${j}] = ${dp[i-1][j-1]+1}</code>` : `Mismatch. max side/above.` });
                dp[i][j] = match ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
        s.push({ dp: dp.map(r => [...r]), active: [m, n], sources: [], line: 9, msg: `Done! LCS: <code>${dp[m][n]}</code>` });
        return { steps: s, type: '2d', rows: m + 1, cols: n + 1, rowLabels: ['', ...s1.split('')], colLabels: ['', ...s2.split('')] };
    };

    const generateMinPath = (gridStr) => {
        const grid = gridStr.split(';').map(row => row.split(',').map(x => parseInt(x.trim())));
        const m = grid.length, n = grid[0].length;
        const dp = Array.from({ length: m }, () => new Array(n).fill(0));
        const s = [];
        dp[0][0] = grid[0][0];
        s.push({ dp: dp.map(r => [...r]), active: [0, 0], sources: [], line: 3, msg: `Base: <code>dp[0][0] = ${dp[0][0]}</code>` });
        for (let i = 1; i < m; i++) {
            dp[i][0] = dp[i - 1][0] + grid[i][0];
            s.push({ dp: dp.map(r => [...r]), active: [i, 0], sources: [[i - 1, 0]], line: 4, msg: `Col 0: <code>${dp[i][0]}</code>` });
        }
        for (let j = 1; j < n; j++) {
            dp[0][j] = dp[0][j - 1] + grid[0][j];
            s.push({ dp: dp.map(r => [...r]), active: [0, j], sources: [[0, j - 1]], line: 5, msg: `Row 0: <code>${dp[0][j]}</code>` });
        }
        for (let i = 1; i < m; i++) {
            for (let j = 1; j < n; j++) {
                s.push({ dp: dp.map(r => [...r]), active: [i, j], sources: [[i - 1, j], [i, j - 1]], line: 8, msg: `min(above, left) + current.` });
                dp[i][j] = grid[i][j] + Math.min(dp[i - 1][j], dp[i][j - 1]);
            }
        }
        s.push({ dp: dp.map(r => [...r]), active: [m - 1, n - 1], sources: [], line: 10, msg: `Done! Sum: <code>${dp[m - 1][n - 1]}</code>` });
        return { steps: s, type: '2d', rows: m, cols: n };
    };

    const currentStep = steps[stepIdx] || null;

    return (
        <div className="topic-page">
            <div className="viz-header">
                <Link to="/topics/dp" className="nav-back">
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Hub
                </Link>
                <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 8px' }}></div>
                <span className="header-title">⚡ DP Visual Playground</span>
                <div className="header-spacer"></div>
                <div className="tabs">
                    {MODES.map((m, i) => (
                        <button key={i} className={`tab ${modeIdx === i ? 'active' : ''}`} onClick={() => setModeIdx(i)}>{m.label}</button>
                    ))}
                </div>
            </div>

            <div className="viz-container">
                <div className="viz-main">
                    <div className="controls">
                        {mode.inputs.map(inp => (
                            <div key={inp.id} className="input-group">
                                <label>{inp.label}</label>
                                <input 
                                    value={inputs[inp.id] || ''} 
                                    onChange={(e) => setInputs({...inputs, [inp.id]: e.target.value})}
                                    onBlur={resetViz}
                                />
                            </div>
                        ))}
                        <button className="btn btn-primary" onClick={startViz}>START</button>
                    </div>

                    <div className="viz-area">
                        {vizData && (
                            <table className="dp-table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        {vizData.type === '1d' ? (
                                            Array.from({ length: vizData.n }).map((_, i) => (
                                                <th key={i}>{vizData.labels ? vizData.labels[i] : `i=${i}`}</th>
                                            ))
                                        ) : (
                                            Array.from({ length: vizData.cols }).map((_, j) => (
                                                <th key={j}>{vizData.colLabels ? vizData.colLabels[j] : `j=${j}`}</th>
                                            ))
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {vizData.type === '1d' ? (
                                        <tr>
                                            <th>dp</th>
                                            {Array.from({ length: vizData.n }).map((_, i) => {
                                                const isActive = currentStep.active === i;
                                                const isSource = currentStep.sources.includes(i);
                                                const val = currentStep.dp[i];
                                                const displayVal = val === null ? '' : (val === 9999 ? '∞' : val);
                                                return <td key={i} className={`${isActive ? 'active' : ''} ${isSource ? 'source' : ''} ${val !== null ? 'filled' : ''}`}>{displayVal}</td>;
                                            })}
                                        </tr>
                                    ) : (
                                        Array.from({ length: vizData.rows }).map((_, i) => (
                                            <tr key={i}>
                                                <th>{vizData.rowLabels ? vizData.rowLabels[i] : `i=${i}`}</th>
                                                {Array.from({ length: vizData.cols }).map((_, j) => {
                                                    const isActive = currentStep.active?.[0] === i && currentStep.active?.[1] === j;
                                                    const isSource = currentStep.sources.some(s => s[0] === i && s[1] === j);
                                                    const val = currentStep.dp[i][j];
                                                    return <td key={j} className={`${isActive ? 'active' : ''} ${isSource ? 'source' : ''} ${val !== 0 || (i===0 && j===0) ? 'filled' : ''}`}>{val}</td>;
                                                })}
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
                        {!vizData && (
                            <div className="viz-empty">
                                <div className="icon" style={{ fontSize: '32px', marginBottom: '12px' }}>⚡</div>
                                <p style={{ color: 'var(--text-muted)' }}>Set inputs and press START to build the table</p>
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
                        {currentStep ? (
                            <div dangerouslySetInnerHTML={{ __html: currentStep.msg }} />
                        ) : (
                            "Press START to begin execution log."
                        )}
                    </div>
                </div>

                <div className="viz-sidebar">
                    <div className="code-window">
                        {mode.code.map((line, i) => (
                            <div key={i} className={`code-line ${currentStep?.line === i ? 'active' : ''}`}>
                                <div className="ln">{i + 1}</div>
                                <div className="lc">{line}</div>
                            </div>
                        ))}
                    </div>
                    <div className="complexity-bar">
                        <div className="state-row"><span>Time:</span> <span className="cv">{mode.tc}</span></div>
                        <div className="state-row"><span>Space:</span> <span className="cv">{mode.sc}</span></div>
                        <div className="state-row"><span>Step:</span> <span className="cv">{stepIdx + 1} / {steps.length || 0}</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
