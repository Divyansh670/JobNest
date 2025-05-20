import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface BookmarksContextType {
  bookmarks: Record<string, string[]>; // userId -> jobIds
  addBookmark: (userId: string, jobId: string) => void;
  removeBookmark: (userId: string, jobId: string) => void;
  isBookmarked: (userId: string, jobId: string) => boolean;
  getUserBookmarks: (userId: string) => string[];
}

const BookmarksContext = createContext<BookmarksContextType>({} as BookmarksContextType);

export const useBookmarks = () => useContext(BookmarksContext);

export const BookmarksProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarks, setBookmarks] = useState<Record<string, string[]>>({});

  // Load bookmarks from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('jobnest_bookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  // Save bookmarks to localStorage when they change
  useEffect(() => {
    localStorage.setItem('jobnest_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (userId: string, jobId: string) => {
    setBookmarks(prev => {
      const userBookmarks = prev[userId] || [];
      if (userBookmarks.includes(jobId)) {
        return prev;
      }
      return {
        ...prev,
        [userId]: [...userBookmarks, jobId]
      };
    });
  };

  const removeBookmark = (userId: string, jobId: string) => {
    setBookmarks(prev => {
      const userBookmarks = prev[userId] || [];
      return {
        ...prev,
        [userId]: userBookmarks.filter(id => id !== jobId)
      };
    });
  };

  const isBookmarked = (userId: string, jobId: string) => {
    const userBookmarks = bookmarks[userId] || [];
    return userBookmarks.includes(jobId);
  };

  const getUserBookmarks = (userId: string) => {
    return bookmarks[userId] || [];
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
        isBookmarked,
        getUserBookmarks,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};