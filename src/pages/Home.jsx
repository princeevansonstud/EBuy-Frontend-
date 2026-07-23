import { useEffect, useState } from 'react';
import { getProducts } from '../services/api';

export default function Home({ onAddToCart, userRole }) {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    const categories = ['All', 'Electronics', 'Footwear', 'Accessories', 'Apparel'];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(Array.isArray(data) ? data : data?.results || []);
            } catch (err) {
                console.error('Failed to load products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Safe category extractor helper supporting strings, objects, or arrays
    const getCategoryString = (category) => {
        if (!category) return '';
        if (typeof category === 'string') return category.toLowerCase().trim();
        if (typeof category === 'object') {
            const val = category.name || category.title || category.slug || category.category || '';
            return String(val).toLowerCase().trim();
        }
        return String(category).toLowerCase().trim();
    };

    // Filter products safely for all categories, supporting both 'name' and 'title' keys
    const filteredProducts = products.filter((product) => {
        const productName = product.name || product.title || '';
        const matchesSearch = productName.toLowerCase().includes(searchQuery.toLowerCase());

        if (selectedCategory === 'All') return matchesSearch;

        const prodCategory = getCategoryString(product.category);
        const filterCat = selectedCategory.toLowerCase();

        let matchesCategory = prodCategory === filterCat;

        if (filterCat === 'apparel') {
            matchesCategory = prodCategory === 'apparel' || prodCategory === 'clothing' || prodCategory === 'wear';
        } else if (filterCat === 'electronics') {
            matchesCategory = prodCategory === 'electronics' || prodCategory === 'gadgets' || prodCategory === 'tech';
        } else if (filterCat === 'accessories') {
            matchesCategory = prodCategory === 'accessories' || prodCategory === 'gear' || prodCategory === 'add-on';
        } else if (filterCat === 'footwear') {
            matchesCategory = prodCategory === 'footwear' || prodCategory === 'shoes';
        }

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            {/* Banner */}
            <div className="bg-slate-800/80 border-b border-slate-700/60 py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">
                        Manage & Discover Products
                    </h1>
                    <p className="text-slate-400 text-base max-w-2xl">
                        Shop the latest premium gadgets, apparel, footwear, and accessories with fast checkout and guaranteed satisfaction.
                    </p>
                </div>
            </div>

            {/* Control Bar: Categories & Search */}
            <div className="max-w-7xl mx-auto px-6 pt-8 pb-4 flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Category Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                    {categories.map((cat) => {
                        const isActive = selectedCategory === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${isActive
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                                    }`}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </div>

                {/* Search Bar */}
                <div className="w-full md:w-72">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>

            {/* Product Grid */}
            <div className="max-w-7xl mx-auto px-6 py-6">
                {loading ? (
                    <div className="text-center py-20 text-slate-400">Loading catalog...</div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-20 text-slate-400 bg-slate-800/40 rounded-xl border border-slate-800">
                        No products found matching <span className="text-blue-400 font-semibold">"{selectedCategory}"</span>.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => {
                            const displayTitle = product.name || product.title || 'Untitled Product';
                            const displayCategory = typeof product.category === 'object' ? product.category.name : product.category;

                            return (
                                <div
                                    key={product.id || Math.random()}
                                    className="bg-slate-800 border border-slate-700/70 rounded-xl overflow-hidden hover:border-slate-600 transition flex flex-col"
                                >
                                    <div className="h-56 bg-slate-900 overflow-hidden relative">
                                        <img
                                            src={product.image || 'https://via.placeholder.com/400x300?text=No+Image'}
                                            alt={displayTitle}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                                            }}
                                        />
                                        {displayCategory && (
                                            <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm text-slate-300 text-xs px-2.5 py-1 rounded-md capitalize font-medium border border-slate-700">
                                                {displayCategory}
                                            </span>
                                        )}
                                    </div>

                                    <div className="p-5 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{displayTitle}</h3>
                                            <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                                                {product.description || 'No description available.'}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                                            <span className="text-xl font-bold text-blue-400">
                                                ${parseFloat(product.price || 0).toFixed(2)}
                                            </span>
                                            <button
                                                onClick={() => onAddToCart(product)}
                                                className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}