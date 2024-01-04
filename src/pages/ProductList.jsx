// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
//
// const ProductListPage = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(false);
//
//     useEffect(() => {
//         const fetchProducts = async () => {
//             setLoading(true);
//             try {
//
//                 const response = await axios.get('/api/products');
//                 setProducts(response.data.products);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//                 setLoading(false);
//             }
//         };
//
//         fetchProducts();
//     }, []);
//
//     if (loading) return <p>Loading products...</p>;
//
//     return (
//         <div>
//             <h1>Products</h1>
//             <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//                 {products.map(product => (
//                     <div key={product._id} style={{ width: '200px', margin: '10px' }}>
//                         <img src={product.imageUrl} alt={product.name} style={{ width: '100%' }} />
//                         <h3>{product.name}</h3>
//                         <p>${product.price.toFixed(2)}</p>
//                         <button onClick={() => console.log('Add to cart')}>Add</button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default ProductListPage;
import React from 'react';

const ProductListPage = () => {
    // Temporary static data to simulate the product layout
    const products = new Array(10).fill({}).map((_, index) => ({
        _id: index,
        imageUrl: '', // Placeholder for image URL
        name: `Product ${index + 1}`,
        price: (99.99).toFixed(2),
    }));

    return (
        <div>
            <nav style={{ backgroundColor: 'darkblue', padding: '10px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>Chuwa Shop</div>
                <input type="text" placeholder="Search" style={{ margin: '0 20px' }} />
                <div>
                    <span style={{ marginRight: '15px' }}>Sign In</span>
                    <span>Cart</span>
                </div>
            </nav>

            <h1 style={{ textAlign: 'center' }}>Products</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                {products.map(product => (
                    <div key={product._id} style={{ width: '18%', border: '1px solid #ccc', padding: '10px', borderRadius: '5px', textAlign: 'center' }}>
                        <img src={product.imageUrl || 'https://via.placeholder.com/150'} alt={product.name} style={{ width: '100%', marginBottom: '10px' }} />
                        <h3>{product.name}</h3>
                        <p>${product.price}</p>
                        <button onClick={() => console.log('Add to cart logic here')}>Add to Cart</button>
                    </div>
                ))}
            </div>

            <footer style={{ backgroundColor: 'darkblue', color: 'white', padding: '10px', marginTop: '20px', textAlign: 'center' }}>
                <p>Contact us | Privacy Policies | Help</p>
            </footer>
        </div>
    );
};

export default ProductListPage;

