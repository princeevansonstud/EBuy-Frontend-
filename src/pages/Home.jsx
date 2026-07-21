import { useState } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = PRODUCTS.filter((product) => {
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 pb-16">

            <div className="bg--blue-900/40 via-slate-900 to-slate-900 border-b border-slate-800 py-16 px-6">
                <div className="max-w-7xl mx-auto text-center md:text-left">
                    <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Welcome TO Next-Gen Shopping</span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-2 mb-4 leading-tight">
                        Discover Exceptional Tech & Essentials
                    </h1>
                    <p className="text-slate-400 max-w-xl text-base md:text-lg">
                        Shop the latest premium gadgets, apparel, and accessories with fast checkout and guaranteed satisfaction.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-10">


                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">

                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === cat
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700/50'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>


                    <div className="w-full md:w-72">
                       // Change search bar input inside Home.jsx:
                        <input
                            type="text"
                            placeholder="search Category"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-700"
                        />
                    </div>
                </div>


                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-slate-800/40 border border-slate-800 rounded-2xl">
                        <p className="text-slate-400 text-lg">No products found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}