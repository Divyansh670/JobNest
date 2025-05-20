import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Search, Building, UserCheck, ChevronRight, TrendingUp, Award, Globe } from 'lucide-react';
import SearchFilters from '../components/SearchFilters';
import JobCard from '../components/JobCard';
import { useJobs } from '../context/JobsContext';
import '../styles/pages/Home.css';

const Home: React.FC = () => {
  const { jobs } = useJobs();
  const featuredJobs = jobs.slice(0, 3);
  
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Find Your <span className="text-highlight">Dream Job</span> Today
            </h1>
            <p className="hero-subtitle">
              Connect with top employers and discover opportunities that match your skills and career goals
            </p>
            
            <div className="hero-search">
              <SearchFilters />
            </div>
            
            <div className="hero-stats">
              <div className="stat-item">
                <Search size={20} />
                <span>
                  <strong>1,000+</strong> Job Listings
                </span>
              </div>
              <div className="stat-item">
                <Building size={20} />
                <span>
                  <strong>500+</strong> Companies
                </span>
              </div>
              <div className="stat-item">
                <UserCheck size={20} />
                <span>
                  <strong>10,000+</strong> Candidates
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-wave">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,117.3C672,107,768,117,864,138.7C960,160,1056,192,1152,186.7C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>
      
      <section className="featured-jobs">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Job Opportunities</h2>
            <Link to="/jobs" className="section-link">
              View All Jobs <ChevronRight size={18} />
            </Link>
          </div>
          
          <div className="featured-jobs-grid">
            {featuredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title text-center">How JobNest Works</h2>
          <p className="section-subtitle text-center">
            Your journey to finding the perfect job or hiring the ideal candidate is just three steps away
          </p>
          
          <div className="steps-container">
            <div className="step">
              <div className="step-icon">
                <UserCheck size={32} />
              </div>
              <h3 className="step-title">Create an Account</h3>
              <p className="step-description">
                Sign up as a job seeker or employer and complete your profile with all relevant information
              </p>
            </div>
            
            <div className="step">
              <div className="step-icon">
                <Search size={32} />
              </div>
              <h3 className="step-title">Explore Opportunities</h3>
              <p className="step-description">
                Browse through listings, use filters to find the perfect match for your skills and preferences
              </p>
            </div>
            
            <div className="step">
              <div className="step-icon">
                <Briefcase size={32} />
              </div>
              <h3 className="step-title">Apply or Hire</h3>
              <p className="step-description">
                Submit applications to desired positions or review and connect with potential candidates
              </p>
            </div>
          </div>
          
          <div className="cta-container">
            <Link to="/register" className="btn btn-cta">
              Get Started Now
            </Link>
            <Link to="/jobs" className="btn-secondary">
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>
      
      <section className="why-choose-us">
        <div className="container">
          <div className="choose-us-content">
            <div className="choose-us-text">
              <h2 className="section-title">Why Choose JobNest</h2>
              <p className="section-subtitle">
                We're committed to connecting talent with opportunity in a seamless and effective way
              </p>
              
              <ul className="benefits-list">
                <li className="benefit-item">
                  <TrendingUp size={20} />
                  <div>
                    <h3>Latest Opportunities</h3>
                    <p>Access the most recent job listings from top employers across industries</p>
                  </div>
                </li>
                <li className="benefit-item">
                  <Award size={20} />
                  <div>
                    <h3>Quality Matches</h3>
                    <p>Our platform helps match the right candidates with the right positions</p>
                  </div>
                </li>
                <li className="benefit-item">
                  <Globe size={20} />
                  <div>
                    <h3>Remote Opportunities</h3>
                    <p>Find remote positions that allow you to work from anywhere in the world</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="choose-us-image">
              <img src="https://images.pexels.com/photos/1181712/pexels-photo-1181712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Team working together" />
            </div>
          </div>
        </div>
      </section>
      
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title text-center">What Our Users Say</h2>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"JobNest helped me find my dream job in just two weeks! The platform is intuitive and the job recommendations were spot on."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Sarah Johnson" />
                </div>
                <div className="author-info">
                  <h4>Sarah Johnson</h4>
                  <p>Frontend Developer</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"As an employer, I've found exceptional talent through JobNest. The quality of applicants has been consistently high."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Michael Chen" />
                </div>
                <div className="author-info">
                  <h4>Michael Chen</h4>
                  <p>HR Director, TechCorp</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The job filtering options are amazing! I was able to find remote positions that perfectly matched my experience and skill set."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Alex Rivera" />
                </div>
                <div className="author-info">
                  <h4>Alex Rivera</h4>
                  <p>UX Designer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Take the Next Step in Your Career?</h2>
            <p>Join thousands of professionals who have found their perfect job match on JobNest</p>
            <div className="cta-buttons">
              <Link to="/register?role=jobseeker" className="btn">
                Find a Job
              </Link>
              <Link to="/register?role=employer" className="btn-secondary">
                Post a Job
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;