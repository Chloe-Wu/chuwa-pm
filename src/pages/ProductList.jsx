import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {

                const response = await axios.get('/api/products');
                setProducts(response.data.products);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p>Loading products...</p>;

    return (
        <div>
            <h1>Products</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {products.map(product => (
                    <div key={product._id} style={{ width: '200px', margin: '10px' }}>
                        <img src={product.imageUrl} alt={product.name} style={{ width: '100%' }} />
                        <h3>{product.name}</h3>
                        <p>${product.price.toFixed(2)}</p>
                        <button onClick={() => console.log('Add to cart logic here')}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductListPage;
