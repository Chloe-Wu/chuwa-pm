import React, { useState, useEffect } from 'react';
import '../Cart.css';

const Cart = ({ user, onClose, onUpdateCart, onRemoveFromCart, isOpen }) => {
    const [cart, setCart] = useState(user ? user.cart : []);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let total = 0;
        for (const item of cart) {
            total += item.product.price * item.quantity;
        }
        setTotalPrice(total);
    }, [cart]);

    const handleUpdateQuantity = (productId, newQuantity) => {

        const updatedCart = cart.map((item) =>
            item.product._id === productId
                ? { ...item, quantity: newQuantity }
                : item
        );
        setCart(updatedCart);
        onUpdateCart(updatedCart);
    };

    const handleRemoveFromCart = (productId) => {
        //remove items from cart
        const updatedCart = cart.filter((item) => item.product._id !== productId);
        setCart(updatedCart);
        onRemoveFromCart(productId, updatedCart);
    };

    return (
        <div className="cart-container" style={{ right: isOpen ? 0 : -400 }}>
            <div className="cart-header">
                <h2>Shopping Cart</h2>
                <button onClick={onClose}>Close</button>
            </div>
            <div className="cart-items">
                {cart.map((item) => (
                    <div key={item.product._id} className="cart-item">
                        <div className="item-details">
                            <img src={item.product.imageUrl} alt={item.product.name} />
                            <div>
                                <h3>{item.product.name}</h3>
                                <p>Price: ${item.product.price.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="item-actions">
                            <button
                                onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                                disabled={item.quantity === 1}
                            >
                                -
                            </button>
                            <span>{item.quantity}</span>
                            <button onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}>+</button>
                            <button onClick={() => handleRemoveFromCart(item.product._id)}>Remove</button>
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
