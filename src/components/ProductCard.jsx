export default function ProductCard({ product }) {
    return (
        <div className="bg-slate-800 border border-slate-700/60 rounded-xl overflow-hidden hover:border-blue-700 hover:shadow-xl hover:shadow-blue-900/20 transition-all duration-300 flex flex-col group">

            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-slate-900">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-700 text-blue-400 text-xs px-2.5 py-1 rounded-full font-medium">
                    {product.category}
                </span>
            </div>

            {/* Details Container */}
            <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-yellow-400 text-xs font-semibold flex items-center gap-1">
                            ⭐ {product.rating}
                        </span>
                        <span className="text-base font-bold text-white">KES {product.price.toLocaleString()}</span>
                    </div>

                    <h3 className="text-base font-semibold text-slate-100 group-hover:text-blue-400 transition-colors line-clamp-1">
                        {product.name}
                    </h3>

                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                        {product.description}
                    </p>
                </div>

                <button className="mt-5 w-full bg-blue-900 hover:bg-blue-800 active:scale-[0.98] text-white text-sm font-medium py-2.5 rounded-lg border border-blue-700/60 transition-all shadow-md shadow-blue-950/40">
                    Add to Cart
                </button>
            </div>
        </div>
    );
}