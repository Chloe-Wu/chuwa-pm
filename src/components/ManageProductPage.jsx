import React, { useState, useEffect } from "react";
import '../scripts/ManageProductPage.css';
import { Select, FormControl, MenuItem, Button, ButtonGroup } from '@chakra-ui/react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

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
    
    useEffect(() => {
        if (currentPath.includes("update_product")) {
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
        } 
    }, []);



    const handleImgChange = async (e) => {
        setImageURL(URL.createObjectURL(e.target.files[0]));
    };


    const submitProduct = async (e) => {
        e.preventDefault();

        const formData = {
            name: name,
            description: description,
            category: category,
            price: price,
            quantity: quantity,
            imageURL: imageURL
        };

        if (currentPath.includes("create_product")) {
            try {
                const response = await axios.post(`/api/create_product`, {
                    headers: {
                        'Content-Type': 'application/json',
                        body: JSON.stringify(formData),
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
                const response = await axios.post(`/api/update_product/${productID}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        body: JSON.stringify(formData),
                    },
                });
        
                if(response.data.success){
                    console.log("Product updated!")
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
                        <FormControl className="product-category-input"  fullWidth>
                            <Select
                                labelId="category-select-label"
                                id="category-select"
                                value={category}
                                label="Category"
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <MenuItem key={0} value='Groceries & Stores'>Groceries & Stores</MenuItem>
                                <MenuItem key={1} value='Medical Care & Pharmacy'>Medical Care & Pharmacy</MenuItem>
                                <MenuItem key={2} value='Pets'>Pets</MenuItem>
                                <MenuItem key={3} value='Fashion & Beauty'>Fashion & Beauty</MenuItem>
                                <MenuItem key={4} value='Home & DIY'>Home & DIY</MenuItem>
                                <MenuItem key={5} value='Devices & Electronics'>Devices & Electronics</MenuItem>
                                <MenuItem key={6} value='Music, Video & Gaming'>Music, Video & Gaming</MenuItem>
                                <MenuItem key={7} value='Books & Reading'>Books & Reading</MenuItem>
                                <MenuItem key={8} value='Toys, Kids & Baby'>Toys, Kids & Baby</MenuItem>
                                <MenuItem key={9} value='Automotive'>Automotive</MenuItem>
                                <MenuItem key={10} value='Office & Professional'>Office & Professional</MenuItem>
                                <MenuItem key={11} value='Sports & Fanshop'>Sports & Fanshop</MenuItem>
                                <MenuItem key={12} value='Outdoor & Travel'>Outdoor & Travel</MenuItem>
                            </Select>
                        </FormControl>
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
                            className="product-quantity-input"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            type="text"
                        />
                    </div>
                    <div className="product-image">
                        <h5 className="product-image-title">Add Image Link</h5>
                        <div className="product-image-wrap">
                            <input
                                className="product-image-input"
                                onChange={handleImgChange}
                                type="file"
                                accept="image/*"
                                aria-describedby="fileInputDescription"
                                placeholder="http://"
                            />
                            {/* <Button className="product-image-button" colorScheme='teal'>Upload</Button> */}
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