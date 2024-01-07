import PropTypes from "prop-types";
import React from "react";
import "../../scripts/Framework/Header.css";
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';


function Header() {
  const navigate = useNavigate();

  const intoCart = () => {
    navigate('/user-cart');
  }

  const calculatePrice = async () => {
    try {
      const response = await axios.get("/api/user_cart", {
          headers: {
              'Content-Type': 'application/json'
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
          return total;
      } else {
          console.error('Fail in getting inCartQuantity: ', response.data.message);
      }
    } catch (err) {
        console.error('Error in getting inCartQuantity: ', err.message);
    }
  };


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
          {/* <img className="img" alt="Carbon user" src={carbonUser} /> */}
          <div className="text-wrapper-2">sign out</div>
        </div>
        <div className="div-3" onClick={intoCart}>
          <div className="text-wrapper-2">{calculatePrice()}</div>
        </div>
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