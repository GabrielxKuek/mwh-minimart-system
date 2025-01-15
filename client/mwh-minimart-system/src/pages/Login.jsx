import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../configs/firebase"; // Adjust the path based on your project structure // Adjust the path based on your project structure
import './styles.css';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameOrEmail = e.target.nameOrEmail.value;
    const password = e.target.password.value;

    try {
      // Use Firebase Authentication to sign in
      const userCredential = await signInWithEmailAndPassword(auth, nameOrEmail, password);
      console.log('Login successful:', userCredential.user);

      // Redirect or update the UI after successful login
    } catch (error) {
      // Handle errors
      console.error(error);
      setErrorMessage(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-header">
          <h2 id="formTitle">Sign In</h2>
          <p id="formSubtitle">Welcome back to Muhammadiyah!</p>
        </div>

        {errorMessage && <div className="error-message" id="errorMessage">{errorMessage}</div>}

        <form id="authForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="nameOrEmail"
              name="nameOrEmail"
              required
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Password"
            />
          </div>

          <button type="submit" className="btn primary-btn" id="submitButton">
            Sign In
          </button>
        </form>

        <div className="form-footer">
          <p>
            <span id="switchText">Don't have an account?</span>
            <a href="/register" id="switchForm">
              Register
            </a>
          </p>
          <p>
            <a href="/forgot-password" id="resendVerification">
              Forgot your password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;