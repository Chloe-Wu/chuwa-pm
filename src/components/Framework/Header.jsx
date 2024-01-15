import PropTypes from "prop-types";
import React from "react";
import "../../scripts/Framework/Header.css";
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logOutUser } from "../../slices/userSlice";
import { useState, useEffect } from 'react';



function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product_id } = useParams();

  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(null);

  const user_token = useSelector((state) => state.user.token);
  const user_id = useSelector((state) => state.user.id);

  const handleSignOut = () => {
    dispatch(logOutUser());
    console.log("Sign out");
    console.log("User token: ", user_token);
    console.log("User id: ", user_id);
    navigate('/product-list');
  }

  const handleLogIn = () => {
    console.log("Switching to log in");
    navigate('/login');
  }

  const intoCart = () => {
    navigate('/user-cart');
  }

  // const createProduct = () => {
  //   navigate('/create-product');
  // };

  const calculatePrice = async () => {
    try {
      const response = await axios.get("/api/user_cart", {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user_token}`
          },
      });

      if (response.data.success) {
          console.log("Success in getting inCartQuantity"); 
          const total = 0;
          const cart = response.data.cart;
          const hash_table = response.data.hash_table;
          cart.forEach((item) => {
              total += item.quantity * hash_table[item.product];
          }); 
          setTotalPrice(total);
      } else {
          console.error('Fail in getting inCartQuantity: ', response.data.message);
      }
    } catch (err) {
        console.error('Error in getting inCartQuantity: ', err.message);
    }
  };


  useEffect(() => {
    calculatePrice();
  }, []); 


  return (
    <div className="header">
      <div className="div-0">
        <p className="header-ms">
            <span className="header-management">Management </span>
            <span className="header-shopping">Shopping</span>
        </p>
      </div>
      <div className="div-1">
        {/* <img className="walmart-logo-web" alt="Walmart logo web" src={walmartLogoWeb} /> */}
        <div className="search-box"> 
          <InputGroup>
            <Input/>
            <InputRightElement>
              <Search2Icon 
                size='md' 
                color='green.500' 
                _hover={{
                  color: "green.500",
                  cursor: "pointer",
                }} 
              />
            </InputRightElement>
          </InputGroup>
        </div>
      </div>
      <div className="div-2">
        <div className="div-3">
          {user_token != null ? 
              (<div className="text-wrapper-2" onClick={handleSignOut}>
                Log out
              </div>) : 
              (<div className="text-wrapper-2" onClick={handleLogIn}>
                Sign In 
              </div>)
          }
        </div>
        {user_token != null && <div className="div-3" onClick={intoCart}>
          <div className="text-wrapper-2">${totalPrice}</div>
        </div>}
      </div>
    </div>
  );
};

// Header.propTypes = {
// //   walmartLogoWeb: PropTypes.string,
// //   antDesignSearch: PropTypes.string,
// //   carbonUser: PropTypes.string,
//   // text: PropTypes.string,
// //   carbonShoppingCart: PropTypes.string,
// };


export default Header;