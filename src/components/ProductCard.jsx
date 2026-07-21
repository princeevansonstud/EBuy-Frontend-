export default function ProductCard({ product }) {
    return (
        <div className="bg-slate-800 border border-slate-700/60 rounded-xl overflow-hidden hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col group">

            
            <div className="relative aspect-square overflow-hidden bg-slate-900">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md border border-slate-700 text-blue-400 text-xs px-2.5 py-1 rounded-full font-medium">
                    {product.category}
                </span>
            </div>

          
            <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-yellow-400 text-xs font-semibold flex items-center gap-1">
                            {product.rating}
                        </span>
                        <span className="text-lg font-bold text-white">${product.price.toFixed(2)}</span>
                    </div>

                    <h3 className="text-base font-semibold text-slate-100 group-hover:text-blue-400 transition-colors line-clamp-1">
                        {product.name}
                    </h3>

                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                        {product.description}
                    </p>
                </div>

                <button className="mt-5 w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white text-sm font-medium py-2.5 rounded-lg transition-all shadow-lg shadow-blue-600/20">
                    Add to Cart
                </button>
            </div>
        </div>
    );
}