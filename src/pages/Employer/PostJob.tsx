import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../../context/JobsContext';
import { useUser } from '../../context/UserContext';
import { Job } from '../../context/JobsContext';
import '../../styles/pages/PostJob.css';

const jobTypes = [
  { value: 'full-time', label: 'Full Time' },
  { value: 'part-time', label: 'Part Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'remote', label: 'Remote' },
];

const PostJob: React.FC = () => {
  const navigate = useNavigate();
  const { addJob } = useJobs();
  const { currentUser } = useUser();
  
  const [formData, setFormData] = useState({
    title: '',
    company: currentUser?.companyName || '',
    location: '',
    type: 'full-time' as Job['type'],
    salary: '',
    description: '',
    requirements: '',
    logoUrl: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.salary.trim()) {
      newErrors.salary = 'Salary information is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Job description is required';
    } else if (formData.description.length < 100) {
      newErrors.description = 'Job description should be at least 100 characters';
    }
    
    if (!formData.requirements.trim()) {
      newErrors.requirements = 'Job requirements are required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
    
    if (!validateForm() || !currentUser) return;
    
    setIsSubmitting(true);
    
    try {
      // Split requirements by line breaks to create an array
      const requirementsArray = formData.requirements
        .split('\n')
        .filter(line => line.trim() !== '')
        .map(line => line.trim());
      
      addJob({
        title: formData.title,
        company: formData.company,
        location: formData.location,
        type: formData.type,
        salary: formData.salary,
        description: formData.description,
        requirements: requirementsArray,
        employerId: currentUser.id,
        logoUrl: formData.logoUrl || undefined,
      });
      
      setSubmitSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        navigate('/employer/jobs');
      }, 2000);
      
    } catch (error) {
      console.error('Error posting job:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="post-job-page">
      <div className="container">
        <div className="post-job-container">
          <header className="post-job-header">
            <h1>Post a New Job</h1>
            <p>Fill out the form below to list a new position on JobNest</p>
          </header>
          
          {submitSuccess ? (
            <div className="success-message">
              <h2>Job Posted Successfully!</h2>
              <p>Your job listing has been created and is now live on JobNest.</p>
              <p>Redirecting to your job listings...</p>
            </div>
          ) : (
            <form className="post-job-form" onSubmit={handleSubmit}>
              <div className="form-section">
                <h2>Basic Information</h2>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="title">Job Title*</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g., Frontend Developer"
                      className={errors.title ? 'error' : ''}
                    />
                    {errors.title && <div className="error-message">{errors.title}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="company">Company Name*</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g., TechCorp Solutions"
                      className={errors.company ? 'error' : ''}
                    />
                    {errors.company && <div className="error-message">{errors.company}</div>}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="location">Location*</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., San Francisco, CA or Remote"
                      className={errors.location ? 'error' : ''}
                    />
                    {errors.location && <div className="error-message">{errors.location}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="type">Job Type*</label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                    >
                      {jobTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="salary">Salary Range*</label>
                    <input
                      type="text"
                      id="salary"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      placeholder="e.g., $70,000 - $90,000"
                      className={errors.salary ? 'error' : ''}
                    />
                    {errors.salary && <div className="error-message">{errors.salary}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="logoUrl">Company Logo URL (Optional)</label>
                    <input
                      type="text"
                      id="logoUrl"
                      name="logoUrl"
                      value={formData.logoUrl}
                      onChange={handleChange}
                      placeholder="e.g., https://example.com/logo.png"
                    />
                  </div>
                </div>
              </div>
              
              <div className="form-section">
                <h2>Job Details</h2>
                
                <div className="form-group">
                  <label htmlFor="description">Job Description*</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={8}
                    placeholder="Provide a detailed description of the job role, responsibilities, and what the successful candidate will do..."
                    className={errors.description ? 'error' : ''}
                  ></textarea>
                  {errors.description && <div className="error-message">{errors.description}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="requirements">Requirements and Qualifications*</label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    rows={6}
                    placeholder="List the skills, experience, and qualifications required for this position. Enter each requirement on a new line."
                    className={errors.requirements ? 'error' : ''}
                  ></textarea>
                  {errors.requirements && <div className="error-message">{errors.requirements}</div>}
                  <p className="form-help">Enter each requirement on a new line. For example:
                    <br />- 3+ years of experience with React.js
                    <br />- Bachelor's degree in Computer Science or related field
                  </p>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Posting...' : 'Post Job'}
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => navigate('/employer/jobs')}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostJob;