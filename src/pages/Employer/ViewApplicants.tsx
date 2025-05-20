import React from 'react';
import { useParams } from 'react-router-dom';

const ViewApplicants: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Job Applicants</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Viewing applicants for job ID: {id}</p>
        {/* Applicant list will be implemented later */}
        <div className="mt-4">
          <p className="text-gray-500 italic">No applicants yet</p>
        </div>
      </div>
    </div>
  );
};

export default ViewApplicants;