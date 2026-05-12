import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CodeBlock from '../../components/CodeBlock';

const graphData = {
    concepts: [
        {
            id: "graph",
            title: "Graph Fundamentals",
            icon: "🕸️",
            content: `A graph is a set of **nodes** (vertices) connected by **edges**. Unlike trees, graphs can have cycles, disconnected components, and bidirectional edges.\n\n• **Adjacency List**: Most common — dict mapping node → list of neighbors. Space \`O(V+E)\`.\n• **Adjacency Matrix**: Grid of size \`V×V\`. Fast edge lookup \`O(1)\`, but \`O(V²)\` space.\n• **Directed vs Undirected**: Directed edges have a one-way relationship.\n• **Weighted**: Each edge carries a cost (used in Dijkstra).`,
            mentalModel: "Think of a graph as a social network. Nodes are people, edges are friendships. An adjacency list is like a contact list for each person.",
            complexity: { time: "O(V + E)", space: "O(V + E)" },
            code: `# ── Adjacency List (most common) ──────────────────────
# Undirected graph with 5 nodes
edges = [[0,1],[0,2],[1,3],[2,4]]
n = 5

adj = [[] for _ in range(n)]        # or defaultdict(list)
for u, v in edges:
    adj[u].append(v)
    adj[v].append(u)                # omit for directed

# adj = [[1,2], [0,3], [0,4], [1], [2]]

# ── Adjacency List for weighted graph ─────────────────
weighted_edges = [[0,1,4],[0,2,2],[1,3,5]]
w_adj = [[] for _ in range(n)]
for u, v, w in weighted_edges:
    w_adj[u].append((v, w))
    w_adj[v].append((u, w))`
        },
        {
            id: "bfs",
            title: "BFS — Breadth-First Search",
            icon: "🌊",
            content: `BFS explores all neighbors at depth \`d\` before moving to depth \`d+1\`. It uses a **Queue (deque)** and is ideal for finding **shortest paths** in unweighted graphs.\n\n• **Layer by Layer**: Process all nodes at the current distance before moving further.\n• **Shortest Path**: Guaranteed to find the shortest path in an unweighted graph.\n• **Grid Problems**: Use BFS for "minimum steps" to reach a target in a 2D grid.`,
            mentalModel: "Like a ripple in a pond. The wave expands outward layer by layer. Everything the wave hits at the same time is at the same distance.",
            complexity: { time: "O(V + E)", space: "O(V)" },
            code: `from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    order = []

    while queue:
        node = queue.popleft()      # O(1) from left
        order.append(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return order

# ── BFS on a 2D grid ──────────────────────────────────
def bfs_grid(grid, sr, sc):
    rows, cols = len(grid), len(grid[0])
    visited = {(sr, sc)}
    queue = deque([(sr, sc)])
    dirs = [(0,1),(0,-1),(1,0),(-1,0)]

    while queue:
        r, c = queue.popleft()
        for dr, dc in dirs:
            nr, nc = r+dr, c+dc
            if (0 <= nr < rows and 0 <= nc < cols
                    and (nr,nc) not in visited
                    and grid[nr][nc] != 0):
                visited.add((nr, nc))
                queue.append((nr, nc))`
        },
        {
            id: "dfs",
            title: "DFS — Depth-First Search",
            icon: "⬇️",
            content: `DFS explores as deep as possible before backtracking. Implemented **recursively** (call stack) or **iteratively** (explicit stack).\n\n• **Pathfinding**: Useful for exploring all possible paths.\n• **Cycle Detection**: Use 3 colors (White, Gray, Black) to detect cycles in directed graphs.\n• **Topological Sort**: Use post-order traversal to order tasks with dependencies.`,
            mentalModel: "Like exploring a maze. You go down one path until you hit a dead end, then backtrack to the last intersection and try a different path.",
            complexity: { time: "O(V + E)", space: "O(V)" },
            code: `# ── Recursive DFS ─────────────────────────────────────
def dfs(graph, node, visited, order):
    visited.add(node)
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited, order)
    order.append(node)              # post-order

# ── Iterative DFS ──────────────────────────────────────
def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    order = []

    while stack:
        node = stack.pop()
        if node in visited:
            continue
        visited.add(node)
        order.append(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                stack.append(neighbor)
    return order

# ── Cycle Detection (directed graph, 3-color) ──────────
def has_cycle(n, adj):
    color = [0] * n          # 0=white, 1=gray, 2=black

    def dfs(u):
        color[u] = 1          # mark gray (in stack)
        for v in adj[u]:
            if color[v] == 1: return True   # back edge!
            if color[v] == 0 and dfs(v): return True
        color[u] = 2          # mark black (done)
        return False

    return any(dfs(u) for u in range(n) if color[u] == 0)`
        },
        {
            id: "union-find",
            title: "Union Find (DSU)",
            icon: "🔗",
            content: `Union Find tracks which elements are in the same connected **component**. It is extremely efficient for dynamic connectivity.\n\n• **Path Compression**: Flatten the tree structure during \`find()\` for near-constant time lookups.\n• **Union by Rank**: Keep the tree shallow by attaching the smaller tree to the larger one.\n• **Cycle Detection**: If \`find(u) == find(v)\`, adding an edge \`(u, v)\` creates a cycle.`,
            mentalModel: "Think of merging companies. Each person has a manager. 'Find' tells you the CEO. 'Union' merges two companies by making one CEO report to the other.",
            complexity: { time: "O(α(N))", space: "O(N)" },
            code: `class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.components = n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x]) # Path compression
        return self.parent[x]

    def union(self, x, y):
        rx, ry = self.find(x), self.find(y)
        if rx == ry: return False
        
        if self.rank[rx] < self.rank[ry]:
            self.parent[rx] = ry
        elif self.rank[rx] > self.rank[ry]:
            self.parent[ry] = rx
        else:
            self.parent[ry] = rx
            self.rank[rx] += 1
        self.components -= 1
        return True`
        },
        {
            id: "dijkstra",
            title: "Dijkstra's Algorithm",
            icon: "🗺️",
            content: `Dijkstra finds the **shortest path** in a **weighted graph** with non-negative edges. It uses a **Priority Queue** to always explore the cheapest path first.\n\n• **Greedy Approach**: Always visit the node with the current smallest distance.\n• **Edge Relaxation**: Update neighbor distances if a shorter path is found through the current node.\n• **Limitation**: Does not work with negative edge weights.`,
            mentalModel: "Like a GPS. It constantly evaluates all possible roads and always picks the one that gets you closer to the destination the fastest.",
            complexity: { time: "O((V+E) log V)", space: "O(V + E)" },
            code: `import heapq

def dijkstra(n, adj, src):
    dist = [float('inf')] * n
    dist[src] = 0
    pq = [(0, src)]           # (cost, node)

    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]: continue

        for v, w in adj[u]:
            if d + w < dist[v]:
                dist[v] = d + w
                heapq.heappush(pq, (dist[v], v))
    return dist`
        }
    ],
    problems: [
        {
            difficulty: "Medium", color: "#facc15", dimColor: "#854d0e", bg: "#1c1400",
            title: "Number of Islands", number: 200,
            link: "https://leetcode.com/problems/number-of-islands/",
            pattern: "DFS / BFS",
            description: "Given an m×n binary grid of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent land cells horizontally or vertically.",
            hint: "For each unvisited '1', launch a DFS/BFS that marks all connected '1' cells as visited. Every fresh launch = one new island.",
            solution: `class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid: return 0
        rows, cols = len(grid), len(grid[0])
        visited = set()
        count = 0

        def dfs(r, c):
            if (r < 0 or r >= rows or c < 0 or c >= cols
                    or (r, c) in visited or grid[r][c] == '0'):
                return
            visited.add((r, c))
            dfs(r+1, c); dfs(r-1, c)
            dfs(r, c+1); dfs(r, c-1)

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1' and (r, c) not in visited:
                    dfs(r, c)
                    count += 1
        return count`
        },
        {
            difficulty: "Medium", color: "#facc15", dimColor: "#854d0e", bg: "#1c1400",
            title: "Rotting Oranges", number: 994,
            link: "https://leetcode.com/problems/rotting-oranges/",
            pattern: "BFS · Multi-source",
            description: "In a grid, 0=empty, 1=fresh, 2=rotten. Every minute, rotten oranges infect adjacent fresh ones. Return the minimum minutes until no fresh orange remains, or -1 if impossible.",
            hint: "Multi-source BFS: seed the queue with ALL rotten oranges at time 0. Each BFS level = 1 minute. Track fresh orange count — if it reaches 0, return time elapsed.",
            solution: `from collections import deque

class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        rows, cols = len(grid), len(grid[0])
        queue = deque()
        fresh = 0

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == 2:
                    queue.append((r, c, 0))
                elif grid[r][c] == 1:
                    fresh += 1

        if fresh == 0: return 0
        dirs = [(0,1),(0,-1),(1,0),(-1,0)]
        time = 0

        while queue:
            r, c, t = queue.popleft()
            for dr, dc in dirs:
                nr, nc = r+dr, c+dc
                if 0<=nr<rows and 0<=nc<cols and grid[nr][nc]==1:
                    grid[nr][nc] = 2
                    fresh -= 1
                    time = t + 1
                    queue.append((nr, nc, t+1))

        return time if fresh == 0 else -1`
        },
        {
            difficulty: "Medium", color: "#facc15", dimColor: "#854d0e", bg: "#1c1400",
            title: "Course Schedule", number: 207,
            link: "https://leetcode.com/problems/course-schedule/",
            pattern: "DFS · Cycle Detection",
            description: "There are numCourses courses. prerequisites[i] = [a, b] means you must take b before a. Return true if you can finish all courses.",
            hint: "Build a directed graph and look for a cycle using 3-color DFS.",
            solution: `class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        adj = [[] for _ in range(numCourses)]
        for a, b in prerequisites:
            adj[b].append(a)

        color = [0] * numCourses # 0=white, 1=gray, 2=black

        def dfs(u):
            color[u] = 1
            for v in adj[u]:
                if color[v] == 1: return False
                if color[v] == 0 and not dfs(v): return False
            color[u] = 2
            return True

        return all(dfs(u) for u in range(numCourses) if color[u] == 0)`
        },
        {
            difficulty: "Medium", color: "#facc15", dimColor: "#854d0e", bg: "#1c1400",
            title: "Number of Provinces", number: 547,
            link: "https://leetcode.com/problems/number-of-provinces/",
            pattern: "Union Find",
            description: "Given n cities and connections, return the number of provinces (connected components).",
            hint: "Iterate all pairs, union connected cities. Result is the final number of components.",
            solution: `class Solution:
    def findCircleNum(self, isConnected: List[List[int]]) -> int:
        n = len(isConnected)
        parent = list(range(n))
        count = n
        
        def find(x):
            if parent[x] != x: parent[x] = find(parent[x])
            return parent[x]
            
        def union(x, y):
            nonlocal count
            rx, ry = find(x), find(y)
            if rx != ry:
                parent[rx] = ry
                count -= 1
                
        for i in range(n):
            for j in range(i + 1, n):
                if isConnected[i][j]: union(i, j)
        return count`
        },
        {
            difficulty: "Medium", color: "#facc15", dimColor: "#854d0e", bg: "#1c1400",
            title: "Network Delay Time", number: 743,
            link: "https://leetcode.com/problems/network-delay-time/",
            pattern: "Dijkstra",
            description: "Find the time for a signal to reach all nodes in a weighted network.",
            hint: "Classic Dijkstra from source k. The answer is max(dist[1..n]).",
            solution: `import heapq

class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        adj = [[] for _ in range(n + 1)]
        for u, v, w in times: adj[u].append((v, w))
        dist = [float('inf')] * (n + 1)
        dist[k] = 0
        pq = [(0, k)]
        while pq:
            d, u = heapq.heappop(pq)
            if d > dist[u]: continue
            for v, w in adj[u]:
                if dist[u] + w < dist[v]:
                    dist[v] = dist[u] + w
                    heapq.heappush(pq, (dist[v], v))
        ans = max(dist[1:])
        return ans if ans < float('inf') else -1`
        }
    ]
};

const cheatsheetData = [
    { pattern: "BFS (Queue)", desc: "Shortest path in unweighted graph. Multi-source: seed all starting nodes.", color: "#60a5fa" },
    { pattern: "DFS (Stack)", desc: "Cycle detection, connected components, topological sort.", color: "#c084fc" },
    { pattern: "Union Find", desc: "Dynamic connectivity, number of components, cycle detection (undirected).", color: "#34d399" },
    { pattern: "Dijkstra", desc: "Shortest path in weighted graph (non-negative). O((V+E) log V).", color: "#fbbf24" },
];

function renderMarkdown(text) {
    return text.split('\n').map((line, i) => {
        if (line.trim() === '') return <div key={i} style={{ height: '8px' }} />;
        
        let html = line.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\`([^`]+)\`/g, '<code class="inline-code">$1</code>');
        if (line.startsWith('• ')) {
            return <li key={i} style={{ marginLeft: '12px', marginBottom: '4px' }} dangerouslySetInnerHTML={{ __html: html.substring(2) }} />;
        }
        
        return <p key={i} dangerouslySetInnerHTML={{ __html: html }}></p>;
    });
}

export default function GraphGuide() {
    const [activeTab, setActiveTab] = useState('learn');
    const [activeConceptId, setActiveConceptId] = useState('graph');
    const [expandedProblems, setExpandedProblems] = useState({});
    const [revealedSolutions, setRevealedSolutions] = useState({});

    const toggleProblem = (idx) => setExpandedProblems(prev => ({ ...prev, [idx]: !prev[idx] }));
    const toggleSolution = (idx) => setRevealedSolutions(prev => ({ ...prev, [idx]: !prev[idx] }));

    const activeConcept = graphData.concepts.find(c => c.id === activeConceptId);

    return (
        <div className="topic-page">
            <div className="page-header">
                <Link to="/topics/graphs" className="nav-back">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Hub
                </Link>
                <h1>🕸️ Graphs Masterclass</h1>
                <p>BFS · DFS · Union Find · Dijkstra · 5 LeetCode Mediums</p>
                <div className="tabs" style={{ justifyContent: 'center', marginTop: '16px' }}>
                    <button className={`tab ${activeTab === 'learn' ? 'active' : ''}`} onClick={() => setActiveTab('learn')}>📚 Learn</button>
                    <button className={`tab ${activeTab === 'problems' ? 'active' : ''}`} onClick={() => setActiveTab('problems')}>🧩 Problems</button>
                </div>
            </div>

            <main>
                {activeTab === 'learn' && (
                    <section id="learn" className="content-section learn-container active">
                        <div className="side-nav" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                            {graphData.concepts.map(c => (
                                <button key={c.id} className={`tab ${activeConceptId === c.id ? 'active' : ''}`} onClick={() => setActiveConceptId(c.id)}>
                                    <span>{c.icon}</span> <span>{c.title}</span>
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
                                    <div className="content-text">{renderMarkdown(activeConcept.content)}</div>
                                    
                                    <div className="complexity-bar" style={{ marginTop: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '12px' }}>
                                        <div style={{ display: 'flex', gap: '24px' }}>
                                            <div className="state-row"><span>Time:</span> <span className="cv">{activeConcept.complexity.time}</span></div>
                                            <div className="state-row"><span>Space:</span> <span className="cv">{activeConcept.complexity.space}</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="section-card" style={{ borderLeft: '4px solid #c4b5fd' }}>
                                <div className="section-card-header">
                                    <span>🧠</span>
                                    <h2>Mental Model</h2>
                                </div>
                                <div className="section-card-body" style={{ fontStyle: 'italic', color: 'var(--text-muted-bright)' }}>
                                    "{activeConcept.mentalModel}"
                                </div>
                            </div>

                            <CodeBlock language="python" code={activeConcept.code} />
                        </div>
                    </section>
                )}

                {activeTab === 'problems' && (
                    <section id="problems" className="content-section active">
                        <div id="problems-list">
                            {graphData.problems.map((p, idx) => (
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
                                                <div className="hint-title">💡 STRATEGY</div>
                                                <p className="hint-text">{p.hint}</p>
                                            </div>
                                            <div className="prob-actions">
                                                <a href={p.link} target="_blank" rel="noopener noreferrer" className="action-btn btn-secondary">🔗 LeetCode</a>
                                                <button className={`action-btn btn-toggle-sol ${revealedSolutions[idx] ? 'active' : ''}`} onClick={() => toggleSolution(idx)}>
                                                    {revealedSolutions[idx] ? '🙈 Hide Solution' : '👁 View Solution'}
                                                </button>
                                            </div>
                                            {revealedSolutions[idx] && <CodeBlock language="python" title="solution.py" code={p.solution} />}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="cheatsheet" style={{ marginTop: '32px' }}>
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
