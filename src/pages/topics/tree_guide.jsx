import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const treeData = {
    concepts: [
        {
            id: "intro", title: "Binary Trees", icon: "🌲",
            content: `A binary tree is a hierarchical data structure in which each node has at most two children, referred to as the left child and the right child.\n\n• **Root**: The topmost node of the tree.\n• **Leaf**: A node with no children.\n• **Depth/Height**: Number of edges from root to a node / node to deepest leaf.\n\nTrees are naturally recursive structures, making recursion the primary way to traverse and manipulate them.`,
            code: `class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\n# Creating a simple tree\n#       1\n#      / \\\n#     2   3\nroot = TreeNode(1)\nroot.left = TreeNode(2)\nroot.right = TreeNode(3)`
        },
        {
            id: "dfs", title: "DFS & Traversals", icon: "⬇️",
            content: `Depth-First Search (DFS) goes as deep as possible down one path before backtracking. There are three main ways to traverse a binary tree using DFS:\n\n• **Preorder (Root, Left, Right)**: Good for copying or serializing trees.\n• **Inorder (Left, Root, Right)**: Good for Binary Search Trees (returns sorted order).\n• **Postorder (Left, Right, Root)**: Good for deleting trees or calculating sizes (process children before parent).`,
            code: `def inorder_traversal(root):\n    res = []\n    def dfs(node):\n        if not node:\n            return\n        dfs(node.left)       # 1. Left\n        res.append(node.val) # 2. Root\n        dfs(node.right)      # 3. Right\n        \n    dfs(root)\n    return res`
        },
        {
            id: "bfs", title: "Level Order (BFS)", icon: "🌊",
            content: `Breadth-First Search (BFS) explores the tree level by level, from top to bottom, left to right. \n\nWe use a **Queue** to implement BFS.\n\nBFS is ideal for:\n• Finding the shortest path in an unweighted graph/tree.\n• Processing nodes level by level (e.g., right side view, level sums).`,
            code: `from collections import deque\n\ndef level_order(root):\n    if not root: return []\n    \n    res = []\n    queue = deque([root])\n    \n    while queue:\n        level_size = len(queue)\n        current_level = []\n        \n        for _ in range(level_size):\n            node = queue.popleft()\n            current_level.append(node.val)\n            \n            if node.left: queue.append(node.left)\n            if node.right: queue.append(node.right)\n            \n        res.append(current_level)\n        \n    return res`
        },
        {
            id: "bst", title: "Binary Search Trees", icon: "🔍",
            content: `A Binary Search Tree (BST) is a binary tree with a special property:\n\n• For any node, all nodes in its **left subtree** have values **strictly less** than the node's value.\n• All nodes in its **right subtree** have values **strictly greater** than the node's value.\n\nBecause of this, an **inorder traversal** of a BST yields a sorted array! Search, insert, and delete take O(log N) time on average (O(N) in worst case if unbalanced).`,
            code: `def searchBST(root, val):\n    # Base case: root is null or val is present at root\n    if not root or root.val == val:\n        return root\n        \n    # Value is greater than root's val\n    if root.val < val:\n        return searchBST(root.right, val)\n        \n    # Value is less than root's val\n    return searchBST(root.left, val)`
        },
        {
            id: "patterns", title: "Common Patterns", icon: "🎯",
            content: `Master these common tree patterns:\n\n**1. Recursion / DFS**: The bread and butter. Think "what does my current node need to do, and what do I return to my parent?"\n**2. BFS / Level Order**: Use a queue. Process level by level.\n**3. Lowest Common Ancestor (LCA)**: Finding where two nodes converge.\n**4. Tree Construction**: Building trees from traversal arrays (e.g., Preorder & Inorder).`,
            code: `def maxDepth(root):\n    # Base case\n    if not root:\n        return 0\n        \n    # Recursive step\n    left_depth = maxDepth(root.left)\n    right_depth = maxDepth(root.right)\n    \n    # Current node's work\n    return max(left_depth, right_depth) + 1`
        }
    ],
    problems: [
        {
            difficulty: "Easy", color: "#4ade80", dimColor: "#166534", bg: "#052e16",
            title: "Maximum Depth of Binary Tree", number: 104,
            link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
            pattern: "DFS",
            description: "Given the root of a binary tree, return its maximum depth. The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
            hint: "Think recursively. The depth of a node is 1 plus the maximum of the depths of its left and right subtrees.",
            solution: `class Solution:\n    def maxDepth(self, root: Optional[TreeNode]) -> int:\n        if not root:\n            return 0\n            \n        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))\n\n# Time: O(N) | Space: O(H) where H is tree height`
        },
        {
            difficulty: "Easy", color: "#4ade80", dimColor: "#166534", bg: "#052e16",
            title: "Invert Binary Tree", number: 226,
            link: "https://leetcode.com/problems/invert-binary-tree/",
            pattern: "DFS",
            description: "Given the root of a binary tree, invert the tree, and return its root.",
            hint: "At each node, swap its left and right children. Then recursively invert the left subtree and right subtree.",
            solution: `class Solution:\n    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:\n        if not root:\n            return None\n            \n        # Swap children\n        root.left, root.right = root.right, root.left\n        \n        # Recursively invert subtrees\n        self.invertTree(root.left)\n        self.invertTree(root.right)\n        \n        return root\n\n# Time: O(N) | Space: O(H)`
        },
        {
            difficulty: "Medium", color: "#facc15", dimColor: "#854d0e", bg: "#1c1400",
            title: "Binary Tree Level Order Traversal", number: 102,
            link: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
            pattern: "BFS",
            description: "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
            hint: "Use a queue. Process all nodes currently in the queue (one level), add their children to the queue, and repeat.",
            solution: `from collections import deque\n\nclass Solution:\n    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:\n        if not root:\n            return []\n            \n        res = []\n        queue = deque([root])\n        \n        while queue:\n            level_len = len(queue)\n            level = []\n            \n            for _ in range(level_len):\n                node = queue.popleft()\n                level.append(node.val)\n                \n                if node.left:\n                    queue.append(node.left)\n                if node.right:\n                    queue.append(node.right)\n                    \n            res.append(level)\n            \n        return res\n\n# Time: O(N) | Space: O(N)`
        },
        {
            difficulty: "Medium", color: "#facc15", dimColor: "#854d0e", bg: "#1c1400",
            title: "Lowest Common Ancestor of a Binary Search Tree", number: 235,
            link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
            pattern: "BST",
            description: "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.",
            hint: "Leverage the BST property. If both p and q are less than root, LCA is in left subtree. If both are greater, it's in right subtree. Otherwise, the current node is the LCA.",
            solution: `class Solution:\n    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':\n        curr = root\n        \n        while curr:\n            # Both p and q are greater than curr\n            if p.val > curr.val and q.val > curr.val:\n                curr = curr.right\n            # Both p and q are less than curr\n            elif p.val < curr.val and q.val < curr.val:\n                curr = curr.left\n            # We have found the split point (or one node is the ancestor of the other)\n            else:\n                return curr\n\n# Time: O(H) | Space: O(1)`
        }
    ]
};

const cheatsheetData = [
    { pattern: "DFS (Recursion)", desc: "Go deep. Good for structural queries (depth, paths).", color: "#4ade80" },
    { pattern: "BFS (Queue)", desc: "Level by level. Good for shortest path / level aggregations.", color: "#facc15" },
    { pattern: "BST Properties", desc: "Left < Root < Right. Inorder = sorted.", color: "#f87171" },
    { pattern: "LCA", desc: "Find split point where p and q diverge.", color: "#60a5fa" },
];

export default function TreeGuide() {
    const [activeTab, setActiveTab] = useState('learn');
    const [activeConceptId, setActiveConceptId] = useState('intro');
    const [expandedProblems, setExpandedProblems] = useState({});
    const [revealedSolutions, setRevealedSolutions] = useState({});

    const toggleProblem = (idx) => {
        setExpandedProblems(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    const toggleSolution = (idx) => {
        setRevealedSolutions(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    const activeConcept = treeData.concepts.find(c => c.id === activeConceptId);

    return (
        <div className="topic-page">
            <div className="page-header">
                <Link to="/topics/trees" className="nav-back">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Masterclass
                </Link>
                <h1>🌲 Trees in Python</h1>
                <p>Fundamentals → traversals → 4 LeetCode problems (Easy–Medium)</p>
                <div className="tabs" style={{ justifyContent: 'center', marginTop: '12px' }}>
                    <button 
                        className={`tab ${activeTab === 'learn' ? 'active' : ''}`}
                        onClick={() => setActiveTab('learn')}
                    >📚 Learn</button>
                    <button 
                        className={`tab ${activeTab === 'problems' ? 'active' : ''}`}
                        onClick={() => setActiveTab('problems')}
                    >🧩 Problems</button>
                </div>
            </div>

            <main>
                {activeTab === 'learn' && (
                    <section id="learn" className="content-section learn-container active">
                        <div className="side-nav" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                            {treeData.concepts.map(c => (
                                <button 
                                    key={c.id}
                                    className={`tab ${activeConceptId === c.id ? 'active' : ''}`}
                                    onClick={() => setActiveConceptId(c.id)}
                                    style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                                >
                                    <span>{c.icon}</span><span>{c.title}</span>
                                </button>
                            ))}
                        </div>

                        <div className="concept-content">
                            <div className="section-card">
                                <div className="section-card-header">
                                    <span style={{ fontSize: '18px' }}>{activeConcept.icon}</span>
                                    <h2>{activeConcept.title}</h2>
                                </div>
                                <div className="section-card-body">
                                    {activeConcept.content.split('\n').map((line, i) => (
                                        line.trim() === '' 
                                            ? <div key={i} style={{ height: '6px' }} /> 
                                            : <p key={i} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>') }}></p>
                                    ))}
                                </div>
                            </div>
                            <div className="code-container">
                                <div className="code-header">
                                    <div className="dots"><div className="dot red"></div><div className="dot yellow"></div><div className="dot green"></div></div>
                                    <span className="code-lang">python</span>
                                </div>
                                <pre>{activeConcept.code}</pre>
                            </div>
                        </div>
                    </section>
                )}

                {activeTab === 'problems' && (
                    <section id="problems" className="content-section active">
                        <p className="problems-intro">4 curated problems · Easy → Medium · covers all essential tree patterns</p>
                        <div id="problems-list">
                            {treeData.problems.map((p, idx) => (
                                <div key={idx} className={`problem-item ${expandedProblems[idx] ? 'expanded' : ''}`}>
                                    <div className="problem-header" onClick={() => toggleProblem(idx)}>
                                        <span className="diff-badge" style={{ background: p.bg, border: `1px solid ${p.dimColor}`, color: p.color }}>{p.difficulty}</span>
                                        <span className="prob-num">#{p.number}</span>
                                        <span className="prob-title">{p.title}</span>
                                        <span className="pattern-badge">{p.pattern}</span>
                                        <span className="expand-icon">{expandedProblems[idx] ? '▲' : '▼'}</span>
                                    </div>
                                    {expandedProblems[idx] && (
                                        <div className="problem-details">
                                            <p className="problem-desc">{p.description}</p>
                                            <div className="hint-box">
                                                <div className="hint-title">💡 HINT</div>
                                                <p className="hint-text">{p.hint}</p>
                                            </div>
                                            <div className="prob-actions">
                                                <a href={p.link} target="_blank" rel="noopener noreferrer" className="action-btn btn-secondary">🔗 Open LeetCode</a>
                                                <button 
                                                    className={`action-btn btn-toggle-sol ${revealedSolutions[idx] ? 'active' : ''}`}
                                                    onClick={() => toggleSolution(idx)}
                                                >
                                                    {revealedSolutions[idx] ? '🙈 Hide Solution' : '👁 View Solution'}
                                                </button>
                                            </div>
                                            {revealedSolutions[idx] && (
                                                <div className="solution-container active">
                                                    <div className="code-container">
                                                        <div className="code-header">
                                                            <div className="dots"><div className="dot red"></div><div className="dot yellow"></div><div className="dot green"></div></div>
                                                            <span className="code-lang">solution.py</span>
                                                        </div>
                                                        <pre>{p.solution}</pre>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="cheatsheet">
                            <div className="cheat-title">📋 PATTERN CHEATSHEET</div>
                            <div id="cheatsheet-content">
                                {cheatsheetData.map((c, i) => (
                                    <div key={i} className="cheat-row">
                                        <span className="cheat-pattern" style={{ color: c.color }}>{c.pattern}</span>
                                        <span className="cheat-desc">{c.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}
