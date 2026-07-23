export default function ProductCard({ product, onAddToCart }) {
    if (!product) return null;

    const fallbackImage =
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80';

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex flex-col justify-between hover:border-blue-500/50 transition">
            <div>
                <img
                    src={product.image_url || product.image || fallbackImage}
                    alt={product.name || 'Product'}
                    className="w-full h-48 object-cover rounded-lg mb-4 bg-slate-900"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = fallbackImage;
                    }}
                />
                <h3 className="text-lg font-bold text-white mb-1">
                    {product.name || 'Unnamed Product'}
                </h3>
                <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                    {product.description || 'No description available.'}
                </p>
            </div>

            <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-700/50">
                <span className="text-xl font-extrabold text-blue-400">
                    ${product.price || '0.00'}
                </span>
                <button
                    onClick={() => onAddToCart && onAddToCart(product)}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition active:scale-95"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}