// src/components/ProductCard.jsx

const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-family='sans-serif' font-size='16px'%3ENo Image Available%3C/text%3E%3C/svg%3E";

export default function ProductCard({ product, onAddToCart }) {
    // Determine correct image source across different payload keys
    const rawImage = product.image || product.image_url;

    const getImageUrl = (img) => {
        if (!img) return FALLBACK_IMAGE;
        if (img.startsWith('http') || img.startsWith('data:')) return img;
        // Fallback for backend-relative media paths if applicable
        return `[https://ebuy-backend.onrender.com](https://ebuy-backend.onrender.com)${img}`;
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md flex flex-col justify-between">
            <img
                src={getImageUrl(rawImage)}
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
                    <span className="text-xl font-bold text-emerald-400">${product.price}</span>
                    {onAddToCart && (
                        <button
                            onClick={() => onAddToCart(product)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded text-sm font-medium transition"
                        >
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}