import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ isAuthenticated, userRole, cartCount, onLogout, currentUser, onOpenAddProduct }) {
    const navigate = useNavigate();


    const storedUsername = localStorage.getItem('username') || localStorage.getItem('user_id');
    const displayUser = currentUser?.username || currentUser?.id || currentUser?.email || storedUsername || 'Account';

    const currentRole = (userRole || localStorage.getItem('user_role') || '').toLowerCase();

    const isSeller = isAuthenticated && (
        currentRole === 'seller' ||
        localStorage.getItem('is_seller') === 'true' ||
        storedUsername === 'seller'
    );

    return (
        <nav className="bg-slate-800 border-b border-slate-700 text-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    <Link to="/" className="text-xl font-bold tracking-tight text-blue-400 hover:text-blue-300">
                        eBuy
                    </Link>

                    <div className="flex items-center space-x-6">
                        <Link to="/" className="text-sm font-medium hover:text-blue-400 transition">
                            Home
                        </Link>

                        {isSeller && (
                            <>
                                <button
                                    onClick={onOpenAddProduct}
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-md text-sm font-semibold transition flex items-center gap-1 shadow-sm"
                                >
                                    <span className="text-lg leading-none">+</span> Sell Product
                                </button>
                                <Link to="/seller" className="text-sm font-medium text-amber-400 hover:text-amber-300 transition">
                                    Dashboard
                                </Link>
                            </>
                        )}


                        <Link to="/cart" className="text-sm font-medium hover:text-blue-400 transition relative">
                            Cart
                            {cartCount > 0 && (
                                <span className="ml-1.5 bg-blue-600 text-xs px-2 py-0.5 rounded-full font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </Link>


                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4 border-l border-slate-700 pl-4">
                                <span className="text-sm text-slate-300 font-medium">
                                    {displayUser}
                                </span>
                                <button
                                    onClick={onLogout}
                                    className="text-xs bg-slate-700 hover:bg-rose-600 text-slate-200 hover:text-white px-3 py-1.5 rounded transition font-medium"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3 border-l border-slate-700 pl-4">
                                <Link
                                    to="/login"
                                    className="text-sm font-medium text-slate-300 hover:text-white transition"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded transition font-medium"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}