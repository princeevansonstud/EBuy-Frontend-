import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 text-white">
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 w-full max-w-md">
                <h2 className="text-2xl font-bold text-blue-500 mb-6 text-center">Register</h2>
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
                        <label className="block text-sm mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                        Register
                    </button>
                </form>
                <p className="text-sm text-slate-400 mt-4 text-center">
                    Already have an account? <Link to="/login" className="text-blue-400">Login</Link>
                </p>
            </div>
        </div>
    );
}