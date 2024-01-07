import React, { useState, useEffect } from "react";
import '../scripts/ProductDetailPage.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, Flex } from '@chakra-ui/react';
import { set } from "mongoose";


function ProductDetailPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    

    const [productID, setProductID] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(0);

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const lastIndex = currentPath.lastIndexOf('/');
        const product_id = currentPath.substring(lastIndex + 1);
        setProductID(product_id);

        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/product/${product_id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.data.success) {
                    const product = response.data.product;
                    setImageURL(product.imageURL);
                    setCategory(product.category);
                    setName(product.name);
                    setPrice(product.price);
                    setDescription(product.description);
                    console.log("Success in getting product props");
                } else {
                    console.error('Fail in getting product props: ', response.data.message);
                }
            } catch (err) {
                console.error('Error fetching product', err.message);
            }
        };

        fetchProduct();

        const getUserIsAdmin = async () => {
            try {
                const response = await axios.get("/api/user_get_admin", {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (response.data.message === "User admin getting") {
                    console.log("Success in getting user admin");
                    setIsAdmin(response.data.admin);
                } else {
                    console.error('Fail in getting user admin: ', response.data.message);
                }
            } catch (err) {
                console.error('Error getting user admin', err.message);
            }
        }

        getUserIsAdmin();

        const getInCartQuantity = async () => {
            try {
                const response = await axios.get("/api/user_cart", {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (response.data.success) {
                    const cart = response.data.cart;
                    cart.forEach((item) => {
                        if (item.product === productID) {
                            setQuantity(item.quantity);
                        }
                    });
                    console.log("Success in getting inCartQuantity");
                } else {
                    console.error('Fail in getting inCartQuantity: ', response.data.message);
                }
            } catch (err) {
                console.error('Error in getting inCartQuantity: ', err.message);
            }
        };

        getInCartQuantity();

    }, []);

    

    const switchToEdit = () => {
        navigate('/manage-product');        
    }

    const getProductQuantity = async () => {
        try {
            const response = await axios.get(`/api/product/${productID}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.data.success) {
                console.log("Success in getting one product");
                setQuantity(response.data.product.quantity);
            } else {
                console.error('Fail in getting one product: ', response.data.message);
            }
        } catch (err) {
            console.error('Error in getting one product: ', err.message);
        }
    }

    
    const userIncreaseProduct = async () => {
        try {
            const response = await axios.post(`/api/user_increase_product/${productID}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.success) {
                console.log("Success in increasing user product");
                if (response.data.status === "Reach maximum" || response.data.status === "Exceed maximum") {
                    alert(response.data.status);
                }
                setQuantity(response.data.quantity);
            } else if (!response.data.success && response.data.message === "Out of stock") {
                console.error("Out of Stock");
                alert("Out of Stock");
                setQuantity(0);
                removeProduct();
            } else {
                console.error('Fail in increasing the product: ', response.data.message);
            }
        } catch (error) {
            console.error('Error for increasing the product:', error.message);
        }
    };

    const userDecreaseProduct = async () => {
        try {
            const response = await axios.post(`/api/user_decrease_product/${productID}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.success) {
                console.log("Success in increasing user product");
                if (response.data.status === "Reach maximum" || response.data.status === "Exceed maximum") {
                    alert(response.data.status);
                }
                if (response.data.quantity === 0) {
                    removeProduct();
                }
                setQuantity(response.data.quantity);   
            } else if (!response.data.success && response.data.message === "Out of stock") {
                console.error("Out of Stock");
                alert("Out of Stock");
                setQuantity(0);
                removeProduct();
            } else {
                console.error('Fail in decreasing the product: ', response.data.message);
            }
        } catch (error) {
            console.error('Error for decreasing the product:', error.message);
        }
    }

    const addProduct = async () => {
        try {
            const response = await axios.post(`/api/user_add_product/${productID}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.success) {
                console.log("Success in increasing user product");
                if (response.data.status === "Reach maximum") {
                    alert(response.data.status);
                }
                setQuantity(response.data.quantity);
            } else if (!response.data.success && response.data.message === "Out of stock") {
                console.error("Out of Stock");
                alert("Out of Stock");
                setQuantity(0);
            } else if (!response.data.success && response.data.message === "Product already exists in cart") {
                console.error("Product already exists in cart");
                alert("Product already exists in cart");
            } else {
                console.error('Fail in adding the product: ', response.data.message);
            }
        } catch (error) {
            console.error('Error for adding the product:', error.message);
        }
    }


    const removeProduct = async () => {
        try {
            const response = await axios.delete(`/api/user_remove/${productID}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.success) {
                console.log("Success in removing user product");
                setQuantity(0);
            }
        } catch (error) {
            console.error('Error for removing the product:', error.message);
        }
    }


    return (
        <div className="product-detail-page">
            <div className="product-detail-title">Product Detail</div>
            <div className="box">
                <div className="product-detail-image">
                    <img className="product-detail-image-src" src={imageURL} alt="No Image or Error occurs"/>
                </div>
                <div className="product-detail-information">
                    <div className="product-detail-category">{category}</div>
                    <div className="product-detail-name">{name}</div>
                    <div className="product-detail-price-ifstock">
                        <div className="product-detail-price">${price}</div>
                        {getProductQuantity() > 0 ? 
                            <div className="product-detail-ifstock">In stock</div> : 
                            <div className="product-detail-outstock">Out of stock</div>
                        }
                    </div>
                    <div className="product-detail-description">
                        {description}
                    </div>
                    <div className="product-detail-button">
                        {quantity > 0 ?
                             (<Flex className="product-detail-button1" align="center">
                                <Button 
                                    onClick={userDecreaseProduct} 
                                    colorScheme='teal'
                                >-</Button>
                                <span 
                                    style={{
                                        marginLeft:"10%", 
                                        marginRight:"10%",
                                        color: "black",
                                    }}
                                >{quantity}</span>
                                <Button 
                                    onClick={userIncreaseProduct}
                                    colorScheme='teal'
                                >+</Button>
                            </Flex>) :
                            (<Button 
                                className="product-detail-button1" 
                                colorScheme='teal'
                                onClick={addProduct}
                            >
                                Add to Cart
                            </Button>)
                        }
                        {isAdmin && 
                            <Button 
                                className="product-detail-button2" 
                                colorScheme='purple'
                                onClick={switchToEdit}
                            >
                                Edit
                            </Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;