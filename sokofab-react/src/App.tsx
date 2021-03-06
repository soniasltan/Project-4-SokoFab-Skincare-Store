import React from 'react';
import {Routes, Route} from "react-router-dom"
import CssBaseline from "@mui/material/CssBaseline";
import ProductsList from './components/ProductsList'
import {createTheme, ThemeProvider} from "@mui/material/styles"
import Header from './components/Header'
import Login from './components/Login'
import Logout from "./components/Logout"
import Signup from './components/Signup'
import ShowProduct from "./components/ShowProduct"
import MyAccount from "./components/MyAccount"
import SearchProducts from "./components/SearchProducts"
import Bag from "./components/Bag"
import Home from "./components/Home"
import ShowCategory from './components/ShowCategory';
import Checkout from "./components/Checkout"
import ShowBrand from "./components/ShowBrand"


function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#005f73",
      },
      secondary: {
        main: "#ffadad",
      }
    }
  })

  const sections = [
    { title: 'All Products', url: "/products" },
    { title: 'Cleansers', url: "/category/Cleansers" },
    { title: 'Moisturizers', url: "/category/Moisturizers" },
    { title: 'Masks', url: "/category/Masks" },
    { title: 'Suncare', url: "/category/Suncare" },
  ];

  return (
    <>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <div className="App">
      <Header title="SOKO FAB" sections={sections}/>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductsList />} />
      <Route path="/products/:productslug" element={<ShowProduct />} />
      <Route path="/category/:categoryname" element={<ShowCategory />}/>
      <Route path="/brands/:brandname" element={<ShowBrand />}/>
      <Route path="/search/" element={<SearchProducts />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/account" element={<MyAccount />} />
      <Route path="/bag" element={<Bag />}/>
      <Route path="/checkout" element={<Checkout />}/>
      </Routes>
    </div>
    </ThemeProvider>
    </>
  );
}

export default App;