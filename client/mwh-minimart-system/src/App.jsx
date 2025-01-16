import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider, useAuth } from "./components/authentication/AuthContext.jsx";
import Login from "./pages/Login";
import UserManagement from "./pages/UserManagement";
import RequestManagement from "./pages/RequestManagement";
import RequestHistory from "./pages/RequestHistory";
import InventoryManagement from "./pages/InventoryManagement";
import TaskManagement from "./pages/TaskManagement";
import Achievements from "./pages/Achievements";
import Leaderboard from "./pages/Leaderboard";
import Vouchers from "./pages/Vouchers";
import Minimart from "./pages/Minimart";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useState, useRef } from "react";
import PropTypes from 'prop-types';

// Protected Route wrapper component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Role Protected Route wrapper component
const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated } = useAuth();
  const roleId = sessionStorage.getItem('roleId');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return allowedRoles.includes(roleId) ? children : <Navigate to="/login" replace />;
};

RoleProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const Navigation = () => {
  const { logout } = useAuth();
  const roleId = sessionStorage.getItem('roleId');
  const isAdmin = roleId === 'admin';
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  return (
    <nav className="mb-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        {isAdmin && (
          <>
            <li>
              <Link to="/user-management">User Management</Link>
            </li>
            <li
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className="cursor-pointer">Request Management</span>
              {isDropdownOpen && (
                <ul className="absolute mt-2 bg-white border rounded shadow-lg">
                  <li>
                    <Link to="/request-management" className="block px-4 py-2 hover:bg-gray-200">
                      Current
                    </Link>
                  </li>
                  <li>
                    <Link to="/request-history" className="block px-4 py-2 hover:bg-gray-200">
                      History
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link to="/inventory-management">Inventory Management</Link>
            </li>
            <li>
              <Link to="/task-management">Task Management</Link>
            </li>
          </>
        )}
        <li>
          <Link to="/achievements">Achievements</Link>
        </li>
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
        <li>
          <Link to="/minimart">Minimart</Link>
        </li>
        <li>
          <Link to="/vouchers">Vouchers</Link>
        </li>
        <li>
          <button 
            onClick={logout}
            className="text-red-600 hover:text-red-800"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="p-4">
      {isAuthenticated && <Navigation />}
      {children}
      <ToastContainer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} /> {/* Set a default route */}
            <Route path="/user-management" element={<RoleProtectedRoute allowedRoles={['admin']}><UserManagement /></RoleProtectedRoute>} />
            <Route path="/request-management" element={<RoleProtectedRoute allowedRoles={['admin']}><RequestManagement /></RoleProtectedRoute>} />
            <Route path="/request-history" element={<RoleProtectedRoute allowedRoles={['admin']}><RequestHistory /></RoleProtectedRoute>} />
            <Route path="/inventory-management" element={<RoleProtectedRoute allowedRoles={['admin']}><InventoryManagement /></RoleProtectedRoute>} />
            <Route path="/task-management" element={<RoleProtectedRoute allowedRoles={['admin']}><TaskManagement /></RoleProtectedRoute>} />
            <Route path="/achievements" element={<ProtectedRoute><Achievements /></ProtectedRoute>} />
            <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
            <Route path="/minimart" element={<ProtectedRoute><Minimart /></ProtectedRoute>} />
            <Route path="/vouchers" element={<ProtectedRoute><Vouchers /></ProtectedRoute>} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;