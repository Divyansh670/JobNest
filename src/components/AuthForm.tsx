import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserRole, useUser } from '../context/UserContext';
import '../styles/components/AuthForm.css';

interface AuthFormProps {
  type: 'login' | 'register';
  defaultRole?: UserRole;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, defaultRole = null }) => {
  const navigate = useNavigate();
  const { login, register } = useUser();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: defaultRole,
    companyName: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (type === 'register') {
      if (!formData.name) newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (type === 'register') {
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      
      if (!formData.role) {
        newErrors.role = 'Please select a role';
      }
      
      if (formData.role === 'employer' && !formData.companyName) {
        newErrors.companyName = 'Company name is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      if (type === 'login') {
        login(formData.email, formData.password, formData.role);
        navigate(formData.role === 'employer' ? '/employer/dashboard' : '/dashboard');
      } else {
        register(
          {
            name: formData.name,
            email: formData.email,
            role: formData.role,
            companyName: formData.role === 'employer' ? formData.companyName : undefined,
          }, 
          formData.password
        );
        navigate(formData.role === 'employer' ? '/employer/dashboard' : '/dashboard');
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">
          {type === 'login' ? 'Sign In to Your Account' : 'Create Your Account'}
        </h2>
        
        {type === 'register' && (
          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab ${formData.role === 'jobseeker' ? 'active' : ''}`}
              onClick={() => setFormData(prev => ({ ...prev, role: 'jobseeker' }))}
            >
              Job Seeker
            </button>
            <button
              type="button"
              className={`auth-tab ${formData.role === 'employer' ? 'active' : ''}`}
              onClick={() => setFormData(prev => ({ ...prev, role: 'employer' }))}
            >
              Employer
            </button>
          </div>
        )}
        
        {type === 'register' && (
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>
        )}
        
        {type === 'register' && formData.role === 'employer' && (
          <div className="form-group">
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter your company name"
              className={errors.companyName ? 'error' : ''}
            />
            {errors.companyName && <div className="error-message">{errors.companyName}</div>}
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>
        
        {type === 'register' && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={errors.confirmPassword ? 'error' : ''}
            />
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>
        )}
        
        {type === 'login' && (
          <div className="form-group">
            <label htmlFor="role">Login as</label>
            <select
              id="role"
              name="role"
              value={formData.role || ''}
              onChange={handleChange}
              className={errors.role ? 'error' : ''}
            >
              <option value="">Select role</option>
              <option value="jobseeker">Job Seeker</option>
              <option value="employer">Employer</option>
            </select>
            {errors.role && <div className="error-message">{errors.role}</div>}
          </div>
        )}
        
        <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
          {isSubmitting 
            ? 'Processing...' 
            : type === 'login' 
              ? 'Sign In' 
              : 'Create Account'}
        </button>
        
        <div className="auth-footer">
          {type === 'login' ? (
            <p>
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          ) : (
            <p>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;