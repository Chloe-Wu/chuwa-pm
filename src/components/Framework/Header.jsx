// import PropTypes from "prop-types";
import React, { useMemo, useState } from "react";
import "../../scripts/Framework/Header.css";
// import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
// import { Search2Icon } from "@chakra-ui/icons";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { logOutUser } from "../../slices/userSlice";
import { useMediaQuery } from "../../hooks/useMediaQuery";
// import { is } from "@babel/types";

function Header() {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const [loading, setLoading] = useState(false);
  // const [totalPrice, setTotalPrice] = useState(0);

  const isMobile = useMediaQuery("(max-width: 450px)");

  // const user_token = useSelector((state) => state.user.token);

  // const handleSignOut = () => {
  //   dispatch(logOutUser());
  //   navigate("/login");
  // };

  // const intoCart = () => {
  //   navigate("/user-cart");
  // };

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
      marginLeft: "2px"
    }),
    [isMobile]
  );

  // const calculatePrice = async () => {
  //   try {
  //     const response = await axios.get("/api/user_cart", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         'Authorization': `${user_token}`,
  //       },
  //     });

  //     if (response.data.success) {
  //       console.log("Success in getting inCartQuantity");
  //       const total = 0;
  //       const cart = response.data.cart;
  //       const hash_table = response.data.hash_table;
  //       cart.forEach((item) => {
  //         total += item.quantity * hash_table[item.product];
  //       });
  //       setTotalPrice(total);
  //     } else {
  //       console.error(
  //         "Fail in getting inCartQuantity: ",
  //         response.data.message
  //       );
  //     }
  //   } catch (err) {
  //     console.error("Error in getting inCartQuantity: ", err.message);
  //   }
  // };

  if (isMobile) {
    return (
      <div className="header-mobile">

        <div className="header-mobile-first">
          <div className="header-left">
            <p className="header-ms-mobile">
              <span style={logoLeftStyle}>M</span>
              <span style={logoRightStyle}>Shopping</span>
            </p>
          </div>

          {/* <div className="header-right-mobile">
              <div className="text-wrapper-2" onClick={handleSignOut}>
                Log out
              </div>
              <div className="text-wrapper-2" onClick={intoCart}>$50</div>
          </div> */}
        </div>

        {/* <div className="header-mid-mobile">
          <div className="search-box-mobile">
            <InputGroup>
              <Input />
              <InputRightElement>
                <Search2Icon
                  size="md"
                  color="green.500"
                  _hover={{
                    color: "green.500",
                    cursor: "pointer",
                  }}
                />
              </InputRightElement>
            </InputGroup>
          </div>
        </div> */}
      </div>
    );
  } else {
    return (
      <div className="header">
        <div className="header-left">
          <p className="header-ms">
            <span style={logoLeftStyle}>Management</span>
            <span style={logoRightStyle}>Shopping</span>
          </p>
        </div>
        {/* <div className="header-mid">
          <div className="search-box">
            <InputGroup>
              <Input />
              <InputRightElement>
                <Search2Icon
                  size="md"
                  color="green.500"
                  _hover={{
                    color: "green.500",
                    cursor: "pointer",
                  }}
                />
              </InputRightElement>
            </InputGroup>
          </div>
        </div>
        <div className="header-right">
          <div className="div-3">
            <div className="text-wrapper-2" onClick={handleSignOut}>
              Log out
            </div>
          </div>
          <div className="div-3" onClick={intoCart}>
            <div className="text-wrapper-2">$ {totalPrice}</div>
          </div>
        </div> */}
      </div>
    );
  }
}

// Header.propTypes = {
// //   walmartLogoWeb: PropTypes.string,
// //   antDesignSearch: PropTypes.string,
// //   carbonUser: PropTypes.string,
//   // text: PropTypes.string,
// //   carbonShoppingCart: PropTypes.string,
// };

export default Header;
