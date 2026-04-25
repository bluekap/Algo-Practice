import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Array Topic
import ArrayPatternsMasterclass from './pages/topics/array_patterns_masterclass';
import ArrayPatternsGuide from './pages/topics/array_patterns_guide';
import ArrayPatternsVisualizer from './pages/topics/array_patterns_visualizer';

// Binary Search Topic
import BinarySearchMasterclass from './pages/topics/binary_search_masterclass';
import BinarySearchGuide from './pages/topics/binary_search_guide';
import BinarySearchVisualizer from './pages/topics/binary_search_visualizer';

// Heap Topic
import HeapMasterclass from './pages/topics/heap_masterclass';
import HeapGuide from './pages/topics/heap_guide';
import HeapVisualizer from './pages/topics/heap_visualizer';

// DP Topic
import DpMasterclass from './pages/topics/dp_masterclass';
import DpGuide from './pages/topics/dp_guide';
import DpVisualizer from './pages/topics/dp_visualizer';
import DpPattern1D from './pages/topics/dp_pattern_1d';
import DpPattern2D from './pages/topics/dp_pattern_2d';
import DpPatternKnapsack from './pages/topics/dp_pattern_knapsack';
import DpPatternSubsequence from './pages/topics/dp_pattern_lcs_lis';
import DpPatternInterval from './pages/topics/dp_pattern_interval';

// Trees Topic
import TreesMasterclass from './pages/topics/TreesMasterclass';

// Graphs Topic
import GraphsMasterclass from './pages/topics/GraphsMasterclass';

// Debugger/Visualizer Topic
import LivePythonVisualizer from './pages/topics/live_python_visualizer';


function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          
          {/* Array Topic Routes */}
          <Route path="topics/arrays" element={<ArrayPatternsMasterclass />} />
          <Route path="topics/arrays/guide" element={<ArrayPatternsGuide />} />
          <Route path="topics/arrays/visualizer" element={<ArrayPatternsVisualizer />} />

          {/* Binary Search Topic Routes */}
          <Route path="topics/binary-search" element={<BinarySearchMasterclass />} />
          <Route path="topics/binary-search/guide" element={<BinarySearchGuide />} />
          <Route path="topics/binary-search/visualizer" element={<BinarySearchVisualizer />} />

          {/* Heap Topic Routes */}
          <Route path="topics/heap" element={<HeapMasterclass />} />
          <Route path="topics/heap/guide" element={<HeapGuide />} />
          <Route path="topics/heap/visualizer" element={<HeapVisualizer />} />

          {/* DP Topic Routes */}
          <Route path="topics/dp" element={<DpMasterclass />} />
          <Route path="topics/dp/guide" element={<DpGuide />} />
          <Route path="topics/dp/visualizer" element={<DpVisualizer />} />
          <Route path="topics/dp/pattern-1d" element={<DpPattern1D />} />
          <Route path="topics/dp/pattern-2d" element={<DpPattern2D />} />
          <Route path="topics/dp/pattern-knapsack" element={<DpPatternKnapsack />} />
          <Route path="topics/dp/pattern-subsequence" element={<DpPatternSubsequence />} />
          <Route path="topics/dp/pattern-interval" element={<DpPatternInterval />} />

          {/* Trees & Graphs Routes */}
          <Route path="topics/trees" element={<TreesMasterclass />} />
          <Route path="topics/graphs" element={<GraphsMasterclass />} />

          {/* Debugger Routes */}
          <Route path="topics/debugger" element={<LivePythonVisualizer />} />

          {/* Topics will be nested here later */}

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
