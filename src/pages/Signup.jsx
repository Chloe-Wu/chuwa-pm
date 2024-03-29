import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthForm from "../components/AuthForm/AuthForm";
import { signUpUser } from '../slices/userSlice';

import Header from '../components/Framework/Header';
import Footer from "../components/Framework/Footer";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleAuthSubmit = data => {
    dispatch(signUpUser(data)).then(() => navigate('/login'));
  };
  
  return (
    <div>
      <Header/>
      <AuthForm onAuthSubmit={handleAuthSubmit} scenario='signup'/>
      <Footer/>
    </div>
  );
}