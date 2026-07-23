import { useState, useEffect } from 'react';
import AddProductModal from '../components/AddProductModal';

const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-family='sans-serif' font-size='16px'%3ENo Image Available%3C/text%3E%3C/svg%3E";

export default function SellerDashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSellerProducts = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('access') || localStorage.getItem('accessToken');
            const response = await fetch('http://localhost:8000/api/products/?seller=true', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setProducts(data.results || data);
        } catch (err) {
            console.error('Failed to load seller products', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSellerProducts();
    }, []);

    const getImageUrl = (product) => {
        const img = product.image || product.image_url;
        if (!img) return FALLBACK_IMAGE;
        if (img.startsWith('http') || img.startsWith('data:')) return img;
        return `http://localhost:8000${img}`;
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">Seller Dashboard</h1>
                        <p className="text-sm text-slate-400 mt-1">Manage your active listings and add new inventory.</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 py-2.5 rounded-lg text-sm shadow-lg transition flex items-center space-x-2"
                    >
                        <span>+ Add New Product</span>
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-12 text-slate-400">Loading inventory...</div>
                ) : products.length === 0 ? (
                    <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-xl">
                        <p className="text-slate-400 text-sm">You haven't listed any products yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {products.map((product, index) => (
                            <div key={product.id || index} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md flex flex-col justify-between">
                                <img
                                    src={getImageUrl(product)}
                                    alt={product.title || product.name}
                                    className="w-full h-48 object-cover bg-slate-950"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = FALLBACK_IMAGE;
                                    }}
                                />
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="text-lg font-semibold text-white">{product.title || product.name}</h3>
                                    <p className="text-slate-400 text-sm mt-1 mb-4 flex-grow line-clamp-2">{product.description}</p>
                                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-800">
                                        <span className="text-xl font-bold text-emerald-400">KES {product.price}</span>
                                        <span className="text-xs uppercase bg-slate-800 text-slate-300 px-2 py-1 rounded">
                                            {product.category || 'General'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <AddProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onProductAdded={() => {
                    fetchSellerProducts();
                }}
            />
        </div>
    );
}