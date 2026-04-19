import fs from 'fs';
import path from 'path';

const SRC_DIR = './topics';
const OUT_DIR = './src/pages/topics';

if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
}

const files = fs.readdirSync(SRC_DIR).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(SRC_DIR, file), 'utf8');
    
    // Extract everything between <body> and </body>
    const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    let bodyContent = bodyMatch ? bodyMatch[1] : content;

    // Convert to JSX
    bodyContent = bodyContent.replace(/class=/g, 'className=');
    bodyContent = bodyContent.replace(/<br>/g, '<br />');
    bodyContent = bodyContent.replace(/<hr>/g, '<hr />');
    bodyContent = bodyContent.replace(/<img(.*?[^\/])>/g, '<img$1 />');
    bodyContent = bodyContent.replace(/<input(.*?[^\/])>/g, '<input$1 />');
    // Deal with stroke-width -> strokeWidth, fill-rule -> fillRule, etc. in SVGs
    bodyContent = bodyContent.replace(/stroke-width/g, 'strokeWidth');
    bodyContent = bodyContent.replace(/stroke-linecap/g, 'strokeLinecap');
    bodyContent = bodyContent.replace(/stroke-linejoin/g, 'strokeLinejoin');
    bodyContent = bodyContent.replace(/fill-rule/g, 'fillRule');
    bodyContent = bodyContent.replace(/clip-rule/g, 'clipRule');
    bodyContent = bodyContent.replace(/xmlns:xlink/g, 'xmlnsXlink');

    // Remove the explicit back to index.html links, react-router handles this best via <Link> but for now href="/" works.
    bodyContent = bodyContent.replace(/<a href="\.\.\/index\.html"([^>]*)>/g, '<a href="/"$1>');

    const compName = file.replace('.html', '').split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    
    const jsxContent = `import React from 'react';

export default function ${compName}() {
    return (
        <div className="topic-page">
            ${bodyContent}
        </div>
    );
}
`;

    fs.writeFileSync(path.join(OUT_DIR, file.replace('.html', '.jsx')), jsxContent);
});

console.log('Conversion complete!');
