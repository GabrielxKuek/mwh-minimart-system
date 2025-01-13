import React, { useState } from 'react';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';
import UserProfile from '../components/UserProfile';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const addUser = (user) => {
    setUsers([...users, { ...user, id: Date.now(), suspended: false, transactions: [] }]);
  };

  const suspendUser = (id) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, suspended: true } : user)));
  };

  const reactivateUser = (id) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, suspended: false } : user)));
  };

  const selectUser = (id) => {
    setSelectedUser(users.find((user) => user.id === id));
  };

  return (
    <div>
      <UserForm onSubmit={addUser} />
      <UserList users={users} onSuspend={suspendUser} onReactivate={reactivateUser} onSelect={selectUser} />
      {selectedUser && <UserProfile user={selectedUser} />}
    </div>
  );
};

export default UserManagement;