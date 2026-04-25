import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const DEFAULT_CODE = `class Solution:
    def isPalindrome(self, s: str) -> bool:
        # Pointers matching pattern
        left, right = 0, len(s) - 1
        
        while left < right:
            while left < right and not s[left].isalnum(): left += 1
            while left < right and not s[right].isalnum(): right -= 1
            
            if s[left].lower() != s[right].lower():
                return False
                
            left += 1
            right -= 1
            
        return True
`;

export default function LivePythonVisualizer() {
    const textareaRef = useRef(null);
    const editorRef = useRef(null);
    const prevSignatureRef = useRef(null);
    const [isEditorOpen, setIsEditorOpen] = useState(true);
    const [argsHint, setArgsHint] = useState('Detecting...');
    const [argsHintColor, setArgsHintColor] = useState('#475569');
    const [argsPlaceholder, setArgsPlaceholder] = useState('e.g. [2,7,11,15], 9');
    const [iframeUrl, setIframeUrl] = useState(null);
    const [isExecuting, setIsExecuting] = useState(false);
    const [mode, setMode] = useState('leetcode'); // 'leetcode' or 'script'

    // ── Initialize CodeMirror ──
    useEffect(() => {
        if (!textareaRef.current) return;

        const initEditor = () => {
            if (!window.CodeMirror) {
                setTimeout(initEditor, 100);
                return;
            }
            if (editorRef.current) return; // already initialized

            const cm = window.CodeMirror.fromTextArea(textareaRef.current, {
                mode: 'python',
                theme: 'dracula',
                lineNumbers: true,
                indentUnit: 4,
                tabSize: 4,
                indentWithTabs: false,
                extraKeys: {
                    'Tab': (cm) => {
                        if (cm.somethingSelected()) {
                            cm.indentSelection('add');
                        } else {
                            cm.replaceSelection(Array(cm.getOption('indentUnit') + 1).join(' '), 'end', '+input');
                        }
                    },
                    'Shift-Tab': (cm) => cm.indentSelection('subtract'),
                },
            });

            cm.setValue(DEFAULT_CODE);
            editorRef.current = cm;

            // Update hint on every change
            cm.on('change', () => updateArgsHint(cm.getValue()));
            updateArgsHint(cm.getValue());

            // Refresh after open animation
            setTimeout(() => cm.refresh(), 310);
        };

        initEditor();

        return () => {
            if (editorRef.current) {
                editorRef.current.toTextArea();
                editorRef.current = null;
            }
        };
    }, []);

    // ── Smart Argument Detector ──
    function updateArgsHint(code) {
        const match =
            code.match(/^    def\s+([a-zA-Z0-9_]+)\s*\(\s*self\s*(?:,\s*([^)]*))?\)/m) ||
            code.match(/def\s+([a-zA-Z0-9_]+)\s*\(\s*self\s*(?:,\s*([^)]*))?\)/);

        if (match) {
            const rawArgs = match[2] || '';
            let splitArgs = [], current = '', depth = 0;
            for (let char of rawArgs) {
                if (char === '[') depth++;
                if (char === ']') depth--;
                if (char === ',' && depth === 0) { splitArgs.push(current); current = ''; }
                else current += char;
            }
            if (current.trim()) splitArgs.push(current);

            const parsedArgs = splitArgs.map(a => {
                const parts = a.split(':');
                const name = parts[0].trim();
                const typeHint = parts.length > 1 ? parts[1].trim() : '';
                return { name, typeHint };
            }).filter(a => a.name && a.name !== 'self');

            if (parsedArgs.length > 0) {
                setArgsHint(`Needs ${parsedArgs.length} args: (${parsedArgs.map(a => a.name).join(', ')})`);
                setArgsHintColor('#a78bfa');

                const placeholders = parsedArgs.map(arg => {
                    const t = arg.typeHint.toLowerCase();
                    if (t.includes('list[')) return '[1, 2, 3]';
                    if (t.includes('str')) return '"abc"';
                    if (t.includes('int')) return '5';
                    if (t.includes('bool')) return 'True';
                    if (t.includes('float')) return '3.14';
                    
                    // Fallback based on name
                    const n = arg.name.toLowerCase();
                    if (n.includes('nums') || n.includes('arr')) return '[1, 2, 3]';
                    if (n.includes('str') || n === 's') return '"abc"';
                    if (n.includes('target') || n === 'k' || n === 'n') return '1';
                    
                    return 'val'; // Default fallback
                });

                const newPlaceholder = placeholders.join(', ');
                setArgsPlaceholder(`e.g. ${newPlaceholder}`);
                
                const signatureKey = parsedArgs.map(a => `${a.name}:${a.typeHint}`).join(',');
                if (prevSignatureRef.current !== null && prevSignatureRef.current !== signatureKey) {
                    const testArgsEl = document.getElementById('debugger-test-args');
                    if (testArgsEl) testArgsEl.value = newPlaceholder;
                }
                prevSignatureRef.current = signatureKey;
            } else {
                setArgsHint('No args needed besides self.');
                setArgsHintColor('#475569');
                setArgsPlaceholder('No args needed');
                
                if (prevSignatureRef.current !== null && prevSignatureRef.current !== 'NONE') {
                    const testArgsEl = document.getElementById('debugger-test-args');
                    if (testArgsEl) testArgsEl.value = '';
                }
                prevSignatureRef.current = 'NONE';
            }
            setMode('leetcode');
        } else {
            setArgsHint('Script Mode: Code will run top-to-bottom.');
            setArgsHintColor('#94a3b8');
            setArgsPlaceholder('Input disabled in Script Mode');
            setMode('script');
        }
    }

    // ── Toggle Editor ──
    function toggleEditor() {
        setIsEditorOpen(prev => {
            const next = !prev;
            if (next && editorRef.current) {
                setTimeout(() => editorRef.current.refresh(), 310);
            }
            return next;
        });
    }

    // ── Preprocessor ──
    function normalizeTyping(code) {
        // Convert built-in generics to typing equivalents
        code = code.replace(/\blist\s*\[/g, 'List[');
        code = code.replace(/\bdict\s*\[/g, 'Dict[');
        code = code.replace(/\btuple\s*\[/g, 'Tuple[');
        code = code.replace(/\bset\s*\[/g, 'Set[');

        // Ensure typing import exists
        if (!code.includes('from typing import')) {
            code = 'from typing import List, Dict, Tuple, Set, Optional\n' + code;
        }

        return code;
    }

    // ── Run Code ──
    function runCode() {
        const testArgsEl = document.getElementById('debugger-test-args');
        let code = editorRef.current ? editorRef.current.getValue().trim() : '';
        if (!code) {
            alert('Please write some Python code first!');
            return;
        }

        // Preprocess typing
        code = normalizeTyping(code);

        // Auto-execution logic
        if (mode === 'leetcode') {
            const classMatch = code.match(/class Solution[\s\S]*?(?=\nclass |\Z)/);
            const classBody = classMatch ? classMatch[0] : code;
            const methodMatch = classBody.match(/def\s+([a-zA-Z0-9_]+)\s*\(\s*self/);
            if (methodMatch) {
                const methodName = methodMatch[1];
                let args = testArgsEl ? testArgsEl.value.trim() : '';
                if (!args) args = 'None';
                code += `\n\n# --- Auto-Generated Execution ---\n_sol = Solution()\n_result = _sol.${methodName}(${args})\nprint("Returned:", _result)`;
            }
        }

        const encodedCode = encodeURIComponent(code);
        const url = `https://pythontutor.com/iframe-embed.html?t=${Date.now()}#code=${encodedCode}&cumulative=false&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=3&rawInputLstJSON=%5B%5D&textReferences=false`;

        setIsExecuting(true);
        setIframeUrl(null);
        setTimeout(() => {
            setIframeUrl(url);
            setIsExecuting(false);
            setIsEditorOpen(false); // Hide the editor when visualization starts
        }, 50);
    }

    return (
        <div className="topic-page">
            <style>{`.CodeMirror { height: 100% !important; font-family: 'JetBrains Mono', monospace; font-size: 13px; }`}</style>
            <div className="viz-header">
                <Link to="/" className="nav-back">
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Hub
                </Link>
                <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 8px' }}></div>
                <div className="header-title-group">
                    <div style={{ background: 'linear-gradient(135deg,#7c3aed,#a78bfa)', width: '28px', height: '28px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '13px', color: 'white' }}>Py</div>
                    <span className="header-title">Live Python Debugger</span>
                </div>
                <div className="header-spacer"></div>
            </div>

            <div className="viz-container" style={{ gridTemplateColumns: isEditorOpen ? '400px 1fr' : '0px 1fr', transition: 'grid-template-columns 0.3s' }}>
                <div className="viz-sidebar" style={{ border: isEditorOpen ? '' : 'none', opacity: isEditorOpen ? 1 : 0, transition: 'opacity 0.2s', overflow: 'hidden' }}>
                    <div className="code-header">
                        <div className="dots">
                            <div className="dot red" />
                            <div className="dot yellow" />
                            <div className="dot green" />
                        </div>
                        <span className="code-lang">code_editor.py</span>
                    </div>
                    <div className="code-window" style={{ flex: 1, padding: 0, overflow: 'hidden' }}>
                        <textarea ref={textareaRef} id="code_input" />
                    </div>
                    <div className="complexity-bar">
                        <div className="state-row">
                            <span>Detected Args:</span> 
                            <span className="cv" style={{ color: argsHintColor, maxWidth: '200px', textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{argsHint}</span>
                        </div>
                    </div>
                </div>

                <div className="viz-main">
                    <div className="controls">
                        <div className="input-group" style={{ flex: 1, opacity: mode === 'script' ? 0.5 : 1, pointerEvents: mode === 'script' ? 'none' : 'auto' }}>
                            <label>Method Arguments</label>
                            <input
                                type="text"
                                id="debugger-test-args"
                                placeholder={argsPlaceholder}
                                disabled={mode === 'script'}
                                defaultValue='"A man, a plan, a canal: Panama"'
                                style={{ width: '100%', maxWidth: '400px' }}
                            />
                        </div>
                        <button className="btn btn-ghost" onClick={toggleEditor}>
                            {isEditorOpen ? 'Hide Editor' : 'Show Editor'}
                        </button>
                        <button className="btn btn-primary" onClick={runCode} disabled={isExecuting}>
                            {isExecuting ? 'Executing...' : 'Run & Visualize'}
                        </button>
                    </div>

                    {!iframeUrl ? (
                        <div className="viz-area" style={{ flexDirection: 'column', textAlign: 'center', gap: '16px' }}>
                            <h2 style={{ fontSize: '24px', margin: 0, color: 'var(--text-main)' }}>Ready to Trace</h2>
                            <p style={{ maxWidth: '400px', margin: 0, color: 'var(--text-muted)' }}>
                                Paste a LeetCode <b>class Solution:</b> block! The tool will automatically instantiate it, call your method with the arguments you provide, and map out the memory state.
                            </p>
                            <div style={{ marginTop: '8px', fontSize: '13px', color: argsHintColor, fontFamily: 'var(--font-code)' }}>
                                {argsHint}
                            </div>
                        </div>
                    ) : (
                        <iframe
                            style={{ flex: 1, width: '100%', border: 'none', background: '#fff' }}
                            src={iframeUrl}
                            title="Python Tutor Visualizer"
                        />
                    )}
                    
                    <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span>Visualizations powered by <a href="https://pythontutor.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#a78bfa', textDecoration: 'none' }}>Python Tutor</a></span>
                        </div>
                        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', fontStyle: 'italic' }}>
                            Adheres to CC BY License
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
