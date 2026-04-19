import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const heapData = {
    concepts: [
        {
            id: "intro", title: "What is a Heap?", icon: "🏔️",
            content: `A heap is a complete binary tree stored in an array where every parent satisfies the heap property.\n\n• **Min-Heap**: Parent ≤ Children → root is always the smallest\n• **Max-Heap**: Parent ≥ Children → root is always the largest\n\nPython's heapq module gives you a **min-heap** by default.`,
            code: `import heapq\n\n# Build a min-heap\nheap = []\nheapq.heappush(heap, 5)\nheapq.heappush(heap, 1)\nheapq.heappush(heap, 8)\nheapq.heappush(heap, 3)\n\nprint(heap)                  # [1, 3, 8, 5]\nprint(heap[0])               # 1  ← always the minimum\n\n# Remove and return minimum\nprint(heapq.heappop(heap))   # 1\nprint(heap)                  # [3, 5, 8]`
        },
        {
            id: "ops", title: "Core Operations", icon: "⚙️",
            content: `Key heapq operations and time complexities:\n\n• **heappush(h, x)** → O(log n) — insert element\n• **heappop(h)** → O(log n) — remove & return min\n• **h[0]** → O(1) — peek min without removing\n• **heapify(list)** → O(n) — convert list in-place\n• **heappushpop(h, x)** → O(log n) — push then pop (faster than both)\n• **nsmallest(k, iter) / nlargest** → O(n log k)`,
            code: `import heapq\n\nnums = [5, 1, 8, 3, 9, 2]\n\n# heapify converts list in-place — O(n)\nheapq.heapify(nums)\nprint(nums)                      # [1, 3, 2, 5, 9, 8]\n\n# Top-k helpers\nprint(heapq.nsmallest(3, nums))  # [1, 2, 3]\nprint(heapq.nlargest(3, nums))   # [9, 8, 5]\n\n# heappushpop: push x, then pop min atomically\nresult = heapq.heappushpop(nums, 0)\nprint(result)                    # 0`
        },
        {
            id: "maxheap", title: "Max-Heap Trick", icon: "🔄",
            content: `Python only ships with min-heap. The universal trick to get a **max-heap** is to **negate values** on the way in, and negate again on the way out.\n\nWhy it works:\n• Largest number becomes most negative\n• Min-heap surfaces the most negative first\n• Negating the result restores the original value\n\nThis is tested constantly in Google interviews!`,
            code: `import heapq\n\nmax_heap = []\nfor val in [5, 1, 8, 3, 9]:\n    heapq.heappush(max_heap, -val)   # negate on push\n\nprint(-heapq.heappop(max_heap))  # 9  ← negate on pop\nprint(-heapq.heappop(max_heap))  # 8\nprint(-heapq.heappop(max_heap))  # 5\n\n# Alternatively, use nlargest directly\nnums = [5, 1, 8, 3, 9]\nprint(heapq.nlargest(3, nums))   # [9, 8, 5]`
        },
        {
            id: "tuples", title: "Heaps with Tuples", icon: "📦",
            content: `Push **tuples** to attach metadata — Python compares them element by element, so the heap orders by the first element automatically.\n\nCommon patterns:\n• **(priority, value)** — task scheduling\n• **(distance, node)** — Dijkstra's algorithm\n• **(freq, item)** — top-k frequent elements\n• **(val, idx, node)** — index breaks ties safely`,
            code: `import heapq\n\n# Priority queue with (priority, task)\ntasks = []\nheapq.heappush(tasks, (3, "low priority"))\nheapq.heappush(tasks, (1, "urgent!"))\nheapq.heappush(tasks, (2, "medium"))\n\nwhile tasks:\n    pri, task = heapq.heappop(tasks)\n    print(f"[{pri}] {task}")\n# [1] urgent!\n# [2] medium\n# [3] low priority\n\n# Use index to break ties (avoids comparing objects)\nheapq.heappush(tasks, (1, 0, obj_a))\nheapq.heappush(tasks, (1, 1, obj_b))`
        },
        {
            id: "patterns", title: "Interview Patterns", icon: "🎯",
            content: `The 5 patterns that cover ~90% of heap problems at Google:\n\n**1. Top-K** — keep a heap of exactly size K\n**2. Two Heaps** — max-heap (lo) + min-heap (hi) for median\n**3. Merge K Sorted** — heap picks the global minimum each step\n**4. Greedy + Heap** — always process cheapest/fastest next\n**5. Sliding Window** — track max/min efficiently in a window`,
            code: `import heapq\n\n# Pattern 1: Kth Largest in O(n log k)\ndef kth_largest(nums, k):\n    heap = nums[:k]\n    heapq.heapify(heap)          # min-heap of size k\n    for n in nums[k:]:\n        if n > heap[0]:          # larger than kth?\n            heapq.heapreplace(heap, n)\n    return heap[0]               # root = kth largest\n\nprint(kth_largest([3,2,1,5,6,4], 2))  # 5\n\n# Pattern 2: Merge K sorted arrays\ndef merge_k(lists):\n    h = [(lst[0], i, 0) for i, lst in enumerate(lists) if lst]\n    heapq.heapify(h)\n    res = []\n    while h:\n        val, i, j = heapq.heappop(h)\n        res.append(val)\n        if j + 1 < len(lists[i]):\n            heapq.heappush(h, (lists[i][j+1], i, j+1))\n    return res`
        }
    ],
    problems: [
        {
            difficulty: "Easy", color: "#4ade80", dimColor: "#166534", bg: "#052e16",
            title: "Kth Largest Element in a Stream", number: 703,
            link: "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
            pattern: "Top-K · Min-Heap",
            description: "Design a class to find the kth largest element in an evolving stream of numbers. Must support add() queries efficiently.",
            hint: "Maintain a min-heap of exactly k elements. The root heap[0] is always the kth largest. When size exceeds k, pop the smallest.",
            solution: `import heapq\n\nclass KthLargest:\n    def __init__(self, k, nums):\n        self.k = k\n        self.heap = []\n        for n in nums:\n            self.add(n)\n\n    def add(self, val) -> int:\n        heapq.heappush(self.heap, val)\n        if len(self.heap) > self.k:\n            heapq.heappop(self.heap)\n        return self.heap[0]        # kth largest\n\n# Time: O(log k) per add  |  Space: O(k)`
        },
        {
            difficulty: "Medium", color: "#facc15", dimColor: "#854d0e", bg: "#1c1400",
            title: "K Closest Points to Origin", number: 973,
            link: "https://leetcode.com/problems/k-closest-points-to-origin/",
            pattern: "Top-K · Max-Heap",
            description: "Given an array of points, return the k closest to the origin (0,0). Distance is Euclidean but you don't need the sqrt.",
            hint: "Use a max-heap of size k storing (-dist, x, y). When the heap exceeds k, pop — this evicts the farthest point automatically.",
            solution: `import heapq\n\ndef kClosest(points, k):\n    heap = []\n    for x, y in points:\n        dist = -(x*x + y*y)        # negate for max-heap\n        heapq.heappush(heap, (dist, x, y))\n        if len(heap) > k:\n            heapq.heappop(heap)    # removes farthest\n    return [[x, y] for (_, x, y) in heap]\n\n# Time: O(n log k)  |  Space: O(k)`
        },
        {
            difficulty: "Hard", color: "#fb923c", dimColor: "#9a3412", bg: "#1c0800",
            title: "Find Median from Data Stream", number: 295,
            link: "https://leetcode.com/problems/find-median-from-data-stream/",
            pattern: "Two Heaps",
            description: "Support addNum() and findMedian() on a growing stream. findMedian() must run in O(1). Classic two-heaps problem.",
            hint: "lo = max-heap (negated) for lower half, hi = min-heap for upper half. Always push to lo first, rebalance so |lo| is never less than |hi|.",
            solution: `import heapq\n\nclass MedianFinder:\n    def __init__(self):\n        self.lo = []   # max-heap (values negated)\n        self.hi = []   # min-heap\n\n    def addNum(self, num: int) -> None:\n        heapq.heappush(self.lo, -num)\n        # Move lo's max to hi to maintain ordering\n        heapq.heappush(self.hi, -heapq.heappop(self.lo))\n        # Keep lo size >= hi size\n        if len(self.hi) > len(self.lo):\n            heapq.heappush(self.lo, -heapq.heappop(self.hi))\n\n    def findMedian(self) -> float:\n        if len(self.lo) > len(self.hi):\n            return -self.lo[0]\n        return (-self.lo[0] + self.hi[0]) / 2\n\n# Time: O(log n) add  |  O(1) median  |  Space: O(n)`
        },
        {
            difficulty: "Hard", color: "#f87171", dimColor: "#991b1b", bg: "#1f0000",
            title: "Merge K Sorted Lists", number: 23,
            link: "https://leetcode.com/problems/merge-k-sorted-lists/",
            pattern: "Merge K Sorted",
            description: "Merge k sorted linked lists into one sorted linked list. Naive approach is O(nk) — heap brings it down to O(n log k).",
            hint: "Seed the heap with each list's head as (val, list_index, node). Always pop the global min, append to result, then push that node's next.",
            solution: `import heapq\n\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef mergeKLists(lists):\n    heap = []\n    for i, node in enumerate(lists):\n        if node:\n            heapq.heappush(heap, (node.val, i, node))\n\n    dummy = ListNode(0)\n    curr = dummy\n    while heap:\n        val, i, node = heapq.heappop(heap)\n        curr.next = node\n        curr = curr.next\n        if node.next:\n            heapq.heappush(heap, (node.next.val, i, node.next))\n    return dummy.next\n\n# Time: O(n log k)  |  Space: O(k)`
        }
    ]
};

const cheatsheetData = [
    { pattern: "Top-K Largest", desc: "min-heap size k → root = kth largest", color: "#4ade80" },
    { pattern: "Top-K Smallest", desc: "max-heap size k → root = kth smallest", color: "#4ade80" },
    { pattern: "Two Heaps", desc: "lo=max-heap + hi=min-heap → O(1) median", color: "#facc15" },
    { pattern: "Merge K Sorted", desc: "(val, i, j) → always pop global minimum", color: "#facc15" },
    { pattern: "Dijkstra / Greedy", desc: "(cost, node) → process cheapest edge first", color: "#f87171" },
];

export default function HeapGuide() {
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

    const activeConcept = heapData.concepts.find(c => c.id === activeConceptId);

    return (
        <div className="topic-page">
            <div className="page-header">
                <Link to="/topics/heap" className="nav-back">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Masterclass
                </Link>
                <h1>🏔️ Heaps in Python</h1>
                <p>Fundamentals → patterns → 4 LeetCode problems (Easy–Hard)</p>
                <div className="tabs" style={{ justifyContent: 'center', marginTop: '12px' }}>
                    <button 
                        className={`tab-btn ${activeTab === 'learn' ? 'active' : ''}`}
                        onClick={() => setActiveTab('learn')}
                    >📚 Learn</button>
                    <button 
                        className={`tab-btn ${activeTab === 'problems' ? 'active' : ''}`}
                        onClick={() => setActiveTab('problems')}
                    >🧩 Problems</button>
                </div>
            </div>

            <main>
                {activeTab === 'learn' && (
                    <section id="learn" className="content-section learn-container active">
                        <div className="side-nav">
                            {heapData.concepts.map(c => (
                                <button 
                                    key={c.id}
                                    className={`concept-btn ${activeConceptId === c.id ? 'active' : ''}`}
                                    onClick={() => setActiveConceptId(c.id)}
                                >
                                    <span>{c.icon}</span><span>{c.title}</span>
                                </button>
                            ))}
                        </div>

                        <div className="concept-content">
                            <div className="card">
                                <div className="card-header">
                                    <span style={{ fontSize: '18px' }}>{activeConcept.icon}</span>
                                    <h2>{activeConcept.title}</h2>
                                </div>
                                <div className="card-body">
                                    {activeConcept.content.split('\n').map((line, i) => (
                                        line.trim() === '' ? <div key={i} style={{ height: '6px' }} /> : <p key={i}>{line.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')}</p>
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
                        <p className="problems-intro">4 curated problems · Easy → Hard · covers all essential heap patterns</p>
                        <div id="problems-list">
                            {heapData.problems.map((p, idx) => (
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
