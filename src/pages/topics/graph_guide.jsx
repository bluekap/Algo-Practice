import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CodeBlock from '../../components/CodeBlock';

const graphData = {
    concepts: [
        {
            id: "graph",
            title: "Graph Fundamentals",
            icon: "🕸️",
            content: `A graph is a set of **nodes** (vertices) connected by **edges**. Unlike trees, graphs can have cycles, disconnected components, and bidirectional/weighted edges.\n\n• **Adjacency List**: Most common — dict mapping node → list of neighbors. Space O(V+E).\n• **Adjacency Matrix**: Grid of size V×V. Fast edge lookup O(1), but O(V²) space.\n• **Directed vs Undirected**: Directed edges have a one-way relationship.\n• **Weighted**: Each edge carries a cost (used in Dijkstra, Bellman-Ford).\n\nFor most LeetCode problems, build an adjacency list from the input.`,
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
            content: `BFS explores all neighbors at depth d before moving to depth d+1. It uses a **Queue (deque)** and is ideal for finding **shortest paths** in unweighted graphs.\n\n**Template:**\n1. Push starting node into queue, mark visited.\n2. While queue not empty: pop node, process, push unvisited neighbors.\n\n**When to use BFS:**\n• Shortest path in unweighted graph/grid\n• Level-by-level processing (word ladder, rotting oranges)\n• Detecting bipartiteness\n\n**Time:** O(V + E) — every node and edge visited once.\n**Space:** O(V) — queue at most holds all nodes.`,
            code: `from collections import deque

def bfs(graph, start):
    visited = set([start])
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
    visited = set([(sr, sc)])
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
            content: `DFS explores as deep as possible before backtracking. Implemented **recursively** (call stack) or **iteratively** (explicit stack).\n\n**When to use DFS:**\n• Detecting cycles in a directed/undirected graph\n• Topological sort (reverse post-order)\n• Finding connected components\n• Pathfinding / flood fill\n\n**3-color cycle detection for directed graphs:**\n• ⬜ WHITE (0) — unvisited\n• 🔵 GRAY (1) — in current DFS path (recursion stack)\n• ⬛ BLACK (2) — fully processed\n\nIf you hit a GRAY node → cycle exists.\n\n**Time:** O(V + E). **Space:** O(V) for the recursion stack.`,
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
            content: `Union Find (Disjoint Set Union) tracks which elements are in the same connected **component**. Two key operations:\n\n• **find(x)** — returns the root/representative of x's component.\n• **union(x, y)** — merges the components of x and y.\n\n**Two optimizations (always use both):**\n• **Path Compression** — in find(), point every node directly to root.\n• **Union by Rank** — always attach the smaller tree under the larger.\n\nWith both: near O(1) amortized per operation — O(α(n)) inverse Ackermann.\n\n**When to use:**\n• Number of connected components\n• Detecting cycles in undirected graphs\n• Kruskal's MST\n• Dynamic connectivity queries`,
            code: `class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))    # each node is own root
        self.rank = [0] * n
        self.components = n             # track component count

    def find(self, x):
        # Path compression — flatten the tree
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        rx, ry = self.find(x), self.find(y)
        if rx == ry:
            return False                # already connected
        # Union by rank — smaller tree under bigger
        if self.rank[rx] < self.rank[ry]:
            rx, ry = ry, rx
        self.parent[ry] = rx
        if self.rank[rx] == self.rank[ry]:
            self.rank[rx] += 1
        self.components -= 1
        return True

    def connected(self, x, y):
        return self.find(x) == self.find(y)

# Usage:
uf = UnionFind(5)
uf.union(0, 1)
uf.union(1, 2)
print(uf.connected(0, 2))    # True
print(uf.components)         # 3`
        },
        {
            id: "dijkstra",
            title: "Dijkstra's Algorithm",
            icon: "🗺️",
            content: `Dijkstra finds the **shortest path** from a source node to all others in a **weighted graph with non-negative edges**.\n\n**Key idea:** Always relax the cheapest unvisited node first — a greedy priority queue approach.\n\n**Template:**\n1. dist[] = infinity for all, dist[src] = 0.\n2. Push (0, src) into min-heap.\n3. Pop cheapest node. If already visited, skip.\n4. For each neighbor: if dist[u]+w < dist[v], update and push.\n\n**Time:** O((V + E) log V) with a binary heap.\n**Space:** O(V + E)\n\n**Limitation:** Fails with **negative weights** → use Bellman-Ford instead.`,
            code: `import heapq

def dijkstra(n, adj, src):
    """
    adj: list of lists of (neighbor, weight)
    Returns: dist[] — shortest distance from src to all nodes
    """
    dist = [float('inf')] * n
    dist[src] = 0
    heap = [(0, src)]           # (cost, node)

    while heap:
        cost, u = heapq.heappop(heap)

        if cost > dist[u]:      # stale entry, skip
            continue

        for v, w in adj[u]:
            new_cost = dist[u] + w
            if new_cost < dist[v]:
                dist[v] = new_cost
                heapq.heappush(heap, (new_cost, v))

    return dist                 # dist[i] = min cost src→i

# ── Example: Network Delay Time (LC 743) ──────────────
def networkDelayTime(times, n, k):
    adj = [[] for _ in range(n + 1)]
    for u, v, w in times:
        adj[u].append((v, w))

    dist = dijkstra(n + 1, adj, k)
    ans = max(dist[1:])         # longest of all shortest paths
    return ans if ans < float('inf') else -1`
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
        return count

# Time: O(M×N) | Space: O(M×N)`
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
                    queue.append((r, c, 0))   # (row, col, time)
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

        return time if fresh == 0 else -1

# Time: O(M×N) | Space: O(M×N)`
        },
        {
            difficulty: "Medium", color: "#facc15", dimColor: "#854d0e", bg: "#1c1400",
            title: "Course Schedule", number: 207,
            link: "https://leetcode.com/problems/course-schedule/",
            pattern: "DFS · Cycle Detection",
            description: "There are numCourses courses (0 to n-1). prerequisites[i] = [a, b] means you must take b before a. Return true if you can finish all courses (i.e., no cycles).",
            hint: "Build a directed graph and look for a cycle. Use 3-color DFS: WHITE=unvisited, GRAY=in current path, BLACK=done. A back edge to a GRAY node = cycle.",
            solution: `class Solution:
    def canFinish(self, numCourses: int,
                  prerequisites: List[List[int]]) -> bool:
        adj = [[] for _ in range(numCourses)]
        for a, b in prerequisites:
            adj[b].append(a)           # b must come before a

        # 0=unvisited, 1=in-stack (gray), 2=done (black)
        color = [0] * numCourses

        def dfs(u):
            color[u] = 1              # mark gray
            for v in adj[u]:
                if color[v] == 1:     # back edge → cycle
                    return False
                if color[v] == 0 and not dfs(v):
                    return False
            color[u] = 2              # mark black
            return True

        return all(
            dfs(u) for u in range(numCourses)
            if color[u] == 0
        )

# Time: O(V+E) | Space: O(V+E)`
        },
        {
            difficulty: "Medium", color: "#facc15", dimColor: "#854d0e", bg: "#1c1400",
            title: "Number of Provinces", number: 547,
            link: "https://leetcode.com/problems/number-of-provinces/",
            pattern: "Union Find",
            description: "There are n cities. isConnected[i][j]=1 if cities i and j are directly connected. A province is a group of directly/indirectly connected cities. Return the number of provinces.",
            hint: "Classic Union-Find: iterate all pairs, union connected cities. The answer is the number of distinct roots remaining — tracked by uf.components.",
            solution: `class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.components = n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        rx, ry = self.find(x), self.find(y)
        if rx == ry: return
        if self.rank[rx] < self.rank[ry]: rx, ry = ry, rx
        self.parent[ry] = rx
        if self.rank[rx] == self.rank[ry]: self.rank[rx] += 1
        self.components -= 1

class Solution:
    def findCircleNum(self, isConnected: List[List[int]]) -> int:
        n = len(isConnected)
        uf = UnionFind(n)
        for i in range(n):
            for j in range(i + 1, n):
                if isConnected[i][j]:
                    uf.union(i, j)
        return uf.components

# Time: O(n² · α(n)) ≈ O(n²) | Space: O(n)`
        },
        {
            difficulty: "Medium", color: "#facc15", dimColor: "#854d0e", bg: "#1c1400",
            title: "Network Delay Time", number: 743,
            link: "https://leetcode.com/problems/network-delay-time/",
            pattern: "Dijkstra",
            description: "You have n network nodes (1 to n). times[i]=[u,v,w] is a directed edge from u to v with travel time w. Send a signal from node k. Return the time for all nodes to receive the signal, or -1 if impossible.",
            hint: "Classic Dijkstra from source k. Once all shortest paths are found, the answer is max(dist[1..n]). If any node is still infinity, return -1.",
            solution: `import heapq

class Solution:
    def networkDelayTime(self, times: List[List[int]],
                         n: int, k: int) -> int:
        # Build adjacency list (1-indexed)
        adj = [[] for _ in range(n + 1)]
        for u, v, w in times:
            adj[u].append((v, w))

        dist = [float('inf')] * (n + 1)
        dist[k] = 0
        heap = [(0, k)]                    # (cost, node)

        while heap:
            cost, u = heapq.heappop(heap)
            if cost > dist[u]:
                continue                   # stale entry
            for v, w in adj[u]:
                if dist[u] + w < dist[v]:
                    dist[v] = dist[u] + w
                    heapq.heappush(heap, (dist[v], v))

        ans = max(dist[1:])
        return ans if ans < float('inf') else -1

# Time: O((V+E) log V) | Space: O(V+E)`
        }
    ]
};

const cheatsheetData = [
    { pattern: "BFS (Queue)", desc: "Shortest path in unweighted graph. Multi-source: seed all starting nodes at once.", color: "#60a5fa" },
    { pattern: "DFS (Stack/Recursion)", desc: "Cycle detection, connected components, topological sort, path finding.", color: "#c084fc" },
    { pattern: "Union Find", desc: "Dynamic connectivity, number of components, cycle detection (undirected).", color: "#34d399" },
    { pattern: "Dijkstra (Min-Heap)", desc: "Shortest path in weighted graph (non-negative weights). O((V+E) log V).", color: "#fbbf24" },
    { pattern: "3-Color DFS", desc: "WHITE→GRAY→BLACK. Back edge to GRAY = cycle in directed graph.", color: "#f87171" },
];

export default function GraphGuide() {
    const [activeTab, setActiveTab] = useState('learn');
    const [activeConceptId, setActiveConceptId] = useState('graph');
    const [expandedProblems, setExpandedProblems] = useState({});
    const [revealedSolutions, setRevealedSolutions] = useState({});

    const toggleProblem = (idx) => {
        setExpandedProblems(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    const toggleSolution = (idx) => {
        setRevealedSolutions(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    const activeConcept = graphData.concepts.find(c => c.id === activeConceptId);

    return (
        <div className="topic-page">
            <div className="page-header">
                <Link to="/topics/graphs" className="nav-back">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Masterclass
                </Link>
                <h1>🕸️ Graphs in Python</h1>
                <p>BFS · DFS · Union Find · Dijkstra → 5 LeetCode problems (all Medium)</p>
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
                            {graphData.concepts.map(c => (
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
                            <CodeBlock
                                language="python"
                                code={activeConcept.code}
                            />
                        </div>
                    </section>
                )}

                {activeTab === 'problems' && (
                    <section id="problems" className="content-section active">
                        <p className="problems-intro">5 curated problems · all Medium · covers BFS, DFS, Union Find & Dijkstra</p>
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
                                                    <CodeBlock
                                                        language="python"
                                                        title="solution.py"
                                                        code={p.solution}
                                                    />
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
