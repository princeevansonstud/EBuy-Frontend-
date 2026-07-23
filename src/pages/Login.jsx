import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.access) {
        localStorage.setItem('access', data.access);
        localStorage.setItem('accessToken', data.access);
        if (data.refresh) {
          localStorage.setItem('refresh', data.refresh);
        }

        // Save username immediately from form input
        localStorage.setItem('username', formData.username);

        // Fetch user profile to get precise role and update storage if available
        try {
          const profileRes = await fetch('http://localhost:8000/api/auth/profile/', {
            headers: { Authorization: `Bearer ${data.access}` },
          });
          if (profileRes.ok) {
            const profileData = await profileRes.json();
            if (profileData.role) {
              localStorage.setItem('user_role', profileData.role);
            }
            if (profileData.username) {
              localStorage.setItem('username', profileData.username);
            }
          }
        } catch (profileErr) {
          console.error('Could not fetch profile details:', profileErr);
        }

        if (login) {
          await login({ username: formData.username }, data.access, data.refresh);
        }

        if (onLoginSuccess) {
          await onLoginSuccess();
        }

        navigate('/');
      } else {
        setError(data.detail || 'Invalid username or password.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Server unreachable. Please check backend status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 text-white">
      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-center">Welcome Back</h2>
        <p className="text-slate-400 text-sm text-center mb-6">
          Sign in to your account
        </p>

        {error && <div className="text-rose-400 text-sm mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
              required
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-blue-500"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-blue-500"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded font-semibold transition disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="text-sm text-slate-400 mt-4 text-center">
          Don't have an account? <Link to="/register" className="text-blue-400 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}