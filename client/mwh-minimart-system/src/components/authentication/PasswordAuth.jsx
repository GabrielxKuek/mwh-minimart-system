import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

const PasswordAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email.toLowerCase()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('User not found.');
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      if (userData.password === password) {
        // Log in the user with the auth context
        login({
          id: userDoc.id,
          email: userData.email,
          // Add any other user data you want to store
        });
        
        // Store userId and roleId in session storage
        sessionStorage.setItem('userId', userDoc.id);
        sessionStorage.setItem('roleId', userData.role_id); // Ensure roleId exists in your user data

        // Navigate to dashboard
        navigate('/user-management');
      } else {
        setError('Incorrect password.');
      }
    } catch (error) {
      setError('Authentication failed. Please try again.');
      console.error('Auth error:', error);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full">Login</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default PasswordAuth;