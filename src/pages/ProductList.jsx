import React, { useState, useEffect, useMemo } from "react";

import * as jwt_decode from "jwt-decode";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useLocation
import axios from "axios";
import "../scripts/ProductList.css";
import Cart from "./Cart.jsx";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "@chakra-ui/react";
import { logOutUser } from "../slices/userSlice";

import ProductInList from "./ProductInList.jsx";
import Footer from "../components/Framework/Footer.jsx";
import { useMediaQuery } from "../hooks/useMediaQuery.jsx";
import { create } from "lodash";

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
  const userId = useSelector((state) => (state.user ? state.user.id : null));
  const userToken = useSelector((state) =>
    state.user ? state.user.token : null
  );
  // console.log("the user id is " + userId);
  // console.log("the token is " + userToken);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isMobile = useMediaQuery("(max-width: 450px)");

  // const page = localStorage.getItem("page");


  const [isAdmin, setIsAdmin] = useState(false);

  const handleUpdateCart = (updatedCart) => {};

  const handleRemoveFromCart = (productId, updatedCart) => {};

  // const handleSignOut = () => {
  //   console.log("logged out");
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("token");
  //   setUser(null);

  // };

  const handleSignOut = () => {
    localStorage.setItem("page", 1);
    dispatch(logOutUser());
    setUser(null);
    navigate("/login");
  };

  const fetchProducts = async () => {

    localStorage.setItem("page", currentPage);

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
          page: localStorage.getItem("page"),
          perPage: 10,
          search: searchTerm,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      console.log(response.data);
      // console.log("User object in fetchProducts:", user.id);

      setUser(response.data.login);
      setProducts(response.data.products);
      setTotalPages(response.data.pages);
      setLoading(false);
    } catch (error) {
      setUser(true);
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();

    const getUserIsAdmin = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/user_get_admin",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        if (response.data.message === "User admin getting") {
          console.log("Success in getting user admin");
          setIsAdmin(response.data.admin);
        } else {
          console.error("Fail in getting user admin: ", response.data.message);
        }
      } catch (err) {
        console.error("Error getting user admin", err.message);
      }
    };

    getUserIsAdmin();

    // Check if there's user data in localStorage and set it to state
    // const savedUser = localStorage.getItem("user");
    // if (savedUser) {
    //   setUser(JSON.parse(savedUser));
    // }
  }, [currentPage, sortBy, searchTerm, user]);

  const logoLeftStyle = useMemo(
    () => ({
      color: "white",
      fontFamily: "Inter-Bold Helvetica",
      fontSize: isMobile ? "20px" : "28px",
      fontWeight: 700,
      letterSpacing: 0,
      lineHeight: "21px",
    }),
    [isMobile]
  );

  const logoRightStyle = useMemo(
    () => ({
      color: "white",
      fontSize: isMobile ? "10px" : "14px",
      marginLeft: "2px",
    }),
    [isMobile]
  );

  const headerButtonStyle = useMemo(
    () => ({
      color: "white",
      fontSize: isMobile ? "20px" : "25px",
    }),
    [isMobile]
  );

  // const getProductID = (product_id)

  const handleAddToCart = async (productId) => {
    console.log("current product id " + productId);
    console.log("the token is " + userToken);
    try {
      if (user) {
        const response = await axios.post(
          `http://localhost:3000/api/user_add_product/${productId}`,
          {},
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

  if (isMobile) {
    return (
      <div>
        <div className="top-bar-mobile">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <div className="logo">
              <p className="header-ms">
                <span style={logoLeftStyle}>M</span>
                <span style={logoRightStyle}>Shopping</span>
              </p>
            </div>
            <div className="user-buttons">
              {user ? (
                <div className="user-dropdown">
                  <UserOutlined style={headerButtonStyle} />
                  <button onClick={handleSignOut}>Sign Out</button>
                </div>
              ) : (
                <Link to="/login">Sign In</Link>
              )}
            </div>
            <div style={{ marginRight: "15px" }}>
              {user && (
                <button
                  id="cartbutton"
                  style={headerButtonStyle}
                  onClick={() => setIsCartOpen(!isCartOpen)}
                >
                  <ShoppingCartOutlined />
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
          <div style={{ marginLeft: "10px", marginRight: "10px" }}>
            <input
              style={{ color: "black" }}
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="sort-dropdown-mobile">
          <>
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
          </>
          {isAdmin && (
            <div className="create-product-mobie">
              <Button
                colorScheme="facebook"
                onClick={() => {
                  navigate("/create-product");
                }}
              >
                Create Product
              </Button>
            </div>
          )}
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div>
            <div className="product-grid-mobile">
              {products.map((product, idx) => (
                <ProductInList
                  key={idx}
                  product={product}
                  handleAddToCart={handleAddToCart}
                />
              ))}
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
        <br />
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <div className="top-bar">
          <div className="logo">
            <p className="header-ms">
              <span style={logoLeftStyle}>Management</span>
              <span style={logoRightStyle}>Shopping</span>
            </p>
          </div>
          <div id="search-box">
            <input
              style={{ color: "black" }}
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="user-buttons">
            {user ? (
              <div className="user-dropdown">
                <UserOutlined style={headerButtonStyle} />
                <button onClick={handleSignOut}>Sign Out</button>
              </div>
            ) : (
              <Link to="/login">Sign In</Link>
            )}
          </div>
          <div style={{ marginRight: "38px" }}>
            {user && (
              <button
                id="cartbutton"
                style={headerButtonStyle}
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <ShoppingCartOutlined />
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
          <>
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
          </>
          {isAdmin && (
            <div className="create-product">
              <Button
                colorScheme="facebook"
                onClick={() => {
                  navigate("/create-product");
                }}
              >
                Create Product
              </Button>
            </div>
          )}
        </div>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div>
            <div className="product-grid">
              {products.map((product, idx) => (
                <ProductInList
                  key={idx}
                  product={product}
                  handleAddToCart={handleAddToCart}
                />
              ))}
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
        <Footer />
      </div>
    );
  }
};

export default ProductList;
