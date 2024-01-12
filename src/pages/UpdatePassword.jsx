import React from 'react';
import AuthForm from "../components/AuthForm/AuthForm";
import { useNavigate } from 'react-router-dom';


export default function UpdatePassword() {

    // const navigate = useNavigate();

    // const handleAuthSubmit = data => {
    //      navigate('/login');
    //   };

  return (
    <div>
      <AuthForm scenario='forgot-password'/>
    </div>
  );
}
