import React from 'react';
import AuthForm from "../components/AuthForm/AuthForm";
import { useNavigate } from 'react-router-dom';

import Header from '../components/Framework/Header';
import Footer from "../components/Framework/Footer";


export default function UpdatePassword() {
  return (
    <div>
      <Header/>
      <AuthForm scenario='forgot-password'/>
      <Footer/>
    </div>
  );
}