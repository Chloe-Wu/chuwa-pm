import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/products?sort_by=last_added&page=${currentPage}&perPage=10`);
                setProducts(response.data.products);
                setTotalPages(response.data.pages);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [currentPage]);

    const handleAddToCart = (productId) => {
        // add to cart logic
        console.log(`Added product with ID ${productId} to cart`);
    };

    return (
        <div>
            <h1 style={{ color: 'black' }}>Products</h1>
            {loading ? (
                <p>Loading products...</p>
            ) : (
                <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {products.map((product) => (
                            <div key={product._id} style={{ width: '200px', margin: '10px', border: '1px solid #ccc', padding: '10px' }}>
                                <img src={product.imageUrl} alt={product.name} style={{ width: '100%' }} />
                                <h3>{product.name}</h3>
                                <p>${product.price.toFixed(2)}</p>
                                <button onClick={() => handleAddToCart(product._id)}>Add</button>
                                {/* need exit button? */}
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button key={index} onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
