# 🏔️ AlgoPractice Hub

A premium, interactive platform for mastering data structures and algorithms. Built with a focus on **mental models**, **pattern recognition**, and **visual intuition**.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)

## 🚀 Key Features

### 1. Interactive Visualizers
Real-time, step-by-step visualizations for core algorithm patterns:
- **Array Patterns**: Sliding Window (Fixed/Variable), Two Pointers.
- **Binary Search**: Exact match, boundary search, and rotated array logic.
- **Dynamic Programming**: 1D/2D state transitions and grid paths.
- **Heaps**: Min-heap/Max-heap operations and Top-K patterns.
- **Trees**: Interactive DFS (Preorder, Inorder, Postorder) and BFS (Level Order) traversals.

### 2. Pattern Revision Guides
Comprehensive guides designed for quick revision before interviews:
- **Trigger Recognition**: Keywords to look for in problem descriptions.
- **Universal Templates**: Skeleton code that solves 80% of problems in a category.
- **Advanced Extensions**: Deep dives into complex variants (e.g., **3Sum & Generalized K-Sum**).
- **Expert Mental Models**: Intuition-first explanations that stick.

### 3. Live Python Debugger
A built-in execution environment to visualize your own Python code. Trace state changes and pointer movements in real-time.

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Vanilla CSS (Custom Glassmorphism Design System)
- **Architecture**: Iframe-based sandbox for isolated, real-time code visualization and debugging.
- **Routing**: React Router v6 (HashRouter for GitHub Pages compatibility)
- **Security**: Husky + Secretlint pre-commit hooks to prevent credential leaks.
- **Deployment**: Automated GitHub Actions pipeline to GitHub Pages.
- **Icons**: Custom SVG + Lucide-style iconography

## 🏁 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/bluekap/Algo-Practice.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:5173`

## 🌐 Deployment

This project is configured for **Continuous Deployment (CD)** to GitHub Pages.
Whenever you push changes to the `main` branch, a GitHub Action workflow automatically builds the Vite project and deploys the `dist` folder to your live GitHub Pages site.

## 📸 Screenshots

*(Add screenshots of your premium UI here)*

## 📄 License & Terms

- **Project License**: MIT License - see the [LICENSE](LICENSE) file for details.
- **Service Attribution**: This project utilizes Python Tutor - see [TERMS.md](TERMS.md) for usage terms and screenshot policies.

---
Built with ❤️ by [bluekap](https://github.com/bluekap)
