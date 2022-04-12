import React from 'react';
import { useIntl } from 'react-intl';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
} from 'react-pro-sidebar';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './Pages/Home';
import Fib from './Pages/Fib';
import MergesortVisualizer from './Pages/MergeSort';
import QuicksortVisualizer from './Pages/QuickSort';
import BubblesortVisualizer from './Pages/BubbleSort';
import InsertionsortVisualizer from './Pages/InsertionSort';
import Dijkstra from './Pages/Dijkstra';

const Aside = ({toggled, handleToggleSidebar }) => {
  const intl = useIntl();
  return (
    <Router>
      <ProSidebar
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: '24px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 14,
              letterSpacing: '1px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {intl.formatMessage({ id: 'sidebarTitle' })}
          </div>
        </SidebarHeader>
          
        <SidebarContent>
          <Menu>
            <MenuItem>Home
            <Link to="/home" />
            </MenuItem>
            {/* Graph */}
          
            <SubMenu title="Graph (doesn't work)">
              <MenuItem>Breadth-first Search</MenuItem>
              <MenuItem>Depth-first Search</MenuItem>
              <MenuItem>Prim’s</MenuItem>
              <MenuItem>Kruskal’s</MenuItem>
              <MenuItem>Dijkstra’s
              <Link to="/dijkstra" /> 
              </MenuItem>
              <MenuItem>Tarjan’s</MenuItem>
            </SubMenu>
          
            {/* Dynamic Programming */}
          
            <SubMenu title="Dynamic Programming (doesn't work)">
              <MenuItem> Calculating nth Fibonacci Number
              <Link to="/fib" />
              </MenuItem>
            </SubMenu>
          
            {/* Sorting */}
          
            <SubMenu title='Sorting'>
              <MenuItem>Merge Sort 
              <Link to="/mergesort" /> 
              </MenuItem>
              <MenuItem>Quicksort
              <Link to="/quicksort" />
              </MenuItem>
              <MenuItem>Bubble Sort
              <Link to="/bubblesort" />
              </MenuItem>
              <MenuItem>Insertion Sort 
              <Link to="insertionsort" />
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>
      </ProSidebar>

      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route path="/fib" element={<Fib />} />
        <Route path="/mergesort" element={<MergesortVisualizer />} />
        <Route path="/quicksort" element={<QuicksortVisualizer />} />
        <Route path="/bubblesort" element={<BubblesortVisualizer />} />
        <Route path="/insertionsort" element={<InsertionsortVisualizer />} />
        <Route path="/dijkstra" element={<Dijkstra />} />
      </Routes>
    </Router>
  );
};

export default Aside;
