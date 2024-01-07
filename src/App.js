import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login.jsx"
import CreateProduct from './pages/CreateProduct.jsx';
import ManageProduct from './pages/ManageProduct.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import ProductInList from './pages/ProductInList.jsx';


import { ChakraProvider, extendBaseTheme, theme as chakraTheme } from '@chakra-ui/react'
import ManageProduct from './pages/ManageProduct.jsx';

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
    <Router>
      <ChakraProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/createProduct" element={<CreateProduct />} />
          <Route path="/manage-product" element={<ManageProduct />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/product-in-list" element={<ProductInList />} />
          {/* <Route path="/user-cart" element={<UserCart />} /> */}
        </Routes>
      </ChakraProvider>
    </ Router>
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
