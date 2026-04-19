import React from 'react';
import { Link } from 'react-router-dom';

export default function DpMasterclass() {
    return (
        <div className="topic-page">
            <div className="page-header">
                <Link to="/" className="nav-back">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Hub
                </Link>
                <h1>Dynamic Programming Masterclass</h1>
                <p>From zero to Google-ready. Master the 5 core DP patterns with mental models and interactive table visualizations.</p>
            </div>
            
            <div className="grid">
                <Link to="/topics/dp/guide" className="card guide">
                    <div className="icon-wrapper">📖</div>
                    <h2 className="card-title">Revision Guide</h2>
                    <p className="card-desc">The definitive mental models for all 5 DP patterns: 1D, 2D Grid, Knapsack, LCS/LIS, and Interval DP. Includes templates and decision framework.</p>
                    <div className="card-footer">
                        <span>Read Guide</span>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </div>
                </Link>
                
                <Link to="/topics/dp/visualizer" className="card viz">
                    <div className="icon-wrapper">🖥️</div>
                    <h2 className="card-title">Visual Playground</h2>
                    <p className="card-desc">Step through DP table construction cell by cell. Watch how subproblems build on each other for Fibonacci, Climbing Stairs, Knapsack, LCS, and Coin Change.</p>
                    <div className="card-footer">
                        <span>Launch Visualizer</span>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </div>
                </Link>
            </div>
        </div>
    );
}
