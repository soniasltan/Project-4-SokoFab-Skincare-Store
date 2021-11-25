import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../axiosCtrl";
import { ProductsType } from "./Types";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const SearchProducts = () => {
  const [status, setStatus] = useState<string>("idle");
  const [products, setProducts] = useState<ProductsType[]>([]);
  let location = useLocation();
  let keyword = location.search;

  const searchTerm = keyword.split("=")[1]
  const results = products.length

  useEffect(() => {
    const fetchSearch = async () => {
      setStatus("pending");
      const res = await axios.get(baseURL + "/products/search" + keyword);
      const data: ProductsType[] = res.data;
      setStatus("resolved");
      setProducts(data);
    };
    fetchSearch();
    console.log(keyword);
  }, [keyword]);
  console.log(products);

  let cards = products.map((product) => {
    return (
      <Grid item key={product.id} xs={12} sm={6} md={4}>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <Link to={"/products/" + product.slug} style={{ color: "black" }}>
            <CardMedia
              component="img"
              height="200"
              image={product.image}
              alt={product.name}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="div">
                {product.brand} {product.name}
              </Typography>
            </CardContent>
          </Link>
        </Card>
      </Grid>
    );
  });
  return (
    <>
      <div className="results">
        <Typography variant="h5" align="center" sx={{mt: "1em"}}>
            Search
          </Typography>
        {status === "pending" ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress size={80} sx={{ margin: "20% auto" }} />
          </Box>
        ) : (
        <>
        <Typography gutterBottom variant="subtitle1" align="center" component="div" sx={{paddingLeft: "1em", mt: "0.5em"}}>
            {!results ? (
                `No products found for search "${searchTerm}".`
            ) : results === 1 ? (
                `Search for "${searchTerm}" found the following product:`
            ) : (
                `Search for "${searchTerm}" found the following products:`
            )}
        </Typography>
        <Container maxWidth="lg" sx={{ mt: 7 }}>
          <Grid container spacing={4}>
            {cards}
          </Grid>
        </Container>
        </>
        )}
      </div>
    </>
  );
};

export default SearchProducts;
