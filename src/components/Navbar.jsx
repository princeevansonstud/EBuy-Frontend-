import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();

    return (
        <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 text-white flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-blue-500">EBuy</Link>
            <div className="space-x-4 flex items-center">
                {isAuthenticated ? (
                    <>
                        <span className="text-slate-300">Hi, {user?.username}</span>
                        <button onClick={logout} className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-sm">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-slate-300 hover:text-white text-sm">Login</Link>
                        <Link to="/register" className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded text-sm">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}