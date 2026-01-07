import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import PartsManagement from './pages/PartsManagement';
import ServiceManagement from './pages/ServiceManagement';
import Orders from './pages/Orders';
import MechanicManagement from './pages/MechanicManagement';
import Offers from './pages/Offers';
import Reports from './pages/Reports';

// Placeholder components for other pages
const Placeholder = ({ title }) => (
  <Layout title={title}>
    <div className="card">
      <h2>{title} Page</h2>
      <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
        This module is currently being implemented. Check back soon for full functionality!
      </p>
    </div>
  </Layout>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout title="Dashboard"><Dashboard /></Layout>} />
        <Route path="/parts" element={<Layout title="Parts Management"><PartsManagement /></Layout>} />
        <Route path="/services" element={<Layout title="Service Requests"><ServiceManagement /></Layout>} />
        <Route path="/mechanics" element={<Layout title="Mechanics Management"><MechanicManagement /></Layout>} />
        <Route path="/orders" element={<Layout title="Orders & Billing"><Orders /></Layout>} />
        <Route path="/offers" element={<Layout title="Offers & Promos"><Offers /></Layout>} />
        <Route path="/reports" element={<Layout title="Reports & Analytics"><Reports /></Layout>} />
        <Route path="/settings" element={<Placeholder title="Settings" />} />
      </Routes>
    </Router>
  );
}

export default App;
