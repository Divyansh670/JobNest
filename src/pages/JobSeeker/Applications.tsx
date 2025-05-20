import React from 'react';

const Applications: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Applications</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          {/* Applications list will be implemented later */}
          <p className="text-gray-600">No applications found.</p>
        </div>
      </div>
    </div>
  );
};

export default Applications;