import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import '../styles/components/Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <Link to="/" className="footer-logo">
              <Briefcase className="logo-icon" />
              <span>JobNest</span>
            </Link>
            <p className="footer-description">
              Connecting talented professionals with innovative companies. 
              Find your dream job or the perfect candidate with JobNest.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook" className="social-link">
                <Facebook size={18} />
              </a>
              <a href="#" aria-label="Twitter" className="social-link">
                <Twitter size={18} />
              </a>
              <a href="#" aria-label="Instagram" className="social-link">
                <Instagram size={18} />
              </a>
              <a href="#" aria-label="LinkedIn" className="social-link">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">For Job Seekers</h3>
            <ul className="footer-links">
              <li><Link to="/jobs">Browse Jobs</Link></li>
              <li><Link to="/register?role=jobseeker">Create Account</Link></li>
              <li><Link to="/profile">Job Seeker Profile</Link></li>
              <li><Link to="/applications">My Applications</Link></li>
              <li><Link to="/bookmarks">Saved Jobs</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">For Employers</h3>
            <ul className="footer-links">
              <li><Link to="/register?role=employer">Create Account</Link></li>
              <li><Link to="/employer/post-job">Post a Job</Link></li>
              <li><Link to="/employer/dashboard">Employer Dashboard</Link></li>
              <li><Link to="/employer/jobs">Manage Jobs</Link></li>
              <li><Link to="/pricing">Pricing Plans</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Contact Us</h3>
            <div className="contact-info">
              <p><Mail size={16} /> support@jobnest.com</p>
              <p>123 Recruitment Street</p>
              <p>Job City, JB 12345</p>
              <p>United States</p>
            </div>
            <div className="newsletter">
              <h4>Subscribe to our newsletter</h4>
              <div className="newsletter-form">
                <input type="email" placeholder="Your email address" />
                <button className="btn">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} JobNest. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;