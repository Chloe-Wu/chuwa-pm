import React, { useState } from 'react';
import { Button, Flex } from '@chakra-ui/react'
import '../scripts/ProductInList.css';

function ProductInList({ product }) {
    const [quantity, setQuantity] = useState(0);

    const decreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

  return (
    <div className="frame">
        <div className="image">
            <img className="image-src" src="https://i.redd.it/5ud6o4d37j491.jpg" alt="Apple iPhone 11, 128G" />
        </div>
        <div className="name">Apple iPhone 11, 128G</div>
        <div className="price">$699.00</div>
        <div className="buttons">
            <Flex className="button1" align="center">
                <Button 
                    onClick={decreaseQuantity} 
                    colorScheme='teal'
                >-</Button>
                <span 
                    style={{
                        marginLeft:"20%", 
                        marginRight:"20%",
                        color: "black",
                    }}
                >{quantity}</span>
                <Button 
                    onClick={increaseQuantity}
                    colorScheme='teal'
                >+</Button>
            </Flex>
            <Button className="button2" colorScheme='purple'>Edit</Button>
        </div>
    </div>
  );
}

export default ProductInList;