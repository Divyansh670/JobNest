import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Briefcase, UserCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';
import '../styles/components/Navbar.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser, isAuthenticated, logout } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scrolling effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-logo">
            <Briefcase className="logo-icon" />
            <span>JobNest</span>
          </Link>

          <button 
            className="navbar-toggle" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
            <ul className="navbar-links">
              <li>
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className={location.pathname.startsWith('/jobs') ? 'active' : ''}>
                  Jobs
                </Link>
              </li>
              {isAuthenticated && currentUser?.role === 'jobseeker' && (
                <>
                  <li>
                    <Link to="/dashboard" className={location.pathname.startsWith('/dashboard') ? 'active' : ''}>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/applications" className={location.pathname.startsWith('/applications') ? 'active' : ''}>
                      Applications
                    </Link>
                  </li>
                  <li>
                    <Link to="/bookmarks" className={location.pathname.startsWith('/bookmarks') ? 'active' : ''}>
                      Saved Jobs
                    </Link>
                  </li>
                </>
              )}
              {isAuthenticated && currentUser?.role === 'employer' && (
                <>
                  <li>
                    <Link to="/employer/dashboard" className={location.pathname.startsWith('/employer/dashboard') ? 'active' : ''}>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/employer/post-job" className={location.pathname.startsWith('/employer/post-job') ? 'active' : ''}>
                      Post Job
                    </Link>
                  </li>
                  <li>
                    <Link to="/employer/jobs" className={location.pathname.startsWith('/employer/jobs') ? 'active' : ''}>
                      Manage Jobs
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <div className="navbar-auth">
              {isAuthenticated ? (
                <div className="user-menu">
                  <Link to={currentUser?.role === 'employer' ? '/employer/profile' : '/profile'} className="user-profile">
                    <UserCircle size={20} />
                    <span>{currentUser?.name}</span>
                  </Link>
                  <button onClick={handleLogout} className="btn-secondary">
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="btn-secondary">
                    Login
                  </Link>
                  <Link to="/register" className="btn">
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;