import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Voucher Balance: {user.voucherBalance}</p>
      <h3>Transaction History</h3>
      <ul>
        {user.transactions.map((transaction, index) => (
          <li key={index}>{transaction}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;