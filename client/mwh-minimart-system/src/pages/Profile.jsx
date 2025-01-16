import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getUserById, updateUser } from '../services/api';
import { User, Mail, CalendarDays, Coins, History, Crown, Cake } from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const userId = sessionStorage.getItem('userId');
      const userData = await getUserById(userId);
      setUser(userData);
      setEditedUser(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateUser(user.id, editedUser);
      setUser(editedUser);
      setSuccess(true);
      setEditMode(false);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <Card className="max-w-2xl mx-auto shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-8">
            <div className="relative">
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-100"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="h-8 w-8 text-gray-500" />
                </div>
              )}
              {/* Future image upload button would go here */}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
              <div className="flex flex-col mt-1">
                <div className="flex items-center text-gray-500">
                  <Coins className="h-4 w-4 mr-2" />
                  <span>{user.current_points} points available</span>
                </div>
                <div className="flex items-center text-gray-400 text-sm mt-1">
                  <History className="h-3 w-3 mr-2" />
                  <span>{user.total_points} lifetime points earned</span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Crown className="h-5 w-5 text-indigo-500 mr-2" />
                  <span className="text-sm font-medium text-gray-600">Role</span>
                </div>
                <p className="text-gray-800 capitalize">{user.role_id}</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Cake className="h-5 w-5 text-indigo-500 mr-2" />
                  <span className="text-sm font-medium text-gray-600">Birthday</span>
                </div>
                <p className="text-gray-800">
                  {new Date(user.birthdate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="flex items-center text-sm font-medium text-gray-600 mb-2">
                  <User className="h-4 w-4 mr-2 text-indigo-400" />
                  Name
                </Label>
                {editMode ? (
                  <Input
                    id="name"
                    name="name"
                    value={editedUser.name}
                    onChange={handleInputChange}
                    className="border-gray-200"
                  />
                ) : (
                  <p className="text-gray-800 py-2">{user.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center text-sm font-medium text-gray-600 mb-2">
                  <Mail className="h-4 w-4 mr-2 text-indigo-400" />
                  Email
                </Label>
                {editMode ? (
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                    className="border-gray-200"
                  />
                ) : (
                  <p className="text-gray-800 py-2">{user.email}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              {editMode ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditMode(false);
                      setEditedUser(user);
                    }}
                    className="px-6"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-6"
                  >
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-6"
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </form>

          {success && (
            <Alert className="mt-6 bg-green-50 text-green-700 border border-green-200">
              <AlertDescription>Profile updated successfully!</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;