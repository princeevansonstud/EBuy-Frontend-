import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
    const { cartItems, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-white text-center">

                <h2 className="text-2xl font-bold mb-2">Your Shopping Cart is Empty</h2>
                <p className="text-slate-400 mb-6">Looks like you haven't added anything to your cart yet.</p>
                <Link
                    to="/"
                    className="bg-blue-900 hover:bg-blue-800 text-white font-medium px-6 py-2.5 rounded-lg border border-blue-700 shadow-lg"
                >
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-white">
            <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
                <h1 className="text-3xl font-bold">Shopping Cart</h1>
                <button
                    onClick={clearCart}
                    className="text-sm text-red-400 hover:text-red-300 font-medium cursor-pointer"
                >
                    Clear Cart
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-slate-800 border border-slate-700/60 rounded-xl p-4 flex gap-4 items-center"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-lg bg-slate-900"
                            />

                            <div className="flex-1">
                                <h3 className="font-semibold text-slate-100">{item.name}</h3>
                                <span className="text-xs text-blue-400">{item.category}</span>
                                <div className="text-sm font-bold text-white mt-1">
                                    KES {item.price.toLocaleString()}
                                </div>
                            </div>


                            <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg p-1">
                                <button
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="px-2.5 py-1 text-slate-300 hover:text-white font-bold cursor-pointer"
                                >
                                    -
                                </button>
                                <span className="px-2 text-sm font-semibold">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="px-2.5 py-1 text-slate-300 hover:text-white font-bold cursor-pointer"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-slate-500 hover:text-red-400 p-2 cursor-pointer"
                                title="Remove item"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>


                <div className="bg-slate-800 border border-slate-700/60 rounded-xl p-6 h-fit space-y-4">
                    <h2 className="text-xl font-bold border-b border-slate-700 pb-3">Order Summary</h2>

                    <div className="space-y-2 text-sm text-slate-300">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>KES {totalPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Estimated Shipping</span>
                            <span className="text-green-400 font-medium">FREE</span>
                        </div>
                    </div>

                    <div className="border-t border-slate-700 pt-4 flex justify-between text-lg font-bold text-white">
                        <span>Total</span>
                        <span className="text-blue-400">KES {totalPrice.toLocaleString()}</span>
                    </div>

                    <Link
                        to="/checkout"
                        className="block text-center w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg border border-blue-700 shadow-lg transition-all"
                    >
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
}