import React from 'react';
import PasswordAuth from '../components/authentication/PasswordAuth.jsx';
// import { SignupForm } from '../components/authentication/SignupForm.jsx';

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-8">Authentication Page</h1>
      <div className="space-y-8">
        <PasswordAuth />
      </div>
    </div>
  );
}

export default Login;