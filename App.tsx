import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Search from './pages/Search';
import ArtistProfile from './pages/ArtistProfile';
import BookingFlow from './pages/BookingFlow';
import ClientDashboard from './pages/ClientDashboard';
import ArtistDashboard from './pages/ArtistDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ArtistLogin from './pages/ArtistLogin';
import ArtistSignup from './pages/ArtistSignup';
import ArtistProfileSetup from './pages/ArtistProfileSetup';
import ClientLogin from './pages/ClientLogin';
import ClientSignup from './pages/ClientSignup';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <HashRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/search" element={<Layout><Search /></Layout>} />
              <Route path="/artist/:id" element={<Layout><ArtistProfile /></Layout>} />
              
              {/* Auth Routes */}
              <Route path="/artist/login" element={<Layout><ArtistLogin /></Layout>} />
              <Route path="/artist/signup" element={<Layout><ArtistSignup /></Layout>} />
              <Route path="/client/login" element={<Layout><ClientLogin /></Layout>} />
              <Route path="/client/signup" element={<Layout><ClientSignup /></Layout>} />

              {/* Protected Routes - Client */}
              <Route element={<ProtectedRoute allowedRoles={['client']} />}>
                <Route path="/booking" element={<Layout><BookingFlow /></Layout>} />
                <Route path="/dashboard/client" element={<Layout><ClientDashboard /></Layout>} />
              </Route>

              {/* Protected Routes - Artist */}
              <Route element={<ProtectedRoute allowedRoles={['artist']} />}>
                <Route path="/artist/setup" element={<Layout><ArtistProfileSetup /></Layout>} />
                <Route path="/dashboard/artist" element={<Layout><ArtistDashboard /></Layout>} />
              </Route>

              {/* Protected Routes - Admin */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/dashboard/admin" element={<Layout><AdminDashboard /></Layout>} />
              </Route>

            </Routes>
          </HashRouter>
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
};

export default App;