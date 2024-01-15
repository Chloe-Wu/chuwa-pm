import React, { useState, useEffect } from 'react';
import '../scripts/Cart.css';
import axios from 'axios';
const Cart = ({ userId, userToken, onClose, onUpdateCart, onRemoveFromCart, isOpen }) => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    // console.log("Cart component received user data:", user.id);
    // console.log("Cart component cart data:", cart);

    useEffect(() => {
        fetchCartData();
    }, [userId, userToken]);

    const fetchCartData = async () => {
        try {
            if (userId && userToken) {
                const response = await axios.get('/api/user_cart', {
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    }
                });

                if (response.data.success) {
                    console.log("Cart Data from API:", response.data);
                    const updatedCart = await Promise.all(response.data.cart.map(async (item) => {

                        console.log("当前商品的id: " + item.product);

                        try {
                            const productDetails = await fetchProductDetails(item.product);
                            console.log("This is product detail: "+productDetails);
                            console.log("this is img link: " + productDetails.imageUrl);
                            return {
                                ...item,
                                product: {
                                    ...item.product,
                                    name: productDetails.name,
                                    imageUrl: productDetails.imageUrl,

                                    price: productDetails.price
                                }
                            };
                        } catch (error) {
                            console.error('Error fetching product details:', error);
                            return {
                                ...item,
                                product: {
                                    ...item.product,
                                    name: '',
                                    imageUrl: '',
                                    price: 0  
                                }
                            };
                        }
                    }));

                    setCart(updatedCart);
                    updateTotalPrice(updatedCart);

                }
            }
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };
    const fetchProductDetails = async (productId) => {
        try {
            // console.log("这是当前的" + productId);
            const response = await axios.get(`/api/product/${productId}`);

            if (response.data.success) {

                console.log("Product details: " + response.data.product);
                return response.data.product;

            }
        } catch (error) {
            console.error('Error fetching product details:', error);
        }

        return { imageUrl: '', price: 0 };
    };
    const updateTotalPrice = (cartData) => {
        let total = 0;
        for (const item of cartData) {
            total += item.product.price * item.quantity;
        }
        setTotalPrice(total);
    };

    const handleUpdateQuantity = (productId, newQuantity) => {
        const updatedCart = cart.map((item) => {
            if (item.product === productId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCart(updatedCart);
        onUpdateCart(updatedCart);
    };

    const handleRemoveFromCart = (productId) => {
        // Remove items from cart
        const updatedCart = cart.filter((item) => item.product !== productId);
        setCart(updatedCart);
        onRemoveFromCart(productId, updatedCart);
    };


    return (
        <div className="cart-container" style={{ right: isOpen ? 0 : -400 }}>
            <div className="cart-header">
                <h2>Shopping Cart</h2>
                <button id="exit" onClick={onClose}>Close</button>
            </div>
            <div className="cart-items">
                {cart.map((item) => (
                    <div key={item.product} className="cart-item">
                        <div className="item-details">
                            {console.log("Product Image URL:", item.imageUrl)}
                            <img src={item.product.imageUrl} alt={item.product.name} />
                            <div>
                                <h3 className="product-name">{item.product.name}</h3>
                                <p className="product-price">Price: ${item.product.price ? item.product.price.toFixed(2) : 'N/A'}</p>

                            </div>
                        </div>
                        <div className="item-actions">
                            <button
                                onClick={() => handleUpdateQuantity(item.product, item.quantity - 1)}
                                disabled={item.quantity === 1}
                            >
                                -
                            </button>
                            <span className="product-quantity">{item.quantity}</span>
                            <button onClick={() => handleUpdateQuantity(item.product, item.quantity + 1)}>+</button>
                            <button onClick={() => handleRemoveFromCart(item.product)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-footer">
                <p>Total Price: ${totalPrice.toFixed(2)}</p>
                <button>Continue to Checkout</button>
            </div>
        </div>
    );
};

export default Cart;