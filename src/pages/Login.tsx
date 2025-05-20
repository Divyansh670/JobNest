import React from 'react';
import AuthForm from '../components/AuthForm';
import '../styles/pages/Auth.css';

const Login: React.FC = () => {
  return (
    <div className="auth-page">
      <div className="container">
        <AuthForm type="login" />
      </div>
    </div>
  );
};

export default Login;