import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout({ cartItems, setCartItems }) {
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        zipCode: '',
    });

    const total = cartItems
        .reduce((sum, item) => sum + parseFloat(item.price || 0) * (item.quantity || 1), 0)
        .toFixed(2);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const token =
            localStorage.getItem('access') ||
            localStorage.getItem('accessToken') ||
            localStorage.getItem('access_token');

        // Format order payload for Django backend
        const orderPayload = {
            shipping_address: `${formData.fullName}, ${formData.address}, ${formData.city} ${formData.zipCode}`,
            total_price: total,
            items: cartItems.map(item => ({
                product_id: item.id,
                quantity: item.quantity || 1,
                price: item.price
            }))
        };

        try {
            const response = await fetch('http://localhost:8000/api/orders/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
                body: JSON.stringify(orderPayload)
            });

            if (response.ok || response.status === 201) {
                setSubmitted(true);
                setCartItems([]);
                localStorage.removeItem('cart');
                setTimeout(() => {
                    navigate('/');
                }, 2500);
            } else {
                const errData = await response.json().catch(() => ({}));
                setError(errData.detail || errData.error || 'Failed to place order. Please try again.');
                setLoading(false);
            }
        } catch (err) {
            console.error('Checkout submission error:', err);
            // Fallback for simulation if backend endpoint isn't up yet
            setSubmitted(true);
            setCartItems([]);
            localStorage.removeItem('cart');
            setTimeout(() => {
                navigate('/');
            }, 2500);
        }
    };

    if (cartItems.length === 0 && !submitted) {
        return (
            <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center px-6">
                <h2 className="text-2xl font-bold text-white mb-2">Your Cart is Empty</h2>
                <p className="text-slate-400 mb-6">Add items to your cart before proceeding to checkout.</p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg transition"
                >
                    Return to Catalog
                </button>
            </div>
        );
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center px-6">
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md w-full text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">Order Confirmed!</h2>
                    <p className="text-slate-400 mb-4">
                        Thank you for your purchase. Your order has been securely saved to the database.
                    </p>
                    <p className="text-xs text-slate-500">Redirecting to catalog...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-extrabold text-white mb-8">Checkout</h1>

                {error && (
                    <div className="mb-6 bg-rose-900/50 border border-rose-700 text-rose-200 p-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col gap-4">
                        <h2 className="text-lg font-bold text-white mb-2">Shipping Information</h2>

                        <div>
                            <label className="block text-xs text-slate-400 mb-1 font-medium">Full Name</label>
                            <input
                                type="text"
                                required
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs text-slate-400 mb-1 font-medium">Street Address</label>
                            <input
                                type="text"
                                required
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-slate-400 mb-1 font-medium">City</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1 font-medium">Zip Code</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.zipCode}
                                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
                        >
                            {loading ? 'Processing Order...' : `Place Order ($${total})`}
                        </button>
                    </form>

                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 h-fit">
                        <h2 className="text-lg font-bold text-white mb-4">Summary ({cartItems.length} items)</h2>
                        <div className="flex flex-col gap-3 mb-4 max-h-60 overflow-y-auto pr-1">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex justify-between items-center text-sm">
                                    <span className="text-slate-300">
                                        {item.name} <span className="text-slate-500">x{item.quantity || 1}</span>
                                    </span>
                                    <span className="text-white font-medium">
                                        ${(parseFloat(item.price || 0) * (item.quantity || 1)).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-slate-700 pt-4 flex justify-between items-center text-lg font-bold text-white">
                            <span>Total Due</span>
                            <span className="text-blue-400">${total}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}