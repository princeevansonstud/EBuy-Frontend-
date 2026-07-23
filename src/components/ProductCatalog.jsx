import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';

const ProductCatalog = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchCatalog = async (query = '') => {
        try {
            setLoading(true);
            setError(null);
            const data = await getProducts({ search: query });
            
            setProducts(data.results ? data.results : data);
        } catch (err) {
            setError('Unable to fetch products from server.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCatalog();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchCatalog(searchTerm);
    };

    if (loading) return <div style={{ padding: '20px' }}>Loading catalog...</div>;
    if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
                Product Catalog
            </h2>

            {/* Search Input */}
            <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        padding: '8px 12px',
                        width: '260px',
                        marginRight: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '8px 16px',
                        cursor: 'pointer',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                    }}
                >
                    Search
                </button>
            </form>

            {/* Products Grid */}
            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                        gap: '20px',
                    }}
                >
                    {products.map((product) => (
                        <div
                            key={product.id}
                            style={{
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                padding: '16px',
                                backgroundColor: '#fff',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div>
                                <h3 style={{ fontSize: '16px', margin: '0 0 8px 0' }}>
                                    {product.name}
                                </h3>
                                <p style={{ fontSize: '14px', color: '#555', margin: '0 0 12px 0' }}>
                                    {product.description || 'No description available.'}
                                </p>
                            </div>
                            <div>
                                <p style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 12px 0' }}>
                                    ${product.price}
                                </p>
                                <button
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        backgroundColor: '#28a745',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductCatalog;