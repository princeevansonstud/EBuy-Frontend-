import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
    const navigate = useNavigate();
    const { cartItems, totalPrice, clearCart } = useCart();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: 'Nairobi',
        paymentMethod: 'mpesa',
        mpesaPhone: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);

    // If cart is empty, redirect or show empty state
    if (cartItems.length === 0 && !orderComplete) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-white text-center">
                <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
                <p className="text-slate-400 mb-6">Add items to your cart before proceeding to checkout.</p>
                <Link
                    to="/"
                    className="bg-blue-900 hover:bg-blue-800 text-white font-medium px-6 py-2.5 rounded-lg border border-blue-700 shadow-lg"
                >
                    Browse Products
                </Link>
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API order processing delay
        setTimeout(() => {
            setIsSubmitting(false);
            setOrderComplete(true);
            clearCart();
        }, 1500);
    };

    if (orderComplete) {
        return (
            <div className="max-w-xl mx-auto my-16 p-8 bg-slate-800 border border-slate-700/60 rounded-xl text-center text-white space-y-4">
                <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 text-green-400 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                    ✓
                </div>
                <h2 className="text-2xl font-bold">Order Placed Successfully!</h2>
                <p className="text-slate-300 text-sm">
                    Thank you for shopping with EBuy, <span className="font-semibold text-white">{formData.fullName}</span>.
                </p>
                <p className="text-xs text-slate-400">
                    We have sent a confirmation email to <span className="text-blue-400">{formData.email}</span>.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-4 w-full bg-blue-900 hover:bg-blue-800 text-white font-medium py-2.5 rounded-lg border border-blue-700 shadow-lg transition"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-white">
            <h1 className="text-3xl font-bold mb-8 border-b border-slate-800 pb-4">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Shipping & Payment Form */}
                <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">

                    {/* Section 1: Shipping Details */}
                    <div className="bg-slate-800 border border-slate-700/60 rounded-xl p-6 space-y-4">
                        <h2 className="text-lg font-bold border-b border-slate-700 pb-2">1. Shipping Details</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    required
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@gmail.com"
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="0712345678"
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1">City / Town</label>
                                <input
                                    type="text"
                                    name="city"
                                    required
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Nairobi"
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1">Delivery Address</label>
                            <textarea
                                name="address"
                                rows="2"
                                required
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="LOcation of Delivery"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
                            ></textarea>
                        </div>
                    </div>

                    {/* Section 2: Payment Options */}
                    <div className="bg-slate-800 border border-slate-700/60 rounded-xl p-6 space-y-4">
                        <h2 className="text-lg font-bold border-b border-slate-700 pb-2">2. Payment Method</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <label
                                className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition ${formData.paymentMethod === 'mpesa'
                                    ? 'border-blue-500 bg-blue-950/30'
                                    : 'border-slate-700 bg-slate-900'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="mpesa"
                                    checked={formData.paymentMethod === 'mpesa'}
                                    onChange={handleChange}
                                    className="text-blue-600 focus:ring-0"
                                />
                                <div>
                                    <span className="font-semibold block text-sm">M-Pesa</span>
                                    <span className="text-xs text-slate-400">Pay via Prompt push</span>
                                </div>
                            </label>

                            <label
                                className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition ${formData.paymentMethod === 'card'
                                    ? 'border-blue-500 bg-blue-950/30'
                                    : 'border-slate-700 bg-slate-900'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="card"
                                    checked={formData.paymentMethod === 'card'}
                                    onChange={handleChange}
                                    className="text-blue-600 focus:ring-0"
                                />
                                <div>
                                    <span className="font-semibold block text-sm">Credit / Debit Card</span>
                                    <span className="text-xs text-slate-400">Visa / Mastercard</span>
                                </div>
                            </label>
                        </div>

                        {formData.paymentMethod === 'mpesa' && (
                            <div className="pt-2">
                                <label className="block text-xs font-medium text-slate-300 mb-1">M-Pesa Phone Number</label>
                                <input
                                    type="tel"
                                    name="mpesaPhone"
                                    required
                                    value={formData.mpesaPhone}
                                    onChange={handleChange}
                                    placeholder="254712345678"
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-900 hover:bg-blue-800 disabled:opacity-50 text-white font-semibold py-3.5 rounded-lg border border-blue-700 shadow-lg transition"
                    >
                        {isSubmitting ? 'Processing Order...' : `Pay KES ${totalPrice.toLocaleString()}`}
                    </button>
                </form>


                <div className="bg-slate-800 border border-slate-700/60 rounded-xl p-6 h-fit space-y-4">
                    <h2 className="text-xl font-bold border-b border-slate-700 pb-3">Order Summary</h2>

                    <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-3">
                                    <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded bg-slate-900" />
                                    <div>
                                        <p className="font-medium text-slate-200 line-clamp-1">{item.name}</p>
                                        <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <span className="font-semibold text-slate-100">KES {(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-slate-700 pt-4 space-y-2 text-sm text-slate-300">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>KES {totalPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Delivery Fee</span>
                            <span className="text-green-400 font-medium">FREE</span>
                        </div>
                    </div>

                    <div className="border-t border-slate-700 pt-4 flex justify-between text-lg font-bold text-white">
                        <span>Total Amount</span>
                        <span className="text-blue-400">KES {totalPrice.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}