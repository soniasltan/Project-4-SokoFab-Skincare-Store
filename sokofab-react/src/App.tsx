import React from 'react';
import {Routes, Route, Link} from "react-router-dom"
import CssBaseline from "@mui/material/CssBaseline";
import ProductsList from './components/ProductsList'
import {createTheme, ThemeProvider} from "@mui/material/styles"
import Navbar from './components/Navbar'

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
      <Route path="/" element={<Welcome />} />
      <Route path="/products" element={<ProductsList />} />
        <Route path=":productname"/>
      </Routes>
    </div>
    </ThemeProvider>
    </>
  );
}

export default App;
