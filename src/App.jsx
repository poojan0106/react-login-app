import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './loginPage';
import Dashboard from './SalesforceDashboard';
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
        element={isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;
