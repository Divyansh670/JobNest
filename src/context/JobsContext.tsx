import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { mockJobs } from '../data/mockData';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  salary: string;
  description: string;
  requirements: string[];
  postedDate: string;
  employerId: string;
  logoUrl?: string;
}

interface JobFilters {
  title?: string;
  location?: string;
  type?: string;
}

interface JobsContextType {
  jobs: Job[];
  employerJobs: (employerId: string) => Job[];
  addJob: (job: Omit<Job, 'id' | 'postedDate'>) => void;
  updateJob: (jobId: string, updatedJob: Partial<Job>) => void;
  removeJob: (jobId: string) => void;
  getJobById: (jobId: string) => Job | undefined;
  filteredJobs: Job[];
  setFilters: (filters: JobFilters) => void;
  clearFilters: () => void;
}

const JobsContext = createContext<JobsContextType>({} as JobsContextType);

export const useJobs = () => useContext(JobsContext);

export const JobsProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filters, setFiltersState] = useState<JobFilters>({});
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  // Initialize with mock data on first load
  useEffect(() => {
    const savedJobs = localStorage.getItem('jobnest_jobs');
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    } else {
      setJobs(mockJobs);
    }
  }, []);

  // Save jobs to localStorage when they change
  useEffect(() => {
    localStorage.setItem('jobnest_jobs', JSON.stringify(jobs));
  }, [jobs]);

  // Apply filters whenever jobs or filters change
  useEffect(() => {
    let result = [...jobs];
    
    if (filters.title) {
      result = result.filter(job => 
        job.title.toLowerCase().includes(filters.title!.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.title!.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.title!.toLowerCase())
      );
    }
    
    if (filters.location) {
      result = result.filter(job => 
        job.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    
    if (filters.type) {
      result = result.filter(job => job.type === filters.type);
    }
    
    setFilteredJobs(result);
  }, [jobs, filters]);

  const addJob = (job: Omit<Job, 'id' | 'postedDate'>) => {
    const newJob: Job = {
      ...job,
      id: Math.random().toString(36).substr(2, 9),
      postedDate: new Date().toISOString(),
    };
    
    setJobs(prevJobs => [newJob, ...prevJobs]);
  };

  const updateJob = (jobId: string, updatedJob: Partial<Job>) => {
    setJobs(prevJobs => 
      prevJobs.map(job => 
        job.id === jobId ? { ...job, ...updatedJob } : job
      )
    );
  };

  const removeJob = (jobId: string) => {
    setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
  };

  const getJobById = (jobId: string) => {
    return jobs.find(job => job.id === jobId);
  };

  const employerJobs = (employerId: string) => {
    return jobs.filter(job => job.employerId === employerId);
  };

  const setFilters = (newFilters: JobFilters) => {
    setFiltersState(newFilters);
  };

  const clearFilters = () => {
    setFiltersState({});
  };

  return (
    <JobsContext.Provider
      value={{
        jobs,
        employerJobs,
        addJob,
        updateJob,
        removeJob,
        getJobById,
        filteredJobs,
        setFilters,
        clearFilters
      }}
    >
      {children}
    </JobsContext.Provider>
  );
};