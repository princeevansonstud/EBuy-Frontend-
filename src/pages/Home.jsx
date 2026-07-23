import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import { CATEGORIES } from '../data/products';

const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-family='sans-serif' font-size='16px'%3ENo Image Available%3C/text%3E%3C/svg%3E";

export default function Home({ onAddToCart }) {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setLoading(true);
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                console.error('Failed to load products:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const productName = product.title || product.name || '';
        const matchesSearch = productName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight">Manage & Discover Products</h1>
                    <p className="text-slate-400 mt-2">Shop the latest premium gadgets, apparel, footwear, and accessories with fast checkout and guaranteed satisfaction.</p>
                </header>

                <div className="flex flex-wrap gap-3 mb-6">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${selectedCategory === category
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                    />
                </div>

                {loading ? (
                    <div className="text-center py-20 text-slate-500">Loading products...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id || product.title}
                                product={{
                                    ...product,
                                    image: product.image || product.image_url || FALLBACK_IMAGE
                                }}
                                onAddToCart={onAddToCart}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}