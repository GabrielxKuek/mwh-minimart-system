import React from 'react';

const UserList = ({ users, onSuspend, onReactivate, onSelect }) => {
  return (
    <div>
      <h2>Residents</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.voucherBalance} vouchers
            {user.suspended ? (
              <button onClick={() => onReactivate(user.id)}>Reactivate</button>
            ) : (
              <button onClick={() => onSuspend(user.id)}>Suspend</button>
            )}
            <button onClick={() => onSelect(user.id)}>View Profile</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;