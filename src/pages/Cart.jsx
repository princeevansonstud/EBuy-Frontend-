import { Link, useNavigate } from 'react-router-dom';

export default function Cart({ cartItems, setCartItems }) {
    const navigate = useNavigate();

    const handleUpdateQuantity = (productId, delta) => {
        setCartItems((prevItems) =>
            prevItems
                .map((item) => {
                    if (item.id === productId) {
                        const newQty = (item.quantity || 1) + delta;
                        return newQty > 0 ? { ...item, quantity: newQty } : null;
                    }
                    return item;
                })
                .filter(Boolean)
        );
    };

    const handleRemoveItem = (productId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    };

    const calculateSubtotal = () => {
        return cartItems
            .reduce((sum, item) => sum + parseFloat(item.price || 0) * (item.quantity || 1), 0)
            .toFixed(2);
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center px-6">
                <h2 className="text-2xl font-bold text-white mb-2">Your Cart is Empty</h2>
                <p className="text-slate-400 mb-6">Looks like you haven't added any items to your cart yet.</p>
                <Link
                    to="/"
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2.5 rounded-lg transition"
                >
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-extrabold text-white mb-8">Your Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-slate-800 border border-slate-700/60 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.image_url || item.image || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80'}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-lg bg-slate-900"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-white">{item.name}</h3>
                                        <p className="text-slate-400 text-sm">${parseFloat(item.price || 0).toFixed(2)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                                    <div className="flex items-center gap-2 border border-slate-700 bg-slate-900/50 rounded-lg p-1">
                                        <button
                                            onClick={() => handleUpdateQuantity(item.id, -1)}
                                            className="px-2 py-0.5 text-slate-400 hover:text-white font-bold text-sm rounded transition"
                                        >
                                            -
                                        </button>
                                        <span className="text-sm font-semibold px-2 text-white">{item.quantity || 1}</span>
                                        <button
                                            onClick={() => handleUpdateQuantity(item.id, 1)}
                                            className="px-2 py-0.5 text-slate-400 hover:text-white font-bold text-sm rounded transition"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <span className="font-bold text-white text-base">
                                        ${(parseFloat(item.price || 0) * (item.quantity || 1)).toFixed(2)}
                                    </span>

                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="text-xs font-medium text-rose-400 hover:text-rose-300 transition"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 h-fit">
                        <h2 className="text-lg font-bold text-white mb-4">Order Summary</h2>
                        <div className="flex justify-between items-center text-slate-400 mb-2">
                            <span>Subtotal</span>
                            <span className="text-white font-semibold">${calculateSubtotal()}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-400 mb-4">
                            <span>Shipping</span>
                            <span className="text-emerald-400 font-semibold">Free</span>
                        </div>
                        <div className="border-t border-slate-700 pt-4 flex justify-between items-center text-lg font-extrabold text-white mb-6">
                            <span>Total</span>
                            <span className="text-blue-400">${calculateSubtotal()}</span>
                        </div>
                        <button
                            onClick={() => navigate('/checkout')}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}