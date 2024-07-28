import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [resetToken, setResetToken] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/api/v1/forgot-password', { email });
      setResetToken(response.data.resetToken);
      setMessage('Password reset token has been sent. Check your email or use the token below.');
    } catch (error) {
      setMessage(error.response.data || 'Error sending reset token');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Request Reset Token</button>
      </form>
      {message && <p>{message}</p>}
      {resetToken && <p>Your reset token: {resetToken}</p>}
    </div>
  );
};

export default ForgotPassword;
