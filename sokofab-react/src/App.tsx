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
    { title: 'Cleansers', url: '#' },
    { title: 'Moisturizers', url: '#' },
    { title: 'Masks', url: '#' },
    { title: 'Suncare', url: '#' },
  ];

  return (
    <>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <div className="App">
      <Header title="SOKO FAB" sections={sections}/>
      <Routes>
      <Route path="/" element={<ProductsList />} />
      <Route path="/products" element={<ProductsList />} />
      <Route path="/products/:productslug" element={<ShowProduct />} />
      <Route path="/search/" element={<SearchProducts />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/account" element={<MyAccount />} />
      <Route path="/bag" element={<Bag />}/>
      </Routes>
    </div>
    </ThemeProvider>
    </>
  );
}

export default App;