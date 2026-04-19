# AlgoPractice Hub — Project Rules

## Project Structure (Modern React)

```
/
├── index.html                  ← Main entry (Standard Vite setup)
├── PROJECT_RULES.md
├── src/
│   ├── index.css               ← Central design system & standard layouts
│   ├── App.jsx                 ← Routing configuration
│   ├── pages/
│   │   └── topics/
│   │       ├── <topic>_masterclass.jsx   ← Topic Hub
│   │       ├── <topic>_guide.jsx          ← Revision Guide
│   │       └── <topic>_visualizer.jsx     ← Standard Visualizer
│   └── components/             ← Reusable UI components
```

Rules:
- All new logic must be in `.jsx` components.
- Shared styles must be added to `src/index.css` under the appropriate category.
- **Never** use one-off inline styles for layouts; use the Standard Visualizer classes.

---

## Visualizer Standard Architecture

Every topic visualizer MUST follow this 70/30 split layout for a premium, consistent experience:

### 1. Header (`.viz-header`)
- Back navigation on left (using `<Link>` and `.nav-back`).
- Vertical divider (`width: 1px`).
- Descriptive title with emoji (e.g. `🏔️ Heap Visualizer`).
- Right-aligned tabs for different modes/problems.

### 2. Layout Container (`.viz-container`)
- **Main Panel (`.viz-main`) — 70% width**:
    - **Controls (`.controls`)**: Inputs for custom data + primary **START** button.
    - **Viz Area (`.viz-area`)**: The dynamic visualization (SVG, Table, or D3).
    - **Playback (`.playback`)**: Standard control bar containing:
        - `Reset`, `Prev`, `Play / Pause`, `Next`.
    - **Explanation (`.explanation-box`)**: High-level text explaining the current step.
- **Sidebar (`.viz-sidebar`) — 300-350px width**:
    - **Code Window (`.code-window`)**: Line-by-line view of the Python implementation.
        - Must support `.code-line.active` highlighting for the current execution line.
    - **Complexity Bar (`.complexity-bar`)**:
        - Time/Space complexity badges.
        - Progress state (e.g., `Step: 5 / 20`).

---

## Navigation Standards

- Every masterclass → "Back to Hub" linking to `/`
- Every detail page (guide, visualizer) → "Back to Masterclass" linking to `/topics/<topic>`
- Use the arrow-left SVG icon for all back nav links.
- Use the `.nav-back` class in `index.css`.

---

## Design System

| Token | Value | Usage |
|---|---|---|
| Page Background | #07090f | body background |
| Header BG | #0d1117 | Top navigation components |
| Card Background | #0d1117 | Section/content cards |
| Code Background | #020408 | Code blocks & Sidebar |
| Primary Border | #1e293b | All component borders |
| Accent Purple | #a78bfa | Primary CTAs, active states (Primary P3) |
| Text Main | #e2e8f0 | Body copy |
| Text Muted Bright | #94a3b8 | Descriptions, explanations |
| Font (UI) | Outfit | Headings and labels |
| Font (Code) | JetBrains Mono | All code and logic |

---

## Scaling Checklist

Before shipping any new visualizer, verify:
- [ ] Uses `.viz-container` with 70/30 split.
- [ ] Includes Code Window on the right with active line tracking.
- [ ] Playback bar has Play/Pause, Next, and Prev functionality.
- [ ] Responsive: Layout degrades gracefully on medium screens.
- [ ] No raw `<script>` tags; all logic is in React hooks.
