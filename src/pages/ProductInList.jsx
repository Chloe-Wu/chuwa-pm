import React, { useState } from "react";
import { Button, Flex } from "@chakra-ui/react";
import "../scripts/ProductInList.css";
import { useDispatch, useSelector } from "react-redux";

function ProductInList({ product, user, handleAddToCart }) {
  const [quantity, setQuantity] = useState(0);

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    handleAddToCart(product._id);
    setQuantity(quantity + 1);
  };

  return (
    <div className="frame">
      <div className="image">
        <img
          className="image-src"
          src={product.imageUrl}
          alt="Apple iPhone 11, 128G"
        />
      </div>
      <div className="name">{product.name}</div>
      <div className="price">${product.price}</div>
      <div className="buttons">
        <Flex className="button1" align="center">
          <Button onClick={decreaseQuantity} colorScheme="teal">
            -
          </Button>
          <span
            style={{
              marginLeft: "20%",
              marginRight: "20%",
              color: "black",
            }}
          >
            {quantity}
          </span>
          <Button onClick={increaseQuantity} colorScheme="teal">
            +
          </Button>
        </Flex>
        <Button className="button2" colorScheme="purple">
          Edit
        </Button>
      </div>
    </div>
  );
}

export default ProductInList;
