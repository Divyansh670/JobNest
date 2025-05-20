import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import '../styles/pages/NotFound.css';

const NotFound: React.FC = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>
            The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="not-found-actions">
            <Link to="/" className="btn">
              <Home size={18} />
              <span>Go Home</span>
            </Link>
            <Link to="/jobs" className="btn-secondary">
              <Search size={18} />
              <span>Browse Jobs</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;