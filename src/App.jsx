import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './loginPage';
import Dashboard from './SalesforceDashboard';
import JobDetails from './JobDetails';
import Layout from './components/Layout';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('authenticated') === 'true';
  });

  const handleLogin = () => {
    localStorage.setItem('authenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    setIsAuthenticated(false);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={!isAuthenticated ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/dashboard" replace />}
      />
      <Route
        path="/dashboard"
        element={isAuthenticated ? (
          <Layout onLogout={handleLogout}>
            <Dashboard />
          </Layout>
        ) : <Navigate to="/" replace />}
      />
      <Route
        path="/job/:id"
        element={isAuthenticated ? (
          <Layout onLogout={handleLogout}>
            <JobDetails />
          </Layout>
        ) : <Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;
