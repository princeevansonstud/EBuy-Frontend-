import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'buyer', // Default role
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Registering user with data:', formData);
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 text-white">
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 w-full max-w-md shadow-2xl">
                <h2 className="text-2xl font-bold text-blue-500 mb-6 text-center">Create EBuy Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-slate-300">Account Type</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'buyer' })}
                                className={`py-2 text-sm font-semibold rounded-lg border transition-all ${formData.role === 'buyer'
                                    ? 'bg-blue-900 border-blue-600 text-white shadow-md'
                                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                                    }`}
                            >
                                Buyer
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'seller' })}
                                className={`py-2 text-sm font-semibold rounded-lg border transition-all ${formData.role === 'seller'
                                    ? 'bg-blue-900 border-blue-600 text-white shadow-md'
                                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                                    }`}
                            >
                                Seller
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-slate-300">Username</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-600"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-slate-300">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-600"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-slate-300">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-600"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2.5 rounded-lg transition-colors border border-blue-700 shadow-lg">
                        Register as {formData.role === 'seller' ? 'Seller' : 'Buyer'}
                    </button>
                </form>
                <p className="text-sm text-slate-400 mt-4 text-center">
                    Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
}