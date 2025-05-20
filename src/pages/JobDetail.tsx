import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar, 
  Building, 
  Bookmark, 
  Share2, 
  BookmarkCheck,
  ArrowLeft
} from 'lucide-react';
import { useJobs } from '../context/JobsContext';
import { useUser } from '../context/UserContext';
import { useBookmarks } from '../context/BookmarksContext';
import { useApplications } from '../context/ApplicationsContext';
import '../styles/pages/JobDetail.css';

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getJobById } = useJobs();
  const { currentUser } = useUser();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const { applyToJob, hasApplied } = useApplications();
  
  const [isApplying, setIsApplying] = useState(false);
  const [application, setApplication] = useState({
    coverLetter: '',
    resume: '',
  });
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  
  const job = getJobById(id || '');
  
  if (!job) {
    return (
      <div className="container">
        <div className="job-not-found">
          <h2>Job Not Found</h2>
          <p>The job you are looking for does not exist or has been removed.</p>
          <Link to="/jobs" className="btn">Browse Jobs</Link>
        </div>
      </div>
    );
  }
  
  const formattedDate = new Date(job.postedDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  const isJobBookmarked = currentUser ? isBookmarked(currentUser.id, job.id) : false;
  const userHasApplied = currentUser?.role === 'jobseeker' ? hasApplied(currentUser.id, job.id) : false;
  
  const toggleBookmark = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (isJobBookmarked) {
      removeBookmark(currentUser.id, job.id);
    } else {
      addBookmark(currentUser.id, job.id);
    }
  };
  
  const handleApply = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (currentUser.role !== 'jobseeker') {
      return;
    }
    
    setIsApplying(true);
  };
  
  const handleApplicationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApplication(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const submitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) return;
    
    applyToJob(job.id, currentUser.id, {
      coverLetter: application.coverLetter,
      resume: application.resume
    });
    
    setApplicationSuccess(true);
    
    // Reset form
    setTimeout(() => {
      setIsApplying(false);
      setApplicationSuccess(false);
      setApplication({
        coverLetter: '',
        resume: '',
      });
    }, 3000);
  };
  
  return (
    <div className="job-detail-page">
      <div className="container">
        <div className="back-link">
          <Link to="/jobs">
            <ArrowLeft size={16} />
            <span>Back to jobs</span>
          </Link>
        </div>
        
        <div className="job-detail-container">
          <main className="job-detail-content">
            <header className="job-detail-header">
              <div className="job-company-logo">
                {job.logoUrl ? (
                  <img src={job.logoUrl} alt={`${job.company} logo`} />
                ) : (
                  <Building size={40} />
                )}
              </div>
              
              <div className="job-header-info">
                <h1 className="job-title">{job.title}</h1>
                <div className="job-company">{job.company}</div>
                
                <div className="job-meta">
                  <div className="job-meta-item">
                    <MapPin size={16} />
                    <span>{job.location}</span>
                  </div>
                  <div className="job-meta-item">
                    <Clock size={16} />
                    <span>{job.type}</span>
                  </div>
                  <div className="job-meta-item">
                    <DollarSign size={16} />
                    <span>{job.salary}</span>
                  </div>
                  <div className="job-meta-item">
                    <Calendar size={16} />
                    <span>Posted {formattedDate}</span>
                  </div>
                </div>
              </div>
            </header>
            
            <div className="job-actions-mobile">
              {currentUser?.role === 'jobseeker' && (
                <>
                  <button 
                    className={`btn ${userHasApplied ? 'btn-disabled' : ''}`} 
                    onClick={handleApply} 
                    disabled={userHasApplied}
                  >
                    {userHasApplied ? 'Applied' : 'Apply Now'}
                  </button>
                  <button 
                    className={`btn-icon ${isJobBookmarked ? 'active' : ''}`}
                    onClick={toggleBookmark}
                    aria-label={isJobBookmarked ? "Remove bookmark" : "Bookmark job"}
                  >
                    {isJobBookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                  </button>
                </>
              )}
              
              <button 
                className="btn-icon"
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                aria-label="Share job"
              >
                <Share2 size={20} />
              </button>
            </div>
            
            <section className="job-description">
              <h2>Job Description</h2>
              <p>{job.description}</p>
            </section>
            
            <section className="job-requirements">
              <h2>Requirements</h2>
              <ul>
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </section>
            
            {isApplying && (
              <section className="application-form-section">
                <h2>Apply for this position</h2>
                {applicationSuccess ? (
                  <div className="application-success">
                    <h3>Application Submitted!</h3>
                    <p>Your application has been successfully submitted. The employer will review your application and get back to you soon.</p>
                  </div>
                ) : (
                  <form className="application-form" onSubmit={submitApplication}>
                    <div className="form-group">
                      <label htmlFor="coverLetter">Cover Letter</label>
                      <textarea
                        id="coverLetter"
                        name="coverLetter"
                        value={application.coverLetter}
                        onChange={handleApplicationChange}
                        placeholder="Introduce yourself and explain why you're a good fit for this position..."
                        required
                      ></textarea>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="resume">Resume / CV</label>
                      <textarea
                        id="resume"
                        name="resume"
                        value={application.resume}
                        onChange={handleApplicationChange}
                        placeholder="Paste your resume here..."
                        required
                      ></textarea>
                      <p className="form-help">
                        Normally you would upload a file, but for this demo please paste your resume text.
                      </p>
                    </div>
                    
                    <div className="form-actions">
                      <button type="submit" className="btn">Submit Application</button>
                      <button 
                        type="button" 
                        className="btn-secondary"
                        onClick={() => setIsApplying(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </section>
            )}
          </main>
          
          <aside className="job-detail-sidebar">
            <div className="job-actions-card">
              <h3>Interested in this job?</h3>
              
              {currentUser?.role === 'jobseeker' && (
                <>
                  <button 
                    className={`btn btn-full ${userHasApplied ? 'btn-disabled' : ''}`} 
                    onClick={handleApply} 
                    disabled={userHasApplied}
                  >
                    {userHasApplied ? 'You have applied' : 'Apply Now'}
                  </button>
                  
                  <button 
                    className={`btn-secondary btn-full ${isJobBookmarked ? 'active' : ''}`}
                    onClick={toggleBookmark}
                  >
                    {isJobBookmarked ? (
                      <>
                        <BookmarkCheck size={18} />
                        <span>Saved</span>
                      </>
                    ) : (
                      <>
                        <Bookmark size={18} />
                        <span>Save Job</span>
                      </>
                    )}
                  </button>
                </>
              )}
              
              <button 
                className="btn-secondary btn-full"
                onClick={() => navigator.clipboard.writeText(window.location.href)}
              >
                <Share2 size={18} />
                <span>Share Job</span>
              </button>
            </div>
            
            <div className="company-card">
              <h3>About the company</h3>
              <div className="company-info">
                <h4>{job.company}</h4>
                <p className="company-location">
                  <MapPin size={16} />
                  <span>{job.location}</span>
                </p>
                <p className="company-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, 
                  nisi vel consectetur interdum, nisl nisi consectetur purus, eget
                  egestas nisl nisi sed ex.
                </p>
                <a href="#" className="company-link">View Company Profile</a>
              </div>
            </div>
            
            <div className="similar-jobs-card">
              <h3>Similar Jobs</h3>
              <div className="similar-jobs-list">
                <p className="text-neutral-500 text-sm">
                  Similar job recommendations would appear here.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;