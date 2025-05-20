import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Calendar, MapPin, Clock, DollarSign, Building, BookmarkCheck } from 'lucide-react';
import { Job } from '../context/JobsContext';
import { useUser } from '../context/UserContext';
import { useBookmarks } from '../context/BookmarksContext';
import { useApplications } from '../context/ApplicationsContext';
import '../styles/components/JobCard.css';

interface JobCardProps {
  job: Job;
  showActions?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, showActions = true }) => {
  const { currentUser } = useUser();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const { hasApplied } = useApplications();
  
  const formattedDate = new Date(job.postedDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const isJobBookmarked = currentUser ? isBookmarked(currentUser.id, job.id) : false;
  const isApplied = currentUser?.role === 'jobseeker' ? hasApplied(currentUser.id, job.id) : false;

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!currentUser) return;
    
    if (isJobBookmarked) {
      removeBookmark(currentUser.id, job.id);
    } else {
      addBookmark(currentUser.id, job.id);
    }
  };
  
  return (
    <Link to={`/jobs/${job.id}`} className="job-card card">
      <div className="job-card-header">
        <div className="job-logo">
          {job.logoUrl ? (
            <img src={job.logoUrl} alt={`${job.company} logo`} />
          ) : (
            <Building size={32} />
          )}
        </div>
        <div className="job-info">
          <h3 className="job-title">{job.title}</h3>
          <p className="job-company">{job.company}</p>
        </div>
        {showActions && currentUser?.role === 'jobseeker' && (
          <button 
            onClick={toggleBookmark}
            className={`bookmark-button ${isJobBookmarked ? 'active' : ''}`}
            aria-label={isJobBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
          >
            {isJobBookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
          </button>
        )}
      </div>
      
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
      
      <p className="job-description">{job.description.substring(0, 150)}...</p>
      
      <div className="job-footer">
        <div className="job-tags">
          {job.requirements.slice(0, 3).map((req, index) => (
            <span key={index} className="job-tag">{req.split(' ')[0]}</span>
          ))}
          {job.requirements.length > 3 && (
            <span className="job-tag-more">+{job.requirements.length - 3}</span>
          )}
        </div>
        
        {showActions && currentUser?.role === 'jobseeker' && (
          <div className="job-status">
            {isApplied && (
              <span className="application-status">Applied</span>
            )}
            <span className="view-job">View Details</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default JobCard;