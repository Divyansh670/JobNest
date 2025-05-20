import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import { JobsProvider } from './context/JobsContext';
import { ApplicationsProvider } from './context/ApplicationsContext';
import { BookmarksProvider } from './context/BookmarksContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/JobSeeker/Profile';
import Dashboard from './pages/JobSeeker/Dashboard';
import Applications from './pages/JobSeeker/Applications';
import Bookmarks from './pages/JobSeeker/Bookmarks';
import EmployerDashboard from './pages/Employer/Dashboard';
import PostJob from './pages/Employer/PostJob';
import ManageJobs from './pages/Employer/ManageJobs';
import ViewApplicants from './pages/Employer/ViewApplicants';
import EmployerProfile from './pages/Employer/Profile';
import NotFound from './pages/NotFound';

// Styles
import './styles/global.css';

// Protected Route component
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole?: 'jobseeker' | 'employer';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRole 
}) => {
  const { isAuthenticated, currentUser } = useUser();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRole && currentUser?.role !== allowedRole) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<JobDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Job Seeker Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute allowedRole="jobseeker">
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute allowedRole="jobseeker">
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/applications" element={
        <ProtectedRoute allowedRole="jobseeker">
          <Applications />
        </ProtectedRoute>
      } />
      <Route path="/bookmarks" element={
        <ProtectedRoute allowedRole="jobseeker">
          <Bookmarks />
        </ProtectedRoute>
      } />
      
      {/* Employer Routes */}
      <Route path="/employer/dashboard" element={
        <ProtectedRoute allowedRole="employer">
          <EmployerDashboard />
        </ProtectedRoute>
      } />
      <Route path="/employer/profile" element={
        <ProtectedRoute allowedRole="employer">
          <EmployerProfile />
        </ProtectedRoute>
      } />
      <Route path="/employer/post-job" element={
        <ProtectedRoute allowedRole="employer">
          <PostJob />
        </ProtectedRoute>
      } />
      <Route path="/employer/jobs" element={
        <ProtectedRoute allowedRole="employer">
          <ManageJobs />
        </ProtectedRoute>
      } />
      <Route path="/employer/jobs/:id/applicants" element={
        <ProtectedRoute allowedRole="employer">
          <ViewApplicants />
        </ProtectedRoute>
      } />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <UserProvider>
        <JobsProvider>
          <ApplicationsProvider>
            <BookmarksProvider>
              <div className="app">
                <Navbar />
                <main className="main-content">
                  <AppRoutes />
                </main>
                <Footer />
              </div>
            </BookmarksProvider>
          </ApplicationsProvider>
        </JobsProvider>
      </UserProvider>
    </Router>
  );
}

export default App;