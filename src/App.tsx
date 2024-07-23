import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Dashboard from './dashboard/Dashboard';
import Categories from './dashboard/Categories';
import Products from './dashboard/Products';
import ProtectedRoute from './ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
          <Route path="categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
          <Route path="products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
