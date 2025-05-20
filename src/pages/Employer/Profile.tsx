import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { Building, Mail, Phone, MapPin, Globe, Calendar } from 'lucide-react';
import '../../styles/pages/EmployerProfile.css';

const EmployerProfile: React.FC = () => {
  const { currentUser, updateProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    companyName: currentUser?.companyName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    location: currentUser?.location || '',
    website: currentUser?.website || '',
    industry: currentUser?.industry || '',
    foundedYear: currentUser?.foundedYear || '',
    bio: currentUser?.bio || ''
  });

  if (!currentUser) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      ...currentUser,
      ...formData,
      foundedYear: parseInt(formData.foundedYear.toString())
    });
    setIsEditing(false);
  };

  return (
    <div className="employer-profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-header-content">
            <h1>Company Profile</h1>
            <p>Manage your company information and preferences</p>
          </div>
          {!isEditing && (
            <button className="btn" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>

        {isEditing ? (
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h2>Basic Information</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Contact Person Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="companyName">Company Name</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="website">Website</label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="industry">Industry</label>
                  <input
                    type="text"
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="foundedYear">Founded Year</label>
                  <input
                    type="number"
                    id="foundedYear"
                    name="foundedYear"
                    value={formData.foundedYear}
                    onChange={handleChange}
                    min="1800"
                    max={new Date().getFullYear()}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Company Description</h2>
              <div className="form-group">
                <label htmlFor="bio">About the Company</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell potential candidates about your company..."
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn">
                Save Changes
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-content">
            <div className="profile-section">
              <h2>Basic Information</h2>
              
              <div className="info-grid">
                <div className="info-item">
                  <Building size={20} />
                  <div>
                    <h3>Company Name</h3>
                    <p>{currentUser.companyName || 'Not specified'}</p>
                  </div>
                </div>

                <div className="info-item">
                  <Mail size={20} />
                  <div>
                    <h3>Email Address</h3>
                    <p>{currentUser.email}</p>
                  </div>
                </div>

                <div className="info-item">
                  <Phone size={20} />
                  <div>
                    <h3>Phone Number</h3>
                    <p>{currentUser.phone || 'Not specified'}</p>
                  </div>
                </div>

                <div className="info-item">
                  <MapPin size={20} />
                  <div>
                    <h3>Location</h3>
                    <p>{currentUser.location || 'Not specified'}</p>
                  </div>
                </div>

                <div className="info-item">
                  <Globe size={20} />
                  <div>
                    <h3>Website</h3>
                    <p>
                      {currentUser.website ? (
                        <a href={currentUser.website} target="_blank" rel="noopener noreferrer">
                          {currentUser.website}
                        </a>
                      ) : (
                        'Not specified'
                      )}
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <Calendar size={20} />
                  <div>
                    <h3>Founded Year</h3>
                    <p>{currentUser.foundedYear || 'Not specified'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h2>Company Description</h2>
              <div className="company-description">
                {currentUser.bio ? (
                  <p>{currentUser.bio}</p>
                ) : (
                  <p className="text-neutral-500">No company description provided.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerProfile;