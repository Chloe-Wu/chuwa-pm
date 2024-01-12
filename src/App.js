import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  Login from "./pages/Login.jsx"
import  Signup from "./pages/Signup.jsx"
import Layout from './pages/Layout.jsx';
import UpdatePassword from './pages/UpdatePassword.jsx';
import NotFound from "./pages/NotFound.jsx";

// import CreateProduct from './pages/CreateProduct.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="productList" element={<Layout />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="updatePassword" element={<UpdatePassword />} />
      {/* </Route> */}
      <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>

  );
}

export default App;
