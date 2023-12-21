import styles from "../scripts/createProduct.module.css";
import { useState } from "react";
import defaultImg from "../assets/defaultImg.jpg";

const CreateProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDes, setProductDes] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [proImg, setProImg] = useState(defaultImg);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
        productName,
        productDes,
        category,
        price,
        stock,
        proImg,
      };

      try{
        const response = await fetch("/api/add_product/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(formData),
        });

        if(response.ok){
            console.log("Product added!")
        }
        else{
            console.log("failed to send product data!")
        }
      }
      catch(error){
        console.log("Error: ",error);
      }
  };

  const handleImgChange = async (e) => {
    setProImg(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Create Product</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.section}>
            <label className={styles.labelTitle} htmlFor="productName">
              Product name
            </label>
            <input id="productName" type="text" value={productName} onChange={(e)=>setProductName(e.target.value)}/>
          </div>
          <div className={styles.section}>
            <label className={styles.labelTitle} htmlFor="productDescription">
              Product Description
            </label>
            <textarea id="productDescription" value={productDes} onChange={(e)=>setProductDes(e.target.value)}></textarea>
          </div>
          <div className={styles.section}>
            <div className={styles.splitSection}>
              <div className={styles.categorySection}>
                <label className={styles.labelTitle} htmlFor="productCategory">
                  Category
                </label>
                <div className={styles.categorySelection}>
                  <input
                    type="text"
                    id="productCategory"
                    value={category}
                    onChange={(e)=>setCategory(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className={styles.priceSection}>
                <label className={styles.labelTitle} htmlFor="productPrice">
                  Price
                </label>
                <input id="productPrice" type="number" value={price} onChange={(e)=>setPrice(e.target.value)}/>
              </div>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.splitSection}>
              <div className={styles.stockSection}>
                <label className={styles.labelTitle} htmlFor="productStock">
                  In Stock Quantity
                </label>
                <input id="productStock" type="number" value={stock} onChange={(e)=>setStock(e.target.value)}/>
              </div>
              <div className={styles.imageSection}>
                <label className={styles.labelTitle} htmlFor="productImage">
                  Add Image Link
                </label>
                <input
                  id="productImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImgChange}
                  aria-describedby="fileInputDescription"
                />
              </div>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.imgPreview}>
              <img src={proImg} />
            </div>
          </div>
          <div>
            <input type="submit" value="Add Product" className={styles.btn} />
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateProduct;
