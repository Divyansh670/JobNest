import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import SearchFilters from '../components/SearchFilters';
import JobCard from '../components/JobCard';
import { useJobs } from '../context/JobsContext';
import '../styles/pages/Jobs.css';

const Jobs: React.FC = () => {
  const { filteredJobs, setFilters } = useJobs();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  
  // Apply filters from URL params
  useEffect(() => {
    const title = searchParams.get('title') || '';
    const location = searchParams.get('location') || '';
    const type = searchParams.get('type') || '';
    
    if (title || location || type) {
      setFilters({
        title,
        location,
        type,
      });
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [searchParams, setFilters]);
  
  return (
    <div className="jobs-page">
      <div className="container">
        <header className="jobs-header">
          <h1 className="jobs-title">
            <Briefcase className="title-icon" />
            Browse Jobs
          </h1>
          <p className="jobs-description">
            Discover opportunities that match your skills and career goals
          </p>
        </header>
        
        <SearchFilters />
        
        <div className="jobs-content">
          <div className="jobs-results">
            {isLoading ? (
              <div className="jobs-loading">
                <div className="loading-spinner"></div>
                <p>Loading jobs...</p>
              </div>
            ) : filteredJobs.length > 0 ? (
              <>
                <div className="jobs-count">
                  <span>{filteredJobs.length} jobs found</span>
                </div>
                
                <div className="jobs-list">
                  {filteredJobs.map(job => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </>
            ) : (
              <div className="no-jobs-found">
                <h3>No jobs found</h3>
                <p>
                  Try adjusting your search filters or browse all available positions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;