import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: 'pending' | 'reviewed' | 'rejected' | 'interview' | 'hired';
  appliedDate: string;
  coverLetter?: string;
  resume?: string;
}

interface ApplicationsContextType {
  applications: Application[];
  userApplications: (userId: string) => Application[];
  jobApplications: (jobId: string) => Application[];
  applyToJob: (jobId: string, userId: string, data: { coverLetter?: string, resume?: string }) => void;
  updateApplication: (applicationId: string, data: Partial<Application>) => void;
  withdrawApplication: (applicationId: string) => void;
  hasApplied: (userId: string, jobId: string) => boolean;
  getApplicationById: (applicationId: string) => Application | undefined;
}

const ApplicationsContext = createContext<ApplicationsContextType>({} as ApplicationsContextType);

export const useApplications = () => useContext(ApplicationsContext);

export const ApplicationsProvider = ({ children }: { children: ReactNode }) => {
  const [applications, setApplications] = useState<Application[]>([]);

  // Load applications from localStorage
  useEffect(() => {
    const savedApplications = localStorage.getItem('jobnest_applications');
    if (savedApplications) {
      setApplications(JSON.parse(savedApplications));
    }
  }, []);

  // Save applications to localStorage when they change
  useEffect(() => {
    localStorage.setItem('jobnest_applications', JSON.stringify(applications));
  }, [applications]);

  const userApplications = (userId: string) => {
    return applications.filter(app => app.userId === userId);
  };

  const jobApplications = (jobId: string) => {
    return applications.filter(app => app.jobId === jobId);
  };

  const applyToJob = (jobId: string, userId: string, data: { coverLetter?: string, resume?: string }) => {
    // Check if user has already applied
    if (hasApplied(userId, jobId)) return;
    
    const newApplication: Application = {
      id: Math.random().toString(36).substr(2, 9),
      jobId,
      userId,
      status: 'pending',
      appliedDate: new Date().toISOString(),
      coverLetter: data.coverLetter,
      resume: data.resume,
    };
    
    setApplications(prev => [...prev, newApplication]);
  };

  const updateApplication = (applicationId: string, data: Partial<Application>) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === applicationId ? { ...app, ...data } : app
      )
    );
  };

  const withdrawApplication = (applicationId: string) => {
    setApplications(prev => prev.filter(app => app.id !== applicationId));
  };

  const hasApplied = (userId: string, jobId: string) => {
    return applications.some(app => app.userId === userId && app.jobId === jobId);
  };

  const getApplicationById = (applicationId: string) => {
    return applications.find(app => app.id === applicationId);
  };

  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        userApplications,
        jobApplications,
        applyToJob,
        updateApplication,
        withdrawApplication,
        hasApplied,
        getApplicationById,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};