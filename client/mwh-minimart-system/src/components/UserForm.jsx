import React, { useState } from 'react';

const UserForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [voucherBalance, setVoucherBalance] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, voucherBalance });
    setName('');
    setVoucherBalance(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Initial Voucher Balance:</label>
        <input type="number" value={voucherBalance} onChange={(e) => setVoucherBalance(e.target.value)} required />
      </div>
      <button type="submit">Add Resident</button>
    </form>
  );
};

export default UserForm;