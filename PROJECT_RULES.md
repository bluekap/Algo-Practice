# AlgoPractice Hub Architecture Rules

1. **Masterclass First Architecture**:
    - The main `index.html` file should ONLY link to "Masterclass" modules (e.g., `array_patterns_masterclass.html`, `binary_search_masterclass.html`).
    - Individual visualizers, guides, or specific pattern HTML files should NOT be directly linked from the main `index.html`.

2. **Masterclass Structure**:
    - Each Masterclass is a top-level hub for a specific topic (Arrays, Binary Search, Trees, etc.).
    - Masterclasses use a tabbed interface to organize the varied content.
    - Standard Tabs include:
        - **Revision Guide / Study Guide**: Core mental models, intuition, and templates.
        - **Visualizer / Visual Playground**: Interactive tools for stepping through the algorithm.
        - **Templates**: Universal skeleton code for the topic.
        - **Problem Mapping**: When to use which pattern.
        - **Quiz Drill**: Interview prep questions.

3. **Embedding vs. Linking Sub-Pages**:
    - **Linking (Preferred for Tooling)**: If a visualizer or tool is complex and has its own full-page layout (like `binary_search_visualizer.html`), DO NOT embed it within the Masterclass using an `<iframe>`. This causes cramped UX and double-headers. Instead, the Masterclass should act as a portal/menu that links out to these separate HTML pages.
    - **Embedding (For simple text)**: If it's a simple guide or tiny component, you may inline the HTML directly into a tab's content within the Masterclass.

4. **Navigation Standards**:
    - **Back to Hub**: Every Masterclass portal must have a "Back to Hub" link at the top left (absolute or static) pointing to `index.html`.
    - **Back to Masterclass**: Every detail page (Guide, Visualizer, Quiz) must have a "Back to Masterclass" link at the top left pointing back to its parent Masterclass.
    - **Consistent Icon**: Use the `arrow-left` SVG icon for all back navigation.
    - **Design**: Pointers and labels should use `var(--text-muted)` and transition to `var(--text-main)` on hover.
