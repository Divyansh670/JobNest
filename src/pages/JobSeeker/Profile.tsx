import React from 'react';
import { useUser } from '../../context/UserContext';

const Profile = () => {
  const { currentUser } = useUser();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Profile</h1>
        
        <div className="space-y-6">
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1 text-gray-900">{currentUser?.name || 'Not set'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-gray-900">{currentUser?.email || 'Not set'}</p>
              </div>
            </div>
          </div>

          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Professional Summary</h2>
            <p className="text-gray-700">
              {currentUser?.summary || 'Add a professional summary to help employers learn more about you.'}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {currentUser?.skills?.map((skill, index) => (
                <span 
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              )) || <p className="text-gray-500">No skills added yet</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;