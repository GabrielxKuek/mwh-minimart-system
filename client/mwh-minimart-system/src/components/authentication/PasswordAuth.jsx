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
  
      // Check if password matches
      if (userData.password !== password) {
        setError('Invalid password');
        return;
      }
  
      // Store user data in session
      sessionStorage.setItem('userId', userDoc.id);
      sessionStorage.setItem('roleId', userData.role_id);
  
      // Update auth context
      await login();
  
      // Navigate based on role
      if (userData.role_id === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/minimart');
      }
  
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login.');
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