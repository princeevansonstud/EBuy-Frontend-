import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username && formData.password) {
      login({ username: formData.username }, 'mock_access_token', 'mock_refresh_token');
      navigate('/');
    } else {
      setError('Please fill in all fields.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 text-white">
      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back!</h2>
        <h2 className="text-2xl font-bold text-blue-500 mb-6 text-center">Login</h2>

        {error && <div className="text-red-400 text-sm mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded font-semibold">
            Sign In
          </button>
        </form>
        <p className="text-sm text-slate-400 mt-4 text-center">
          Don't have an account? <Link to="/register" className="text-blue-400">Register</Link>
        </p>
      </div>
    </div>
  );
}