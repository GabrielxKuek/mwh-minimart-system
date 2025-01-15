// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import UserManagement from "./pages/UserManagement";
import RequestManagement from "./pages/RequestManagement";
import InventoryManagement from "./pages/InventoryManagement";
import Achievements from "./pages/Achievements";
import Leaderboard from "./pages/Leaderboard";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";


function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="mb-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/user-management">User Management</Link>
            </li>
            <li>
              <Link to="/request-management">Request Management</Link>
              <Link to="/inventory-management">Inventory Management</Link>
            </li>
            <li>
              <Link to="/achievements">Achievements</Link>
            </li>
            <li>
              <Link to="/leaderboard">Leaderboard</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <div>
                  <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                  </a>
                  <a href="https://react.dev" target="_blank" rel="noreferrer">
                    <img
                      src={reactLogo}
                      className="logo react"
                      alt="React logo"
                    />
                  </a>
                </div>
                <h1>Vite + React</h1>
                <p>Your original content here.</p>
              </>
            }
          />
          <Route
            path="/user-management"
            element={
              <>
                <UserManagement />
                <ToastContainer />
              </>
            }
          />
          <Route
            path="/request-management"
            element={
              <>
                <RequestManagement />
            path="/inventory-management"
            element={
              <>
                <InventoryManagement />
                <ToastContainer />
              </>
            }
          />
          <Route path="/achievements" element={<Achievements />} />

          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
