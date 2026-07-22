import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();
    const { totalItemsCount } = useCart();

    return (
        <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                {/* Brand Logo */}
                <Link to="/" className="text-2xl font-bold text-blue-500 hover:text-blue-400">
                    EBuy
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center space-x-6">
                    <Link to="/" className="text-slate-300 hover:text-white text-sm font-medium">
                        Products
                    </Link>

                    {/* Cart Link matching standard nav style */}
                    <Link
                        to="/cart"
                        className="text-slate-300 hover:text-white text-sm font-medium flex items-center gap-1.5"
                    >
                        <span>Your Cart</span>
                        {totalItemsCount > 0 && (
                            <span className="bg-blue-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                                {totalItemsCount}
                            </span>
                        )}
                    </Link>

                    {/* Auth Links */}
                    {isAuthenticated ? (
                        <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-blue-400">Hi, {user?.username}</span>
                            <button
                                onClick={logout}
                                className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm px-3 py-1.5 rounded transition"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <Link to="/login" className="text-sm text-slate-300 hover:text-white px-3 py-1.5">
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-blue-900 border border-blue-700 hover:bg-blue-800 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}