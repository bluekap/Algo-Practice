import React, { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

// ── Graph definition ──────────────────────────────────────────────
const NODES = [
    { id: 0, x: 300, y: 60,  label: 'A' },
    { id: 1, x: 150, y: 170, label: 'B' },
    { id: 2, x: 450, y: 170, label: 'C' },
    { id: 3, x: 80,  y: 300, label: 'D' },
    { id: 4, x: 260, y: 300, label: 'E' },
    { id: 5, x: 420, y: 300, label: 'F' },
    { id: 6, x: 560, y: 300, label: 'G' },
];

// Undirected weighted edges: [u, v, weight]
const EDGES = [
    [0, 1, 4], [0, 2, 2],
    [1, 3, 5], [1, 4, 1],
    [2, 4, 8], [2, 5, 3], [2, 6, 7],
    [3, 4, 2],
    [5, 6, 1],
];

function buildAdj(weighted = false) {
    const adj = Array.from({ length: NODES.length }, () => []);
    EDGES.forEach(([u, v, w]) => {
        if (weighted) {
            adj[u].push({ node: v, w });
            adj[v].push({ node: u, w });
        } else {
            adj[u].push(v);
            adj[v].push(u);
        }
    });
    return adj;
}

const ALGO_CODE = {
    bfs: [
        "def bfs(start_node):",
        "    visited = {start_node}",
        "    queue = deque([start_node])",
        "    while queue:",
        "        node = queue.popleft()",
        "        for nb in adj[node]:",
        "            if nb not in visited:",
        "                visited.add(nb)",
        "                queue.append(nb)"
    ],
    dfs: [
        "def dfs(start_node):",
        "    visited = set()",
        "    stack = [start_node]",
        "    while stack:",
        "        node = stack.pop()",
        "        if node not in visited:",
        "            visited.add(node)",
        "            for nb in adj[node]:",
        "                stack.append(nb)"
    ],
    dijkstra: [
        "def dijkstra(start):",
        "    dist = [inf] * n",
        "    dist[start] = 0",
        "    pq = [(0, start)]",
        "    while pq:",
        "        d, u = heappop(pq)",
        "        if d > dist[u]: continue",
        "        for v, w in adj[u]:",
        "            if d + w < dist[v]:",
        "                dist[v] = d + w",
        "                heappush(pq, (dist[v], v))"
    ],
    'union-find': [
        "def union(x, y):",
        "    rx, ry = find(x), find(y)",
        "    if rx != ry:",
        "        if rank[rx] < rank[ry]:",
        "            parent[rx] = ry",
        "        elif rank[rx] > rank[ry]:",
        "            parent[ry] = rx",
        "        else:",
        "            parent[ry] = rx",
        "            rank[rx] += 1"
    ]
};

// ── Algorithm runners (return step snapshots) ────────────────────
function runBFS(start) {
    const adj = buildAdj(false);
    const steps = [];
    const visited = new Set([start]);
    const queue = [start];
    steps.push({ visited: new Set(visited), queue: [...queue], current: null, line: 2, info: `Init: push start node ${NODES[start].label} into queue.` });
    while (queue.length > 0) {
        steps.push({ visited: new Set(visited), queue: [...queue], current: null, line: 3, info: "Check if queue is empty." });
        const node = queue.shift();
        steps.push({ visited: new Set(visited), queue: [...queue], current: node, line: 4, info: `Pop ${NODES[node].label} from queue. Explore neighbors.` });
        for (const nb of adj[node]) {
            steps.push({ visited: new Set(visited), queue: [...queue], current: node, line: 5, info: `Checking neighbor ${NODES[nb].label}.` });
            if (!visited.has(nb)) {
                visited.add(nb);
                queue.push(nb);
                steps.push({ visited: new Set(visited), queue: [...queue], current: node, line: 9, info: `Visit ${NODES[nb].label} → add to queue.` });
            }
        }
    }
    steps.push({ visited: new Set(visited), queue: [], current: null, line: -1, info: 'BFS complete! All reachable nodes visited.' });
    return steps;
}

function runDFS(start) {
    const adj = buildAdj(false);
    const steps = [];
    const visited = new Set();
    const stack = [start];
    steps.push({ visited: new Set(visited), stack: [start], current: null, line: 2, info: `Init: push start node ${NODES[start].label} onto stack.` });
    while (stack.length > 0) {
        steps.push({ visited: new Set(visited), stack: [...stack], current: null, line: 3, info: "Check if stack is empty." });
        const node = stack.pop();
        steps.push({ visited: new Set(visited), stack: [...stack], current: node, line: 4, info: `Pop ${NODES[node].label} from stack.` });
        if (visited.has(node)) {
            steps.push({ visited: new Set(visited), stack: [...stack], current: node, line: 5, info: `${NODES[node].label} already visited, skip.` });
            continue;
        }
        visited.add(node);
        steps.push({ visited: new Set(visited), stack: [...stack], current: node, line: 6, info: `Visit ${NODES[node].label}. Explore neighbors.` });
        const neighbors = [...adj[node]].reverse();
        for (const nb of neighbors) {
            if (!visited.has(nb)) {
                stack.push(nb);
                steps.push({ visited: new Set(visited), stack: [...stack], current: node, line: 8, info: `Push neighbor ${NODES[nb].label} onto stack.` });
            }
        }
    }
    steps.push({ visited: new Set(visited), stack: [], current: null, line: -1, info: 'DFS complete! All reachable nodes visited.' });
    return steps;
}

function runDijkstra(start) {
    const adj = buildAdj(true);
    const n = NODES.length;
    const dist = Array(n).fill(Infinity);
    dist[start] = 0;
    const visited = new Set();
    const steps = [];
    steps.push({ dist: [...dist], visited: new Set(), current: null, line: 3, info: `Init: dist[${NODES[start].label}]=0, all others=∞. Push to PQ.` });

    while (visited.size < n) {
        let u = -1;
        for (let i = 0; i < n; i++) {
            if (!visited.has(i) && dist[i] < Infinity) {
                if (u === -1 || dist[i] < dist[u]) u = i;
            }
        }
        if (u === -1) break;
        steps.push({ dist: [...dist], visited: new Set(visited), current: u, line: 5, info: `Pop cheapest from PQ: ${NODES[u].label} (dist=${dist[u]})` });
        
        visited.add(u);
        steps.push({ dist: [...dist], visited: new Set(visited), current: u, line: 7, info: `Iterate neighbors of ${NODES[u].label}.` });
        
        for (const { node: v, w } of adj[u]) {
            steps.push({ dist: [...dist], visited: new Set(visited), current: u, line: 8, info: `Checking edge ${NODES[u].label}→${NODES[v].label} (w=${w}).` });
            if (!visited.has(v) && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                steps.push({ dist: [...dist], visited: new Set(visited), current: u, line: 10, info: `Relax: New shortest distance to ${NODES[v].label} is ${dist[v]}.` });
            }
        }
    }
    steps.push({ dist: [...dist], visited: new Set(visited), current: null, line: -1, info: 'Dijkstra complete! Shortest distances found.' });
    return steps;
}

// ── Union-Find helper ────────────────────────────────────────────
function makeUF(n) {
    const parent = Array.from({ length: n }, (_, i) => i);
    const rank = Array(n).fill(0);
    function find(x) {
        if (parent[x] !== x) parent[x] = find(parent[x]);
        return parent[x];
    }
    function union(x, y) {
        const rx = find(x), ry = find(y);
        if (rx === ry) return false;
        if (rank[rx] < rank[ry]) parent[rx] = ry;
        else if (rank[rx] > rank[ry]) parent[ry] = rx;
        else { parent[ry] = rx; rank[rx]++; }
        return true;
    }
    function components() { return new Set(parent.map((_, i) => find(i))).size; }
    return { parent, find, union, components };
}

// ── SVG Graph renderer ───────────────────────────────────────────
function GraphSVG({ mode, stepData, ufState, onNodeClick }) {
    const edgeColor = (u, v) => {
        if (!stepData) return '#334155';
        if (mode === 'dijkstra' && stepData.visited) {
            if (stepData.visited.has(u) && stepData.visited.has(v)) return '#f59e0b88';
        }
        return '#334155';
    };

    const nodeColor = (id) => {
        if (mode === 'union-find' && ufState) {
            const root = ufState.parent ? getRootOf(id, ufState.parent) : id;
            const palette = ['#3b82f6','#10b981','#f59e0b','#ef4444','#a855f7','#ec4899','#14b8a6'];
            return palette[root % palette.length];
        }
        if (!stepData) return '#1e293b';
        const { current, visited } = stepData;
        if (current === id) return '#7c3aed';
        if (visited && visited.has(id)) return '#166534';
        return '#1e293b';
    };

    const nodeBorder = (id) => {
        if (!stepData) return '#3b82f6';
        const { current, visited } = stepData;
        if (current === id) return '#c084fc';
        if (visited && visited.has(id)) return '#4ade80';
        return '#3b82f6';
    };

    const distLabel = (id) => {
        if (mode !== 'dijkstra' || !stepData) return null;
        const d = stepData.dist[id];
        return d === Infinity ? '∞' : String(d);
    };

    return (
        <svg width="100%" height="380" viewBox="0 0 640 380" style={{ display: 'block', margin: '0 auto' }}>
            {/* Edge weights */}
            {EDGES.map(([u, v, w], i) => {
                const nu = NODES[u], nv = NODES[v];
                const mx = (nu.x + nv.x) / 2, my = (nu.y + nv.y) / 2;
                return (
                    <g key={`ew-${i}`}>
                        <line x1={nu.x} y1={nu.y} x2={nv.x} y2={nv.y} stroke={edgeColor(u, v)} strokeWidth="2" />
                        {mode === 'dijkstra' && (
                            <text x={mx} y={my - 6} textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">{w}</text>
                        )}
                    </g>
                );
            })}
            {/* Nodes */}
            {NODES.map(node => (
                <g
                    key={node.id}
                    style={{ cursor: mode === 'union-find' ? 'pointer' : 'default' }}
                    onClick={() => onNodeClick && onNodeClick(node.id)}
                >
                    <circle cx={node.x} cy={node.y} r={24} fill={nodeColor(node.id)} stroke={nodeBorder(node.id)} strokeWidth="2.5" />
                    <text x={node.x} y={node.y} textAnchor="middle" dy=".35em" fill="#fff" fontSize="15" fontWeight="bold">{node.label}</text>
                    {distLabel(node.id) !== null && (
                        <text x={node.x} y={node.y + 38} textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="700">{distLabel(node.id)}</text>
                    )}
                    {mode === 'union-find' && ufState && (
                        <text x={node.x} y={node.y + 38} textAnchor="middle" fill="#94a3b8" fontSize="11">
                            root:{NODES[getRootOf(node.id, ufState.parent)].label}
                        </text>
                    )}
                </g>
            ))}
        </svg>
    );
}

function getRootOf(x, parent) {
    while (parent[x] !== x) x = parent[x];
    return x;
}

// ── Main component ───────────────────────────────────────────────
export default function GraphVisualizer() {
    const [mode, setMode] = useState('bfs');
    const [startNode, setStartNode] = useState(0);
    const [steps, setSteps] = useState([]);
    const [stepIdx, setStepIdx] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(700);
    const intervalRef = useRef(null);

    // Union Find state
    const [ufState, setUfState] = useState(null);
    const [ufPending, setUfPending] = useState(null);
    const [ufLog, setUfLog] = useState([]);

    const currentStep = steps[stepIdx] ?? null;

    const stopPlaying = useCallback(() => {
        clearInterval(intervalRef.current);
        setIsPlaying(false);
    }, []);

    const handleRun = useCallback(() => {
        stopPlaying();
        let s = [];
        if (mode === 'bfs') s = runBFS(startNode);
        else if (mode === 'dfs') s = runDFS(startNode);
        else if (mode === 'dijkstra') s = runDijkstra(startNode);
        setSteps(s);
        setStepIdx(0);
    }, [mode, startNode, stopPlaying]);

    const handlePlay = useCallback(() => {
        if (steps.length === 0) handleRun();
        setIsPlaying(true);
        let idx = stepIdx < 0 ? 0 : stepIdx;
        const stepsSnap = steps.length > 0 ? steps : (mode === 'bfs' ? runBFS(startNode) : mode === 'dfs' ? runDFS(startNode) : runDijkstra(startNode));
        if (steps.length === 0) setSteps(stepsSnap);
        intervalRef.current = setInterval(() => {
            idx++;
            if (idx >= stepsSnap.length) {
                clearInterval(intervalRef.current);
                setIsPlaying(false);
                setStepIdx(stepsSnap.length - 1);
            } else {
                setStepIdx(idx);
            }
        }, speed);
    }, [steps, stepIdx, mode, startNode, speed, handleRun]);

    const handleReset = useCallback(() => {
        stopPlaying();
        setSteps([]);
        setStepIdx(-1);
        setUfState(null);
        setUfPending(null);
        setUfLog([]);
    }, [stopPlaying]);

    // Union Find node click
    const handleNodeClick = useCallback((id) => {
        if (mode !== 'union-find') return;
        if (!ufState) {
            const uf = makeUF(NODES.length);
            setUfState({ parent: [...uf.parent], rank: [...uf.rank], uf });
            setUfPending(id);
            setUfLog([`Selected ${NODES[id].label} — click another node to union.`]);
            return;
        }
        if (ufPending === null) {
            setUfPending(id);
            setUfLog(prev => [...prev, `Selected ${NODES[id].label} — click another node to union.`]);
        } else {
            const a = ufPending, b = id;
            const uf = ufState.uf;
            const merged = uf.union(a, b);
            const newParent = [...uf.parent];
            setUfState(prev => ({ ...prev, parent: newParent }));
            setUfPending(null);
            const msg = merged
                ? `✅ Union(${NODES[a].label}, ${NODES[b].label}) — merged! Components: ${uf.components()}`
                : `⚡ ${NODES[a].label} & ${NODES[b].label} already connected.`;
            setUfLog(prev => [...prev, msg]);
        }
    }, [mode, ufState, ufPending]);

    const initUF = () => {
        const uf = makeUF(NODES.length);
        setUfState({ parent: [...uf.parent], rank: [...uf.rank], uf });
        setUfPending(null);
        setUfLog(['Click any node to begin. Click two nodes to union them.']);
    };

    const isUF = mode === 'union-find';

    return (
        <div className="topic-page">
            <div className="page-header">
                <Link to="/topics/graphs" className="nav-back">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Masterclass
                </Link>
                <h1>🕸️ Graph Visualizer</h1>
                <p>Animate BFS, DFS, Union Find, and Dijkstra on a live graph.</p>
            </div>

            <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
                {/* Mode selector */}
                <div className="tabs" style={{ marginBottom: '16px', justifyContent: 'center' }}>
                    {[
                        { key: 'bfs', label: '🌊 BFS' },
                        { key: 'dfs', label: '⬇️ DFS' },
                        { key: 'union-find', label: '🔗 Union Find' },
                        { key: 'dijkstra', label: '🗺️ Dijkstra' },
                    ].map(({ key, label }) => (
                        <button key={key} className={`tab ${mode === key ? 'active' : ''}`}
                            onClick={() => { setMode(key); handleReset(); }}>
                            {label}
                        </button>
                    ))}
                </div>

                <div className="viz-container">
                    <div className="viz-main">
                        <div className="controls">
                            {!isUF && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <label style={{ color: '#94a3b8', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase' }}>Start</label>
                                    <select value={startNode} onChange={e => { setStartNode(+e.target.value); handleReset(); }} disabled={isPlaying}
                                        style={{ background: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '6px', padding: '4px 8px', fontSize: '12px' }}>
                                        {NODES.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
                                    </select>
                                </div>
                            )}
                            {!isUF && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <label style={{ color: '#94a3b8', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase' }}>Speed</label>
                                    <input type="range" min="200" max="1500" step="100" value={1700 - speed}
                                        onChange={e => setSpeed(1700 - +e.target.value)}
                                        style={{ width: '80px' }} />
                                </div>
                            )}
                            <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
                                {isUF ? (
                                    <>
                                        <button className="btn btn-primary" onClick={initUF}>▶ Start</button>
                                        <button className="btn btn-ghost" onClick={handleReset}>Reset</button>
                                    </>
                                ) : (
                                    <>
                                        <button className="btn btn-primary" onClick={handleRun} disabled={isPlaying}>Step Mode</button>
                                        <button className="btn btn-primary" onClick={handlePlay} disabled={isPlaying || steps.length > 0 && stepIdx >= steps.length - 1}>
                                            {isPlaying ? '⏸ Pause' : (steps.length > 0 && stepIdx === steps.length - 1 ? '↺ Restart' : '▶ Play')}
                                        </button>
                                        <button className="btn btn-ghost" onClick={handleReset}>Reset</button>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="viz-area">
                            <div style={{ background: '#02040844', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px', width: '100%', minHeight: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <GraphSVG mode={mode} stepData={currentStep} ufState={ufState} onNodeClick={handleNodeClick} />
                            </div>
                        </div>

                        <div className="playback">
                            <button className="btn btn-ghost" onClick={() => setStepIdx(Math.max(0, stepIdx - 1))} disabled={isPlaying || stepIdx <= 0}>◀ Prev</button>
                            <button className="btn btn-ghost" onClick={() => setStepIdx(i => Math.min(i + 1, steps.length - 1))} disabled={isPlaying || stepIdx >= steps.length - 1 || steps.length === 0}>Next ▶</button>
                        </div>

                        <div className="explanation-box">
                            {isUF ? (
                                <div>
                                    {ufLog.length === 0
                                        ? <span style={{ color: '#475569', fontStyle: 'italic' }}>Click "Start" then select nodes to union them.</span>
                                        : ufLog.slice(-1).map((msg, i) => <div key={i}>{msg}</div>)
                                    }
                                </div>
                            ) : (
                                <div>
                                    {currentStep ? currentStep.info : <span style={{ color: '#475569', fontStyle: 'italic' }}>Press "Step Mode" or "Auto Play" to begin execution log.</span>}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="viz-sidebar">
                        <div className="code-window">
                            {(ALGO_CODE[mode] || []).map((line, i) => (
                                <div key={i} className={`code-line ${currentStep?.line === i ? 'active' : ''}`}>
                                    <div className="ln">{i + 1}</div>
                                    <div className="lc">{line}</div>
                                </div>
                            ))}
                        </div>
                        <div className="complexity-bar">
                            <div className="state-row"><span>Logic:</span> <span className="cv">{mode.toUpperCase()}</span></div>
                            <div className="state-row"><span>Step:</span> <span className="cv">{stepIdx >= 0 ? stepIdx + 1 : 0} / {steps.length}</span></div>
                            {!isUF && currentStep && (
                                <div className="state-row" style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
                                    <span>
                                        {mode === 'bfs' ? 'Queue' : mode === 'dfs' ? 'Stack' : 'Distances'}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Legend & Details */}
                <div style={{ marginTop: '20px', display: 'flex', gap: '24px', flexWrap: 'wrap', padding: '10px' }}>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Visual Legend</div>
                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                            {!isUF && [
                                { color: '#1e293b', border: '#3b82f6', label: 'Unvisited' },
                                { color: '#7c3aed', border: '#c084fc', label: 'Current' },
                                { color: '#166534', border: '#4ade80', label: 'Visited' },
                            ].map(({ color, border, label }) => (
                                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: color, border: `2px solid ${border}` }} />
                                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>{label}</span>
                                </div>
                            ))}
                            {isUF && <span style={{ fontSize: '12px', color: '#94a3b8' }}>Each color group shares the same root node (Component).</span>}
                        </div>
                    </div>
                    {mode === 'dijkstra' && currentStep && (
                        <div style={{ flex: 1, minWidth: '300px' }}>
                            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Current Distances</div>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {NODES.map((n, i) => (
                                    <div key={i} style={{ background: '#0d1117', border: '1px solid #1e293b', borderRadius: '6px', padding: '4px 10px', fontSize: '11px', fontFamily: 'monospace', color: currentStep.dist[i] === Infinity ? '#475569' : '#fbbf24' }}>
                                        {n.label}: {currentStep.dist[i] === Infinity ? '∞' : currentStep.dist[i]}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes popIn {
                    0% { transform: scale(0.7); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
            ` }} />
        </div>
    );
}

