import React, { useState } from 'react';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      localStorage.setItem('token', res.data.token);
      navigate('/chat');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log In to Zyvora</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input placeholder="Email" type="email" value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      <input placeholder="Password" type="password" value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })} required />
      <button type="submit">Log In</button>
    </form>
  );
}

export default Login;