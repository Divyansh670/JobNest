import React from 'react';
import { useBookmarks } from '../../context/BookmarksContext';
import JobCard from '../../components/JobCard';

const Bookmarks: React.FC = () => {
  const { bookmarks } = useBookmarks();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Saved Jobs</h1>
      
      {bookmarks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            You haven't saved any jobs yet. Browse jobs and click the bookmark icon to save them for later.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((job) => (
            <JobCard key={job.id} job={job} showBookmarkButton />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;