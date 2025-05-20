import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export type UserRole = 'jobseeker' | 'employer' | null;

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  website?: string;
  companyName?: string;
  industry?: string;
  foundedYear?: number;
}

interface UserContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => void;
  register: (userData: Partial<UserProfile>, password: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const defaultUser: UserProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'jobseeker',
  phone: '555-123-4567',
  location: 'New York, NY',
  bio: 'Experienced software developer with a passion for creating intuitive user interfaces.',
  skills: ['JavaScript', 'React', 'TypeScript', 'CSS', 'HTML'],
};

const defaultEmployer: UserProfile = {
  id: '2',
  name: 'Jane Smith',
  email: 'jane@techcorp.com',
  role: 'employer',
  companyName: 'TechCorp Solutions',
  industry: 'Technology',
  foundedYear: 2010,
  website: 'https://techcorp.example.com',
  location: 'San Francisco, CA',
  bio: 'TechCorp Solutions is a leading provider of innovative software solutions.',
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem('jobnest_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('jobnest_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('jobnest_user');
    }
  }, [currentUser]);

  const login = (email: string, password: string, role: UserRole) => {
    // Simulate login - in a real app this would make an API call
    if (role === 'jobseeker') {
      setCurrentUser(defaultUser);
    } else if (role === 'employer') {
      setCurrentUser(defaultEmployer);
    }
    setIsAuthenticated(true);
  };

  const register = (userData: Partial<UserProfile>, password: string) => {
    // Simulate registration - in a real app this would make an API call
    const newUser: UserProfile = {
      id: Math.random().toString(36).substr(2, 9),
      name: userData.name || '',
      email: userData.email || '',
      role: userData.role || null,
      ...(userData as Omit<UserProfile, 'id' | 'name' | 'email' | 'role'>),
    };
    
    setCurrentUser(newUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('jobnest_user');
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...data };
      setCurrentUser(updatedUser);
    }
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};