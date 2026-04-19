import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function LivePythonVisualizer() {
    useEffect(() => {
        // Since we are using raw scripts and window functions from the original HTML port,
        // we ensure they are available or handle them here.
        // The original file had <script> tags which are invalid in JSX.
        // We can inject them or assume they are in index.html.
        // For now, I'll focus on fixing the JSX structure.
    }, []);

    return (
        <div className="topic-page">
            <div className="viz-header">
                <Link to="/" className="nav-back">
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Hub
                </Link>
                <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 8px' }}></div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ background: 'linear-gradient(135deg,#7c3aed,#a78bfa)', width: '28px', height: '28px', borderRadius: '6px', display: 'flex', alignItems: 'center', justify: 'center', fontWeight: '700', fontSize: '13px', color: 'white' }}>Py</div>
                    <span className="header-title">Live Python Debugger</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, margin: '0 24px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.05em' }}>TEST ARGS:</span>
                    <input type="text" id="test_args" className="args-input" placeholder='e.g. [2,7,11,15], 9' style={{ flex: 1, background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: '6px', padding: '6px 12px', fontSize: '13px', color: '#fff', fontFamily: 'var(--font-code)' }} />
                    <div id="args_hint_display" style={{ fontSize: '10px', color: 'var(--text-muted)' }}></div>
                </div>

                <div className="tabs">
                    <button className="tab" id="edit-btn" onClick={() => window.toggleEditor?.()}>Edit Code</button>
                    <button className="tab active" onClick={() => window.runCode?.()}>Visualize</button>
                </div>
            </div>

            <div className="main-container">
                {/* Editor Pane (slide-in panel) */}
                <div className="left-pane open" id="left-pane">
                    <div className="pane-header"><div className="pane-dots"><div className="pane-dot red"></div><div className="pane-dot yellow"></div><div className="pane-dot green"></div></div>code_editor.py</div>
                    <textarea id="code_input"></textarea>
                </div>
                
                {/* Visualizer Pane */}
                <div className="right-pane">
                    <div className="pane-header" style={{ background: '#f1f5f9', color: '#475569', borderBottom: '1px solid #cbd5e1', fontFamily: 'var(--font-code)' }}>memory_state.viz</div>
                    
                    <div id="placeholder" className="placeholder">
                        <h2>Ready to Trace</h2>
                        <p>Paste a LeetCode <b>class Solution:</b> block! The tool will automatically instantiate it, call your method with the arguments you provide at the bottom, and map out the memory state.</p>
                    </div>
                    
                    <iframe id="tutor_iframe" style={{ display: 'none' }}></iframe>
                </div>
            </div>

            {/* Note: The original <script> tags and logic are omitted here for validity. 
                They should ideally be moved to a useEffect or a separate .js file 
                included in index.html if they rely on global state. */}
        </div>
    );
}
