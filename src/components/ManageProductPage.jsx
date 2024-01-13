import React, { useState, useEffect } from "react";
import '../scripts/ManageProductPage.css';
import { Select, Button, ButtonGroup } from '@chakra-ui/react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function ManageProductPage() {
    const [imageURL, setImageURL] = useState("");
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [productID, setProductID] = useState("");

    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();

    const { product_id } = useParams();

    const user_token = useSelector((state) => state.user.token);
    
    
    useEffect(() => {
        if (currentPath.includes("update-product")) {
            setProductID(product_id);

            const fetchProduct = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/api/product/${product_id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    if (response.data.success) {
                        const product = response.data.product;
                        setImageURL(product.imageUrl);
                        setCategory(product.category);
                        setName(product.name);
                        setPrice(product.price);
                        setDescription(product.description);
                        setQuantity(product.quantity);
                        console.log("Success in getting product props");
                    } else {
                        console.error('Fail in getting product props: ', response.data.message);
                    }
                } catch (err) {
                    console.error('Error fetching product', err.message);
                }
            };

            fetchProduct();
        } 
    }, []);



    const submitProduct = async (e) => {
        e.preventDefault();

        const formData = {
            name: name,
            description: description,
            category: category,
            price: price,
            quantity: quantity,
            imageUrl: imageURL
        };

        if (currentPath.includes("create-product")) {
            try {
                const response = await axios.post(
                    `http://localhost:3000/api/create_product`,
                    formData, 
                    {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user_token}`
                    },
                });
        
                if (response.data.success) {
                    console.log("Product added!")
                } else if (!response.data.success && response.data.message === "Product already exists" ) {
                    console.error('Fail in adding the product: ', response.data.message);
                    alert("Product already exists");
                } else {
                    console.log("failed to add product data! The reason is: ", response.data.message)
                }
            } catch (error) {
                console.log("Error to add product data! The reason is: ", error);
            }
        } else {
            try {
                const response = await axios.post(
                    `http://localhost:3000/api/update_product/${productID}`,
                    formData, 
                    {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user_token}`
                    },
                });
        
                if(response.data.success){
                    console.log("Product updated!");
                    navigate(`/product-detail/${product_id}`)
                }else{
                    console.log("failed to update product data! The reason is: " + response.data.message)
                }
            } catch (error) {
                console.log("Error to update product data! The reason is: ", error);
            }
        }
        
    } 

    return (
        <div className="manage-product-page">
            <div className="manage-page-title">
                {currentPath.includes("create_product") ? "Create Product" : "Edit Product"}
            </div>
            <div className="box">
                <div className="product-name">
                    <h5 className="product-name-title">Product Name</h5>
                    <input
                        className="product-name-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                    />
                </div>
                <div className="product-description">
                    <h5 className="product-description-title">Product Description</h5>
                    <textarea
                        className="product-description-input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                    />
                </div>
                <div className="product-category-price">
                    <div className="product-category">
                        <h5 className="product-category-title">Category</h5>
                        <Select 
                            className="product-category-input"
                            id="category-select"
                            value={category}
                            label="Category"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value='Phones'>Phones</option>
                            <option value='Laptops'>Laptops</option>
                            <option value='Clothes'>Clothes</option>
                        </Select>
                        {/* <select 
                            className="product-category-input"
                            placeholder="Select option"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value='option1'>Option 1</option>
                            <option value='option2'>Option 2</option>
                            <option value='option3'>Option 3</option>
                        </select> */}
                    </div>
                    <div className="product-price">
                        <h5 className="product-price-title">Price</h5>
                        <input
                            className="product-price-input"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            type="text"
                        />
                    </div>
                /</div>
                <div className="product-quantity-image">
                    <div className="product-quantity">
                        <h5 className="product-quantity-title">In Stock Quantity</h5>
                        <input
                            placeholder={quantity}
                            className="product-quantity-input"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            type="text"
                        />
                    </div>
                    <div className="product-image">
                        <h5 className="product-image-title">Add Image Link</h5>
                        <div className="product-image-wrap">
                            {/* <input
                                className="product-image-input"
                                onChange={handleImgChange}
                                type="file"
                                accept="image/*"
                                aria-describedby="fileInputDescription"
                                placeholder="http://"
                            /> */}
                            <input
                                placeholder="https://"
                                className="product-image-input"
                                value={imageURL}
                                onChange={(e) => setImageURL(e.target.value)}
                                type="text"
                            />
                        </div>
                    </div>
                </div>
                <div className="product-image-preview">
                    <img 
                        className="product-detail-image-src" 
                        src={imageURL} 
                        alt="No Image or Error occurs" 
                    />
                </div>
                    <Button 
                        className="product-button" 
                        colorScheme='teal'
                        onClick={submitProduct}
                    >
                        {currentPath.includes("create_product") ? "Add Product" : "Edit Product"}
                    </Button>
            </div>
        </div>
    );
}

export default ManageProductPage;