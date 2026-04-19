import React from 'react';
import { Link } from 'react-router-dom';

export default function GraphsMasterclass() {
    return (
        <div className="topic-page">
            <header className="page-header">
                <Link to="/" className="nav-back">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Hub
                </Link>
                <h1>Graphs Masterclass</h1>
                <p>Conquer BFS, DFS, Topological Sort, and shortest path problems.</p>
            </header>
            
            <div className="section-card-body mental-model">
                <strong>Coming Soon:</strong> This module is under active development. You will learn:
                <ul>
                    <li>Breadth-First Search (BFS) and Depth-First Search (DFS)</li>
                    <li>Topological Sorting (Kahn's algorithm)</li>
                    <li>Shortest Path Algorithms (Dijkstra, Bellman-Ford)</li>
                </ul>
            </div>
        </div>
    );
}
