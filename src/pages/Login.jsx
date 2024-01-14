import React from 'react';
import axios from 'axios';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleAuthSubmit = async (formData) => {
    const { scenario, email, password } = formData;

    try {
      if (scenario === 'login' || scenario === 'signup') {
        const response = await axios.post(`http://localhost:3000/api/${scenario}`, {
          email,
          password,
        });

        const { id, token, admin } = response.data;

        // Save user data and token to localStorage
        localStorage.setItem('user', JSON.stringify({ email, admin, password, id }));
        localStorage.setItem('token', token);

        // Redirect to ProductList after successful login with user data
        navigate('/products');
      }
    } catch (error) {
      console.error(`Error during ${scenario}:`, error.message);
    }
  };

  return (
      <div>
        <AuthForm onAuthSubmit={handleAuthSubmit} />
      </div>
  );
};

export default Login;
