import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './loginPage';
import SalesforceDashboard from './SalesforceDashboard';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('sfAuthenticated') === 'true';
  });

  const handleLogin = () => {
    localStorage.setItem('sfAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('sfAuthenticated');
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
        element={isAuthenticated ? <SalesforceDashboard onLogout={handleLogout} /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;


