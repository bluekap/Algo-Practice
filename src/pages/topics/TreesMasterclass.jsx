import React from 'react';
import { Link } from 'react-router-dom';

export default function TreesMasterclass() {
    return (
        <div className="topic-page">
            <header className="page-header">
                <Link to="/" className="nav-back">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Hub
                </Link>
                <h1>Trees Masterclass</h1>
                <p>Master DOM-like traversals, BSTs, and path finding algorithms.</p>
            </header>
            
            <div className="section-card-body mental-model">
                <strong>Coming Soon:</strong> This module is under active development. You will learn:
                <ul>
                    <li>Inorder, Preorder, Postorder traversals</li>
                    <li>Binary Search Tree (BST) operations</li>
                    <li>Lowest Common Ancestor (LCA) algorithms</li>
                </ul>
            </div>
        </div>
    );
}
