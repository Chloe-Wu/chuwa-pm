import React from 'react';
import errorIcon from "../../assets/fluent_error-circle-24-regular.svg";
import styles from "./error.module.css";
import { useNavigate } from "react-router-dom"; 

export default function ErrorMessage() {
  const navigate = useNavigate(); 

  return (
    <div className={styles.container}>
      <img src={errorIcon} alt="Error Icon" />
      <h2>Oops, something went wrong!</h2>
      <button className={styles.submitBtn} onClick={() => navigate('/login')}>Go Home</button>
    </div>
  );
}