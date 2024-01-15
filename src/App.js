import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  Login from "./pages/Login.jsx"
import  Signup from "./pages/Signup.jsx"
import Main from "./pages/Main.jsx"
import ManageProduct from './pages/ManageProduct.jsx';
import Layout from './pages/Layout.jsx';
import UpdatePassword from './pages/UpdatePassword.jsx';
import NotFound from "./pages/NotFound.jsx";

import ProductDetail from './pages/ProductDetail.jsx';
import ProductInList from './pages/ProductInList.jsx';
import ProductList from './pages/ProductList.jsx';
import Cart from './pages/Cart.jsx';

import { ChakraProvider, extendBaseTheme, theme as chakraTheme } from '@chakra-ui/react'

const { Select, Button, ButtonGroup, Input, InputGroup, InputRightElement, MenuItem, InputLabel, FormControl } = chakraTheme.components

const theme = extendBaseTheme({
  components: {
    Select,
    Button, 
    ButtonGroup,
    Input,
    InputGroup,
    InputRightElement,
    MenuItem,
    InputLabel, 
    FormControl
  },
})



function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/main" element={<Main />}/>
          <Route path="/updatePassword" element={<UpdatePassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/product-list" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/update-product/:id" element={<ManageProduct />} />
          <Route path="/create-product" element={<ManageProduct />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/product-in-list" element={<ProductInList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ChakraProvider>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
