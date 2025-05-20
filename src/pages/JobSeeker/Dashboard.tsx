import React from 'react';
import { Link } from 'react-router-dom';
import { Search, FileCheck, Bookmark, User, ChevronRight, TrendingUp, Clock } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useApplications } from '../../context/ApplicationsContext';
import { useBookmarks } from '../../context/BookmarksContext';
import { useJobs } from '../../context/JobsContext';
import JobCard from '../../components/JobCard';
import '../../styles/pages/Dashboard.css';

const Dashboard: React.FC = () => {
  const { currentUser } = useUser();
  const { userApplications } = useApplications();
  const { getUserBookmarks } = useBookmarks();
  const { jobs } = useJobs();
  
  if (!currentUser) return null;
  
  const applications = userApplications(currentUser.id);
  const bookmarkIds = getUserBookmarks(currentUser.id);
  const bookmarkedJobs = jobs.filter(job => bookmarkIds.includes(job.id)).slice(0, 3);
  const recentApplications = applications.slice(0, 3);
  const recommendedJobs = jobs
    .filter(job => !applications.some(app => app.jobId === job.id))
    .slice(0, 3);
    
  return (
    <div className="dashboard-page">
      <div className="container">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Welcome back, {currentUser.name}!</p>
        </header>
        
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <Search size={24} />
            </div>
            <div className="stat-info">
              <h3>Job Matches</h3>
              <p className="stat-number">{recommendedJobs.length}</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <FileCheck size={24} />
            </div>
            <div className="stat-info">
              <h3>Applications</h3>
              <p className="stat-number">{applications.length}</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <Bookmark size={24} />
            </div>
            <div className="stat-info">
              <h3>Saved Jobs</h3>
              <p className="stat-number">{bookmarkIds.length}</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <User size={24} />
            </div>
            <div className="stat-info">
              <h3>Profile</h3>
              <p className="stat-text">
                {currentUser.skills?.length ? 'Complete' : 'Incomplete'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="dashboard-grid">
          <section className="dashboard-section">
            <div className="section-header">
              <h2>Recommended Jobs</h2>
              <Link to="/jobs" className="section-link">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            
            {recommendedJobs.length > 0 ? (
              <div className="job-cards">
                {recommendedJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No recommended jobs at the moment. Check back later!</p>
              </div>
            )}
          </section>
          
          <section className="dashboard-section">
            <div className="section-header">
              <h2>Recent Applications</h2>
              <Link to="/applications" className="section-link">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            
            {recentApplications.length > 0 ? (
              <div className="applications-list">
                {recentApplications.map(application => {
                  const job = jobs.find(j => j.id === application.jobId);
                  if (!job) return null;
                  
                  return (
                    <Link to={`/jobs/${job.id}`} key={application.id} className="application-card">
                      <div className="application-job">
                        <h3>{job.title}</h3>
                        <p>{job.company}</p>
                      </div>
                      <div className="application-meta">
                        <div className="application-date">
                          <Clock size={14} />
                          <span>
                            {new Date(application.appliedDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className={`application-status status-${application.status}`}>
                          {application.status}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state">
                <p>You haven't applied to any jobs yet.</p>
                <Link to="/jobs" className="btn mt-4">Browse Jobs</Link>
              </div>
            )}
          </section>
          
          <section className="dashboard-section">
            <div className="section-header">
              <h2>Saved Jobs</h2>
              <Link to="/bookmarks" className="section-link">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            
            {bookmarkedJobs.length > 0 ? (
              <div className="job-cards">
                {bookmarkedJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>You haven't saved any jobs yet.</p>
                <Link to="/jobs" className="btn mt-4">Browse Jobs</Link>
              </div>
            )}
          </section>
          
          <section className="dashboard-section">
            <div className="section-header">
              <h2>Job Market Trends</h2>
            </div>
            
            <div className="trends-card">
              <div className="trend-item">
                <div className="trend-icon">
                  <TrendingUp size={20} />
                </div>
                <div className="trend-info">
                  <h3>Remote Work</h3>
                  <p>Remote job postings have increased by 24% in the last month.</p>
                </div>
              </div>
              
              <div className="trend-item">
                <div className="trend-icon">
                  <TrendingUp size={20} />
                </div>
                <div className="trend-info">
                  <h3>Tech Skills</h3>
                  <p>Demand for React.js developers has grown by 18% this quarter.</p>
                </div>
              </div>
              
              <div className="trend-item">
                <div className="trend-icon">
                  <TrendingUp size={20} />
                </div>
                <div className="trend-info">
                  <h3>Salary Trends</h3>
                  <p>Average salaries in your field have increased by 5% year over year.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;