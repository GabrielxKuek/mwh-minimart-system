import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import PasswordAuth from '../components/authentication/PasswordAuth.jsx';

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <img 
        src={"/static/images/mwh-vertical.png"}
        alt="Muhammadiyah Welfare Home Logo" 
        className="w-32 h-auto mb-2"
      />
      <div className="space-y-8">
        <PasswordAuth />
        <Link 
          to="/forget-password" 
          className="text-blue-500 hover:underline"
        >
          Forgot password?
        </Link>
      </div>
    </div>
  );
}

export default Login;
