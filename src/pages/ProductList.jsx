import React, { useState, useEffect } from "react";

import * as jwt_decode from "jwt-decode";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useLocation
import axios from "axios";
import "../ProductListStyle.css";
import Cart from "./Cart.jsx";
import { useDispatch, useSelector } from "react-redux";

import ProductInList from "./ProductInList.jsx"; 
import Footer from "../components/Framework/Footer.jsx";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("last_added");
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  // const userId = useSelector(state => state.user.payload ? state.user.payload.id : null);
  // const userToken = useSelector(state => state.user.payload ? state.user.payload.token : null);
  const userId = useSelector((state) => state.user ? state.user.id : null);
  const userToken = useSelector((state) => state.user ? state.user.token : null);
  // console.log("the user id is " + userId);
  // console.log("the token is " + userToken);


  const location = useLocation();
  // console.log(user.email); // Access email
  // console.log(user.admin); // Access admin status
  // console.log(user.id);
  // console.log(user.password);

  // const user_token = useSelector((state) => state.user.token);
  // const user_token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4MTdkMjBiMTkyNmE5ZTVjMzQ3ZTUwIiwiYWRtaW4iOnRydWV9LCJpYXQiOjE3MDUyNzM0MjMsImV4cCI6MTcwNTM1OTgyM30.0vsnosASdIHQkc1TrtjyAhMnDLIABWRUnxaOWbSRxqw";
  // // console.log(user_token)

  const handleUpdateCart = (updatedCart) => {

  };

  const handleRemoveFromCart = (productId, updatedCart) => {

  };

  const handleSignOut = () => {
    console.log("logged out");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let sortValue;
      switch (sortBy) {
        case "last_added":
          sortValue = "updateTime";
          break;
        case "price_low_to_high":
          sortValue = "price_low";
          break;
        case "price_high_to_low":
          sortValue = "price_high";
          break;
        default:
          sortValue = "updateTime";
      }

      const response = await axios.get("http://localhost:3000/api/products", {
        params: {
          sort_by: sortValue,
          page: currentPage,
          perPage: 10,
          search: searchTerm,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      console.log(response.data)
      // console.log("User object in fetchProducts:", user.id);

      setUser(response.data.login)
      setProducts(response.data.products);
      setTotalPages(response.data.pages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();



    // Check if there's user data in localStorage and set it to state
    // const savedUser = localStorage.getItem("user");
    // if (savedUser) {
    //   setUser(JSON.parse(savedUser));
    // }
  }, [currentPage, sortBy, searchTerm]);


  // const getProductID = (product_id)

  const handleAddToCart = async (productId) => {
    console.log("current product id " + productId);
    console.log("the token is " + userToken);
    try {
      if (user) {
        const response = await axios.post(
          `http://localhost:3000/api/user_add_product/${productId}`, {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        if (response.data.success) {
          const updatedCartItems = [...cartItems];
          updatedCartItems.push(response.data.product);
          setCartItems(updatedCartItems);
        }
      } else {
        console.log("User is not logged in. Please log in to add to cart.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      if (error.response) {
        console.error("Response Data:", error.response.data);
      }
    }
  };

  return (
    <div>
      <div className="top-bar">
        <div className="logo">Chuwa Shop</div>
        <div id="search-box">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="user-buttons">
          {user ? (
            <div className="user-dropdown">
              <div className="user-name">{userId}</div>
              <button onClick={handleSignOut}>Sign Out</button>
            </div>
          ) : (
            <Link to="/login">Sign In</Link>
          )}
        </div>
        <div className="cart-button">
          {user && (
            <button id="cartbutton" onClick={() => setIsCartOpen(!isCartOpen)}>

              Cart
            </button>
          )}
        </div>

        <Cart
            userId={userId}
            userToken={userToken}
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            onUpdateCart={handleUpdateCart}
            onRemoveFromCart={handleRemoveFromCart}
        />

      </div>
      <div className="sort-dropdown">
        <label htmlFor="sort-by">Sort by:</label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="last_added">Last Added</option>
          <option value="price_low_to_high">Price: Low to High</option>
          <option value="price_high_to_low">Price: High to Low</option>
        </select>
      </div>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div>
          <div className="product-grid">
            {
              products.map((product, idx) => (
                  <ProductInList key={idx} product={product} handleAddToCart={handleAddToCart}/>
              ))
            
            
            /* {products.map((product) => (
              <div key={product._id} className="product-card">
                <img src={product.imageUrl} alt={product.name} />
                <h3>{product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
                <div>
                  {user ? (
                    // User is signed in, render buttons
                    <div>
                      <button onClick={() => handleAddToCart(product._id)}>
                        Add
                      </button>
                      {user.admin && (
                        <Link to={`/edit/${product._id}`}>Edit</Link>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            ))} */}
          </div>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index} onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default ProductList;
