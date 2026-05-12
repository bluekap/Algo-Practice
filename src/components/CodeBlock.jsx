import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import 'highlight.js/styles/tokyo-night-dark.css';

hljs.registerLanguage('python', python);

export default function CodeBlock({ code, language = 'python', title }) {
    const codeRef = useRef(null);

    useEffect(() => {
        if (codeRef.current) {
            hljs.highlightElement(codeRef.current);
        }
    }, [code]);

    return (
        <div className="code-container">
            <div className="code-header">
                <div className="dots">
                    <div className="dot red"></div>
                    <div className="dot yellow"></div>
                    <div className="dot green"></div>
                </div>
                <span className="code-lang">{title || `${language}`}</span>
            </div>
            <pre>
                <code ref={codeRef} className={`language-${language}`}>
                    {code.trim()}
                </code>
            </pre>
        </div>
    );
}
