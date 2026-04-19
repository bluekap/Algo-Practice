import React from 'react';
import { Link } from 'react-router-dom';

export default function ArrayPatternsMasterclass() {
    return (
        <div className="topic-page">
            <div className="page-header">
                <Link to="/" className="nav-back">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Hub
                </Link>
                <h1>Array Patterns Masterclass</h1>
                <p>Master the top patterns for Google interviews: Sliding Window, Two Pointers, and Prefix Sums.</p>
            </div>

            <div className="grid">
                <Link to="/topics/arrays/guide" className="card guide">
                    <div className="icon-wrapper">📖</div>
                    <h2 className="card-title">Revision Guide</h2>
                    <p className="card-desc">Pattern detector, universal skeleton templates, and expert mental models for interviews.</p>
                    <div className="card-footer">
                        <span>Start Learning</span>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </div>
                </Link>

                <Link to="/topics/arrays/visualizer" className="card viz">
                    <div className="icon-wrapper">🖥️</div>
                    <h2 className="card-title">Visual Playground</h2>
                    <p className="card-desc">Interactive variable sliding window simulation. Step through execution to see pointers in action.</p>
                    <div className="card-footer">
                        <span>Launch Visualizer</span>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </div>
                </Link>
            </div>
        </div>
    );
}
