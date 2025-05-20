import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users, ChevronRight, AlertCircle, Activity, TrendingUp } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useJobs } from '../../context/JobsContext';
import { useApplications } from '../../context/ApplicationsContext';
import '../../styles/pages/EmployerDashboard.css';

const EmployerDashboard: React.FC = () => {
  const { currentUser } = useUser();
  const { employerJobs } = useJobs();
  const { applications } = useApplications();
  
  if (!currentUser) return null;
  
  const postedJobs = employerJobs(currentUser.id);
  
  // Count applications for employer's jobs
  const jobApplications = applications.filter(app => 
    postedJobs.some(job => job.id === app.jobId)
  );
  
  // Get top job with most applications
  const jobApplicationCounts = postedJobs.map(job => ({
    job,
    count: jobApplications.filter(app => app.jobId === job.id).length
  })).sort((a, b) => b.count - a.count);
  
  const topJob = jobApplicationCounts[0]?.job;
  const topJobApplicationCount = jobApplicationCounts[0]?.count || 0;
  
  return (
    <div className="employer-dashboard-page">
      <div className="container">
        <header className="dashboard-header">
          <div className="dashboard-header-content">
            <h1>Employer Dashboard</h1>
            <p>Welcome back, {currentUser.name}!</p>
          </div>
          <div className="dashboard-actions">
            <Link to="/employer/post-job" className="btn">
              Post a New Job
            </Link>
          </div>
        </header>
        
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <Briefcase size={24} />
            </div>
            <div className="stat-info">
              <h3>Active Job Listings</h3>
              <p className="stat-number">{postedJobs.length}</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <Users size={24} />
            </div>
            <div className="stat-info">
              <h3>Total Applications</h3>
              <p className="stat-number">{jobApplications.length}</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <Activity size={24} />
            </div>
            <div className="stat-info">
              <h3>Application Rate</h3>
              <p className="stat-number">
                {postedJobs.length ? (jobApplications.length / postedJobs.length).toFixed(1) : 0}
                <span className="stat-label">per job</span>
              </p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <TrendingUp size={24} />
            </div>
            <div className="stat-info">
              <h3>Profile Views</h3>
              <p className="stat-number">324</p>
            </div>
          </div>
        </div>
        
        <div className="dashboard-grid">
          <section className="dashboard-section">
            <div className="section-header">
              <h2>Recent Job Postings</h2>
              <Link to="/employer/jobs" className="section-link">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            
            {postedJobs.length > 0 ? (
              <div className="recent-jobs">
                {postedJobs.slice(0, 5).map(job => (
                  <div key={job.id} className="recent-job-card">
                    <div className="job-info">
                      <h3>{job.title}</h3>
                      <div className="job-meta">
                        <span className="job-location">{job.location}</span>
                        <span className="job-type">{job.type}</span>
                        <span className="job-date">
                          Posted {new Date(job.postedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="job-stats">
                      <div className="application-count">
                        <span className="count">
                          {jobApplications.filter(app => app.jobId === job.id).length}
                        </span>
                        <span className="label">Applications</span>
                      </div>
                      <Link to={`/employer/jobs/${job.id}/applicants`} className="view-applicants-btn">
                        View Applicants
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <AlertCircle size={24} />
                <p>You haven't posted any jobs yet.</p>
                <Link to="/employer/post-job" className="btn mt-4">Post Your First Job</Link>
              </div>
            )}
          </section>
          
          <section className="dashboard-section">
            <div className="section-header">
              <h2>Application Summary</h2>
            </div>
            
            {jobApplications.length > 0 ? (
              <div className="application-summary">
                <div className="summary-card">
                  <h3>Top Performing Job</h3>
                  {topJob ? (
                    <div className="top-job">
                      <h4>{topJob.title}</h4>
                      <p>{topJob.location} • {topJob.type}</p>
                      <div className="application-stat">
                        <span className="stat-value">{topJobApplicationCount}</span>
                        <span className="stat-label">Applications</span>
                      </div>
                    </div>
                  ) : (
                    <p className="no-data">No application data available</p>
                  )}
                </div>
                
                <div className="summary-card">
                  <h3>Application Status</h3>
                  <div className="status-breakdown">
                    <div className="status-item">
                      <div className="status-bar">
                        <div 
                          className="status-progress pending"
                          style={{ 
                            width: `${(jobApplications.filter(app => app.status === 'pending').length / jobApplications.length) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <div className="status-label">
                        <span>Pending</span>
                        <span className="status-count">
                          {jobApplications.filter(app => app.status === 'pending').length}
                        </span>
                      </div>
                    </div>
                    
                    <div className="status-item">
                      <div className="status-bar">
                        <div 
                          className="status-progress reviewed"
                          style={{ 
                            width: `${(jobApplications.filter(app => app.status === 'reviewed').length / jobApplications.length) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <div className="status-label">
                        <span>Reviewed</span>
                        <span className="status-count">
                          {jobApplications.filter(app => app.status === 'reviewed').length}
                        </span>
                      </div>
                    </div>
                    
                    <div className="status-item">
                      <div className="status-bar">
                        <div 
                          className="status-progress interview"
                          style={{ 
                            width: `${(jobApplications.filter(app => app.status === 'interview').length / jobApplications.length) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <div className="status-label">
                        <span>Interview</span>
                        <span className="status-count">
                          {jobApplications.filter(app => app.status === 'interview').length}
                        </span>
                      </div>
                    </div>
                    
                    <div className="status-item">
                      <div className="status-bar">
                        <div 
                          className="status-progress hired"
                          style={{ 
                            width: `${(jobApplications.filter(app => app.status === 'hired').length / jobApplications.length) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <div className="status-label">
                        <span>Hired</span>
                        <span className="status-count">
                          {jobApplications.filter(app => app.status === 'hired').length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <AlertCircle size={24} />
                <p>No applications received yet.</p>
              </div>
            )}
          </section>
          
          <section className="dashboard-section full-width">
            <div className="section-header">
              <h2>Hiring Insights</h2>
            </div>
            
            <div className="insights-grid">
              <div className="insight-card">
                <h3>Talent Market Trends</h3>
                <p>The job market for your industry has shown a 12% increase in qualified candidates over the last quarter. Consider promoting your listings to attract top talent.</p>
              </div>
              
              <div className="insight-card">
                <h3>Compensation Analysis</h3>
                <p>Average salaries for similar positions have increased by 5% in your region. Ensure your salary ranges remain competitive to attract qualified candidates.</p>
              </div>
              
              <div className="insight-card">
                <h3>Candidate Preferences</h3>
                <p>Remote work options are increasingly important to candidates, with 68% prioritizing flexibility in their job search. Consider highlighting remote or hybrid options.</p>
              </div>
              
              <div className="insight-card">
                <h3>Optimization Tips</h3>
                <p>Job posts with detailed requirements and clear responsibilities receive 27% more qualified applicants. Review your job descriptions for clarity and completeness.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;