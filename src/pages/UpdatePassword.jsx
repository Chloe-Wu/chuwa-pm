import React from 'react';
import AuthForm from "../components/AuthForm/AuthForm";
import { useNavigate } from 'react-router-dom';


export default function UpdatePassword() {
  return (
    <div>
      <AuthForm scenario='forgot-password'/>
    </div>
  );
}