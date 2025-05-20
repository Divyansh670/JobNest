import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, RefreshCw } from 'lucide-react';
import { useJobs } from '../context/JobsContext';
import '../styles/components/SearchFilters.css';

const jobTypes = [
  { value: 'full-time', label: 'Full Time' },
  { value: 'part-time', label: 'Part Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'remote', label: 'Remote' },
];

const SearchFilters: React.FC = () => {
  const { setFilters, clearFilters } = useJobs();
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  
  useEffect(() => {
    // Apply filters with debounce
    const timer = setTimeout(() => {
      setFilters({
        title: title.trim(),
        location: location.trim(),
        type: type || undefined,
      });
    }, 400);
    
    return () => clearTimeout(timer);
  }, [title, location, type, setFilters]);
  
  const handleReset = () => {
    setTitle('');
    setLocation('');
    setType('');
    clearFilters();
  };
  
  return (
    <div className="search-filters">
      <div className="search-filters-main">
        <div className="search-input-wrapper">
          <div className="search-input">
            <Search size={18} />
            <input
              type="text"
              placeholder="Job title, company, or keywords"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="search-input">
            <MapPin size={18} />
            <input
              type="text"
              placeholder="City or remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          <button
            className="btn"
            onClick={() => setFilters({ title, location, type })}
          >
            Find Jobs
          </button>
        </div>
        
        <button
          className="advanced-toggle"
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          aria-expanded={isAdvancedOpen}
        >
          {isAdvancedOpen ? "Hide" : "Show"} Advanced Filters
        </button>
      </div>
      
      <div className={`advanced-filters ${isAdvancedOpen ? 'open' : ''}`}>
        <div className="filter-section">
          <h4 className="filter-heading">
            <Briefcase size={16} />
            <span>Job Type</span>
          </h4>
          <div className="filter-options">
            {jobTypes.map((jobType) => (
              <label key={jobType.value} className="filter-option">
                <input
                  type="radio"
                  name="job-type"
                  value={jobType.value}
                  checked={type === jobType.value}
                  onChange={() => setType(jobType.value)}
                />
                <span>{jobType.label}</span>
              </label>
            ))}
          </div>
        </div>
        
        <button className="btn-secondary" onClick={handleReset}>
          <RefreshCw size={16} />
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;