import { useState, useEffect } from 'react';
import { getProducts, createProduct } from '../services/api';

const CATEGORIES = ['Electronics', 'Apparel', 'Accessories'];

export default function SellerDashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'Electronics',
        image_url: '',
        description: '',
    });

    const fetchSellerProducts = async () => {
        try {
            setLoading(true);
            const data = await getProducts();
            const list = Array.isArray(data) ? data : data?.results || [];
            setProducts(list);
        } catch (err) {
            console.error('Failed to fetch seller products:', err);
            setError('Could not load inventory items.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSellerProducts();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            await createProduct({
                ...formData,
                price: parseFloat(formData.price),
            });

            setFormData({
                name: '',
                price: '',
                category: 'Electronics',
                image_url: '',
                description: '',
            });
            setIsModalOpen(false);
            fetchSellerProducts();
        } catch (err) {
            console.error('Failed to create product:', err);
            setError('Failed to add new product. Please check your inputs and permissions.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 py-10 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-white">Seller Dashboard</h1>
                        <p className="text-slate-400 text-sm mt-1">
                            Manage your existing product listings or publish new inventory.
                        </p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-lg transition active:scale-95"
                    >
                        Add New Product
                    </button>
                </div>

                {error && (
                    <div className="mb-6 bg-rose-950/30 border border-rose-900/50 text-rose-400 p-4 rounded-xl text-sm">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-20 bg-slate-800/40 border border-slate-800 rounded-2xl">
                        <p className="text-slate-400 text-lg">Loading inventory...</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20 bg-slate-800/40 border border-slate-800 rounded-2xl">
                        <p className="text-slate-400 text-lg mb-4">No active products listed yet.</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-4 py-2 rounded-lg text-sm font-medium transition"
                        >
                            Create First Listing
                        </button>
                    </div>
                ) : (
                    <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-300">
                                <thead className="bg-slate-900/80 border-b border-slate-700 text-xs text-slate-400 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Product</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4">Price</th>
                                        <th className="px-6 py-4 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/50">
                                    {products.map((item) => {
                                        const categoryName =
                                            typeof item.category === 'object' ? item.category?.name : item.category;

                                        return (
                                            <tr key={item.id} className="hover:bg-slate-700/30 transition">
                                                <td className="px-6 py-4 flex items-center gap-3">
                                                    <img
                                                        src={item.image_url || item.image || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80'}
                                                        alt={item.name}
                                                        className="w-12 h-12 object-cover rounded-lg bg-slate-900"
                                                    />
                                                    <div>
                                                        <span className="font-semibold text-white block">{item.name}</span>
                                                        <span className="text-xs text-slate-400 line-clamp-1">
                                                            {item.description || 'No description'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-slate-300">{categoryName || 'General'}</td>
                                                <td className="px-6 py-4 font-bold text-blue-400">
                                                    ${parseFloat(item.price || 0).toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <span className="inline-block bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-2.5 py-1 rounded-full font-medium">
                                                        Active
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {isModalOpen && (
                    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
                            <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
                                <h2 className="text-xl font-bold text-white">Add New Product Listing</h2>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-slate-400 hover:text-white transition font-bold"
                                >
                                    X
                                </button>
                            </div>

                            <form onSubmit={handleCreateProduct} className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1">
                                        Product Title
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 mb-1">
                                            Price ($)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="price"
                                            required
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 mb-1">
                                            Category
                                        </label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                                        >
                                            {CATEGORIES.map((cat) => (
                                                <option key={cat} value={cat}>
                                                    {cat}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1">
                                        Image URL
                                    </label>
                                    <input
                                        type="url"
                                        name="image_url"
                                        placeholder="https://images.unsplash.com/..."
                                        value={formData.image_url}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        rows="3"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                                    ></textarea>
                                </div>

                                <div className="flex gap-3 mt-4 pt-4 border-t border-slate-700">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="w-1/2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold py-2.5 rounded-lg text-sm transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-1/2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg text-sm transition disabled:opacity-50"
                                    >
                                        {submitting ? 'Saving...' : 'Publish Product'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}