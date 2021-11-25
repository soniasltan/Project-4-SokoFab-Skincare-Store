import React from 'react';
import {Routes, Route} from "react-router-dom"
import CssBaseline from "@mui/material/CssBaseline";
import ProductsList from './components/ProductsList'
import {createTheme, ThemeProvider} from "@mui/material/styles"
import Navbar from './components/Navbar'
import Login from './components/Login'
import Logout from "./components/Logout"
import Signup from './components/Signup'
import ShowProduct from "./components/ShowProduct"
import MyAccount from "./components/MyAccount"
import SearchProducts from "./components/SearchProducts"


function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#caffbf",
      },
      secondary: {
        main: "#ffadad",
      }
    }
  })

  const Welcome = () => {
    return (
      <h1>Welcome to Soko Fab</h1>
    )
  }
  return (
    <>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <div className="App">
      <Navbar />
      <Routes>
      <Route path="/" element={<ProductsList />} />
      <Route path="/products" element={<ProductsList />} />
      <Route path="/products/:productslug" element={<ShowProduct />} />
      <Route path="/search/" element={<SearchProducts />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/account" element={<MyAccount />} />
      </Routes>
    </div>
    </ThemeProvider>
    </>
  );
}

export default App;
