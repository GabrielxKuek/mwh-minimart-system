import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider, useAuth } from "./components/authentication/AuthContext";
import PropTypes from "prop-types";

// Components
import Navbar from "./components/navbar/Navbar";

// Pages
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
import Dashboard from "./pages/Dashboard";
import Task from "./pages/Tasks";
import TransactionManagement from "./pages/TransactionManagement";
import Profile from "./pages/Profile";
import Reports from "./pages/Reports";
import TaskCompletionRequest from "./pages/TaskCompletionRequest";

// Constants
const ADMIN_ROLE = "admin";

// Protected Route Components
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();
  const roleId = user?.role || sessionStorage.getItem("roleId");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(roleId)) {
    return <Navigate to="/tasks" replace />;
  }

  return children;
};

RoleProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

// Layout Component
const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && <Navbar />}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
      <ToastContainer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

// Main App Routes Component
const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          } 
        />
        
        <Route 
          path="/" 
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
          } 
        />

        {/* Admin Routes */}
        <Route
          path="/dashboard"
          element={
            <RoleProtectedRoute allowedRoles={[ADMIN_ROLE]}>
              <Dashboard />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/user-management"
          element={
            <RoleProtectedRoute allowedRoles={[ADMIN_ROLE]}>
              <UserManagement />
            </RoleProtectedRoute>
          }
        />
        
        <Route
          path="/request-management"
          element={
            <RoleProtectedRoute allowedRoles={[ADMIN_ROLE]}>
              <RequestManagement />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/request-history"
          element={
            <RoleProtectedRoute allowedRoles={[ADMIN_ROLE]}>
              <RequestHistory />
            </RoleProtectedRoute>
          }
        />
        
        <Route
          path="/inventory-management"
          element={
            <RoleProtectedRoute allowedRoles={[ADMIN_ROLE]}>
              <InventoryManagement />
            </RoleProtectedRoute>
          }
        />
        
        <Route
          path="/task-management"
          element={
            <RoleProtectedRoute allowedRoles={[ADMIN_ROLE]}>
              <TaskManagement />
            </RoleProtectedRoute>
          }
        />
        
        <Route
          path="/transactions"
          element={
            <RoleProtectedRoute allowedRoles={[ADMIN_ROLE]}>
              <TransactionManagement />
            </RoleProtectedRoute>
          }
        />
        
        <Route
          path="/reports"
          element={
            <RoleProtectedRoute allowedRoles={[ADMIN_ROLE]}>
              <Reports />
            </RoleProtectedRoute>
          }
        />

        {/* Protected Routes for All Users */}
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Task />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/achievements"
          element={
            <ProtectedRoute>
              <Achievements />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/minimart"
          element={
            <ProtectedRoute>
              <Minimart />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/vouchers"
          element={
            <ProtectedRoute>
              <Vouchers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/task-completion-request"
          element={
            <ProtectedRoute>
              <TaskCompletionRequest />
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route 
          path="*" 
          element={
            <Navigate to={isAuthenticated ? "/tasks" : "/login"} replace />
          } 
        />
      </Routes>
    </Layout>
  );
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;