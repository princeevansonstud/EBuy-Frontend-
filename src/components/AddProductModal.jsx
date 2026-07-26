import { useState } from 'react';

export default function AddProductModal({ isOpen, onClose, onProductAdded }) {
    const [formData, setFormData] = useState({
        title: '',
        category: 'Apparel',
        price: '',
        description: '',
        image_url: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    const categories = [
        'Electronics',
        'Footwear',
        'Accessories',
        'Apparel',
    ];

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.price || !formData.category) {
            setError('Title, price, and category are required.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('access') || localStorage.getItem('accessToken');
            const response = await fetch('[https://ebuy-backend.onrender.com](https://ebuy-backend.onrender.com)/api/products/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: formData.title,
                    name: formData.title,
                    category: formData.category,
                    price: parseFloat(formData.price),
                    description: formData.description,
                    image: formData.image_url,
                    image_url: formData.image_url,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setFormData({ title: '', category: 'Apparel', price: '', description: '', image_url: '' });
                if (onProductAdded) onProductAdded();
                onClose();
            } else {
                const errorMessage = typeof data === 'object' ? JSON.stringify(data, null, 2) : (data.detail || 'Failed to list product.');
                setError(errorMessage);
            }
        } catch (err) {
            console.error('Create product error:', err);
            setError(err.message || 'Server error while saving product.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-lg text-white shadow-2xl relative">
                <div className="flex justify-between items-center mb-5 border-b border-slate-700 pb-3">
                    <h3 className="text-xl font-bold text-emerald-400">List New Product</h3>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white text-lg font-bold px-2"
                    >
                        ✕
                    </button>
                </div>

                {error && (
                    <div className="text-rose-400 text-xs mb-4 bg-rose-950/40 border border-rose-800 p-3 rounded overflow-x-auto whitespace-pre-wrap font-mono">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                            Item Name
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Birkin Bag"
                            className="w-full bg-slate-900 border border-slate-700 rounded p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                                Category
                            </label>
                            <select
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                                Price (KES)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                required
                                placeholder="0.00"
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                            Image URL
                        </label>
                        <input
                            type="url"
                            placeholder="https://images.unsplash.com/photo-..."
                            className="w-full bg-slate-900 border border-slate-700 rounded p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                            value={formData.image_url}
                            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                            Description
                        </label>
                        <textarea
                            rows="3"
                            placeholder="Provide key details about condition, specifications, etc."
                            className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>

                    <div className="flex justify-end space-x-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded text-sm text-slate-400 hover:text-white transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-2 rounded text-sm transition disabled:opacity-50"
                        >
                            {loading ? 'Publishing...' : 'Publish Item'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}