import * as React from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { styled, alpha } from "@mui/material/styles";
import { NavPage } from "./NavbarStyle";
import InputBase from "@mui/material/InputBase";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const Search = styled("form")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Navbar = () => {
  const [keyword, setKeyword] = useState("");
  let navigate = useNavigate();
  let loggedIn = localStorage.getItem("access_token")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (keyword) {
      navigate("/search/?keyword=" + keyword);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <NavPage>
            <NavLink to="/">
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, textDecoration: "none" }}
              >
                Soko Fab
              </Typography>
            </NavLink>
          </NavPage>
          <NavPage>
            <NavLink to="/products">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Products
              </Typography>
            </NavLink>
          </NavPage>
          <Search onSubmit={handleSubmit}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleChange}
            />
          </Search>
          {loggedIn ? (
            <>
              <Link to={"/account"}>
                <Button color="inherit">Account</Button>
              </Link>
              <Link to={"/logout"}>
                <Button color="inherit">Log out</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to={"/signup"}>
                <Button color="inherit">Sign Up</Button>
              </Link>
              <Link to={"/login"}>
                <Button color="inherit">Login</Button>
              </Link>
            </>
          )}
          <Link to={"/bag"}>
                <Button color="inherit" startIcon={<ShoppingBagIcon />}>Bag</Button>
              </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
