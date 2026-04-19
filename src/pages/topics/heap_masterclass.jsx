import React from 'react';
import { Link } from 'react-router-dom';

export default function HeapMasterclass() {
    return (
        <div className="topic-page">
            <div className="page-header">
                <Link to="/" className="nav-back">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Hub
                </Link>
                <h1>Heap Masterclass</h1>
                <p>Master priorities, Top-K patterns, and the "Two Heaps" trick for median tracking.</p>
            </div>

            <div className="grid">
                <Link to="/topics/heap/guide" className="card guide">
                    <div className="icon-wrapper">📖</div>
                    <h2 className="card-title">Revision Guide</h2>
                    <p className="card-desc">Deep dive into Python's heapq, max-heap tricks, and the 5 essential interview patterns.</p>
                    <div className="card-footer">
                        <span>Read Guide</span>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </div>
                </Link>

                <Link to="/topics/heap/visualizer" className="card viz">
                    <div className="icon-wrapper">⛰️</div>
                    <h2 className="card-title">Visual Playground</h2>
                    <p className="card-desc">Interactive heap visualizer — animate push, pop, and heapify with tree &amp; array views in real-time.</p>
                    <div className="card-footer">
                        <span>Launch Visualizer</span>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </div>
                </Link>
            </div>
        </div>
    );
}
