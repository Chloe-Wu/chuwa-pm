import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  Login from "./pages/Login.jsx"
import CreateProduct from './pages/CreateProduct.jsx';
import ProductList from './pages/ProductList.jsx';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/createProduct" element={<CreateProduct />} />
                <Route path="/products" element={<ProductList />} />
            </Routes>
        </Router>
    );
}

export default App;
