import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const initialTree = {
    val: 1,
    left: {
        val: 2,
        left: { val: 4, left: null, right: null },
        right: { val: 5, left: null, right: null }
    },
    right: {
        val: 3,
        left: { val: 6, left: null, right: null },
        right: { val: 7, left: null, right: null }
    }
};

export default function TreeVisualizer() {
    const [tree, setTree] = useState(initialTree);
    const [traversalResult, setTraversalResult] = useState([]);
    const [activeNode, setActiveNode] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(800);
    const [traversalType, setTraversalType] = useState('inorder');
    const abortControllerRef = useRef(null);

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const generateSequence = (type, root) => {
        let seq = [];
        if (type === 'preorder') {
            const dfs = (node) => {
                if (!node) return;
                seq.push(node.val);
                dfs(node.left);
                dfs(node.right);
            };
            dfs(root);
        } else if (type === 'inorder') {
            const dfs = (node) => {
                if (!node) return;
                dfs(node.left);
                seq.push(node.val);
                dfs(node.right);
            };
            dfs(root);
        } else if (type === 'postorder') {
            const dfs = (node) => {
                if (!node) return;
                dfs(node.left);
                dfs(node.right);
                seq.push(node.val);
            };
            dfs(root);
        } else if (type === 'levelorder') {
            if (!root) return seq;
            let queue = [root];
            while (queue.length > 0) {
                let node = queue.shift();
                seq.push(node.val);
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }
        }
        return seq;
    };

    const startTraversal = async () => {
        if (isPlaying) return;
        setIsPlaying(true);
        setTraversalResult([]);
        setActiveNode(null);

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        const sequence = generateSequence(traversalType, tree);

        for (let i = 0; i < sequence.length; i++) {
            if (abortController.signal.aborted) break;
            
            const val = sequence[i];
            setActiveNode(val);
            
            await sleep(speed);
            
            if (abortController.signal.aborted) break;
            
            setTraversalResult(prev => [...prev, val]);
        }
        
        if (!abortController.signal.aborted) {
            setActiveNode(null);
            setIsPlaying(false);
        }
    };

    const reset = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        setIsPlaying(false);
        setTraversalResult([]);
        setActiveNode(null);
    };

    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    // SVG rendering for tree
    const renderTree = (node, x, y, dx) => {
        if (!node) return null;

        const R = 20;
        const items = [];

        // Draw edges first so they are behind nodes
        if (node.left) {
            items.push(
                <line 
                    key={\`edge-\${node.val}-\${node.left.val}\`}
                    x1={x} y1={y} 
                    x2={x - dx} y2={y + 60}
                    stroke="#555" strokeWidth="2"
                />
            );
            items.push(...renderTree(node.left, x - dx, y + 60, dx / 2));
        }
        if (node.right) {
            items.push(
                <line 
                    key={\`edge-\${node.val}-\${node.right.val}\`}
                    x1={x} y1={y} 
                    x2={x + dx} y2={y + 60}
                    stroke="#555" strokeWidth="2"
                />
            );
            items.push(...renderTree(node.right, x + dx, y + 60, dx / 2));
        }

        // Draw node
        const isActive = activeNode === node.val;
        const isVisited = traversalResult.includes(node.val);

        let fill = "#1e293b"; // default bg
        let stroke = "#3b82f6"; // default border
        
        if (isActive) {
            fill = "#3b82f6"; // active bg
            stroke = "#60a5fa";
        } else if (isVisited) {
            fill = "#166534"; // visited bg
            stroke = "#4ade80";
        }

        items.push(
            <g key={\`node-\${node.val}\`} className="transition-all duration-300">
                <circle cx={x} cy={y} r={R} fill={fill} stroke={stroke} strokeWidth="2" />
                <text x={x} y={y} textAnchor="middle" dy=".3em" fill="#fff" fontSize="14" fontWeight="bold">
                    {node.val}
                </text>
            </g>
        );

        return items;
    };

    return (
        <div className="topic-page">
            <div className="page-header">
                <Link to="/topics/trees" className="nav-back">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Masterclass
                </Link>
                <h1>🌲 Tree Visualizer</h1>
                <p>Visualize DFS (Preorder, Inorder, Postorder) and BFS (Level Order) traversals.</p>
            </div>

            <main style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
                <div className="viz-controls" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '20px', alignItems: 'center', background: '#1e293b', padding: '15px', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <label style={{ color: '#fff' }}>Traversal Type:</label>
                        <select 
                            value={traversalType} 
                            onChange={(e) => { setTraversalType(e.target.value); reset(); }}
                            disabled={isPlaying}
                            style={{ padding: '8px', borderRadius: '4px', background: '#334155', color: '#fff', border: '1px solid #475569' }}
                        >
                            <option value="preorder">Preorder (Root, Left, Right)</option>
                            <option value="inorder">Inorder (Left, Root, Right)</option>
                            <option value="postorder">Postorder (Left, Right, Root)</option>
                            <option value="levelorder">Level Order (BFS)</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <label style={{ color: '#fff' }}>Speed:</label>
                        <input 
                            type="range" min="100" max="2000" step="100" 
                            value={2100 - speed} 
                            onChange={(e) => setSpeed(2100 - parseInt(e.target.value))}
                            style={{ width: '100px' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
                        <button 
                            className="action-btn"
                            style={{ background: isPlaying ? '#475569' : '#3b82f6', color: '#fff', padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: isPlaying ? 'not-allowed' : 'pointer' }}
                            onClick={startTraversal}
                            disabled={isPlaying}
                        >
                            {isPlaying ? 'Playing...' : '▶ Play Traversal'}
                        </button>
                        <button 
                            className="action-btn"
                            style={{ background: '#ef4444', color: '#fff', padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
                            onClick={reset}
                        >
                            Reset
                        </button>
                    </div>
                </div>

                <div className="viz-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    
                    <div className="tree-view" style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                        <svg width="600" height="250">
                            {renderTree(tree, 300, 30, 120)}
                        </svg>
                    </div>

                    <div className="array-view" style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', padding: '20px' }}>
                        <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#e2e8f0', fontSize: '16px' }}>
                            Traversal Result {traversalResult.length > 0 ? \`(\${traversalResult.length}/7)\` : ''}
                        </h3>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', minHeight: '40px' }}>
                            {traversalResult.map((val, idx) => (
                                <div 
                                    key={idx}
                                    style={{
                                        width: '40px', height: '40px',
                                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                                        background: '#166534',
                                        border: '2px solid #4ade80',
                                        borderRadius: '8px',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        fontSize: '18px',
                                        animation: 'popIn 0.3s ease-out'
                                    }}
                                >
                                    {val}
                                </div>
                            ))}
                            {traversalResult.length === 0 && !isPlaying && (
                                <span style={{ color: '#64748b', fontStyle: 'italic', display: 'flex', alignItems: 'center' }}>
                                    Click "Play Traversal" to start
                                </span>
                            )}
                        </div>
                    </div>

                </div>

                <style dangerouslySetInnerHTML={{__html: \`
                    @keyframes popIn {
                        0% { transform: scale(0.5); opacity: 0; }
                        70% { transform: scale(1.1); }
                        100% { transform: scale(1); opacity: 1; }
                    }
                \`}} />
            </main>
        </div>
    );
}
