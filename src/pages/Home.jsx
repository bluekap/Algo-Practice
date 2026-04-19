import { Link } from 'react-router-dom';
import './home.css';

export default function Home() {
  return (
    <div className="home-wrapper">
      <header className="home-header">
        <h1>AlgoPractice Hub</h1>
        <p className="subtitle">Your ultimate playground for mastering algorithms and patterns</p>
      </header>

      <div className="grid">
        <Link to="/topics/arrays" className="card">
            <div className="icon-wrapper">🎯</div>
            <h2 className="card-title">Array Patterns Masterclass</h2>
            <p className="card-desc">Comprehensive interactive guide for Sliding Window, Two Pointers, and Prefix Sums.</p>
            <div className="card-footer">
                <span>Start Masterclass</span>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </div>
        </Link>
        <Link to="/topics/binary-search" className="card">
            <div className="icon-wrapper">🔍</div>
            <h2 className="card-title">Binary Search Masterclass</h2>
            <p className="card-desc">Interactive step-by-step visualizer and definitive mental models.</p>
            <div className="card-footer">
                <span>Start Masterclass</span>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </div>
        </Link>
        <Link to="/topics/heap" className="card">
            <div className="icon-wrapper">🏔️</div>
            <h2 className="card-title">Heap Masterclass</h2>
            <p className="card-desc">Comprehensive guide for Priorities, Top-K, and Two Heaps patterns.</p>
            <div className="card-footer">
                <span>Start Masterclass</span>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </div>
        </Link>
        <Link to="/topics/dp" className="card">
            <div className="icon-wrapper">🧩</div>
            <h2 className="card-title">Dynamic Programming Masterclass</h2>
            <p className="card-desc">Master 1D, 2D Grid, Knapsack, LCS/LIS, and Interval DP.</p>
            <div className="card-footer">
                <span>Start Masterclass</span>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </div>
        </Link>
        <Link to="/topics/trees" className="card">
            <div className="icon-wrapper">🌲</div>
            <h2 className="card-title">Trees Masterclass</h2>
            <p className="card-desc">Master DOM-like traversals, BSTs, and path finding algorithms.</p>
            <div className="card-footer">
                <span>Start Masterclass</span>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </div>
        </Link>
        <Link to="/topics/graphs" className="card">
            <div className="icon-wrapper">🔗</div>
            <h2 className="card-title">Graphs Masterclass</h2>
            <p className="card-desc">Conquer BFS, DFS, Topological Sort, and shortest path problems.</p>
            <div className="card-footer">
                <span>Start Masterclass</span>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </div>
        </Link>
        <Link to="/topics/debugger" className="card">
            <div className="icon-wrapper">🐍</div>
            <h2 className="card-title">Live Python Debugger</h2>
            <p className="card-desc">Practice LeetCode-style problems with automatic parsing.</p>
            <div className="card-footer">
                <span>Launch Debugger</span>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </div>
        </Link>
      </div>
    </div>
  );
}
