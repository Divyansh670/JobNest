import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { UserRole } from '../context/UserContext';
import AuthForm from '../components/AuthForm';
import '../styles/pages/Auth.css';

const Register: React.FC = () => {
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get('role') as UserRole | null;
  
  return (
    <div className="auth-page">
      <div className="container">
        <AuthForm type="register" defaultRole={roleParam} />
      </div>
    </div>
  );
};

export default Register;