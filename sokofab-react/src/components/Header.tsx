import * as React from "react";
import { useState } from "react";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { Search, SearchIconWrapper, StyledInputBase } from "./HeaderStyle";
import IconButton from "@mui/material/IconButton";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { HeaderProps } from "./Types";
import Badge from '@mui/material/Badge';

const Header = (props: HeaderProps) => {
  const { sections, title } = props;
  const [keyword, setKeyword] = useState("");
  let navigate = useNavigate();
  let loggedIn = localStorage.getItem("access_token");

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
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        {loggedIn ? (
          <>
            <Link href="/account" underline="none">
              <Button size="small" color="inherit">
                Account
              </Button>
            </Link>
            <Link href="/logout" underline="none">
              <Button size="small" color="inherit">
                Log out
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/signup" underline="none">
              <Button size="small" color="inherit">
                Sign Up
              </Button>
            </Link>
            <Link href="/login" underline="none">
              <Button size="small" color="inherit">
                Login
              </Button>
            </Link>
          </>
        )}
        <Link
          href="/"
          color="inherit"
          align="center"
          noWrap
          underline="none"
          sx={{ flex: 1 }}
          variant="h5"
        >
          <Button variant="text" sx={{fontSize: "32px", color:"black", fontWeight:"bold"}}>
            {title}
          </Button>
        </Link>
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
        <Link href="/bag" underline="none">
          <IconButton color="inherit">
            {/* <Badge badgeContent={3} color="primary"> */}
            <ShoppingBagIcon /> 
            {/* </Badge> */}
          </IconButton>
        </Link>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-around", overflowX: "auto" }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title} 
          </Link>
        ))}
      </Toolbar>
    </>
  );

};

export default Header;
