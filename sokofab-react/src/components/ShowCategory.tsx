import { useState, useEffect } from "react";
import {useParams} from "react-router-dom"
import axios from "axios";
import { baseURL } from "../axiosCtrl";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ProductsType } from "./Types";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ShowCategory = () => {
  let { categoryname } = useParams()
  const [status, setStatus] = useState<string>("idle");
  const [products, setProducts] = useState<ProductsType[]>([]);

  useEffect(() => {
    const fetchCatProducts = async () => {
      setStatus("pending");
      const res = await axios.get(`${baseURL}/category/${categoryname}/`);
      const data: ProductsType[] = res.data;
      setStatus("resolved");
      setProducts(data);
    };
    fetchCatProducts();
  }, [categoryname]);
  console.log(products);

  let cards = products.map((product) => {
    return (
      <Grid item key={product.id} xs={8} sm={6} md={4} justifyContent="center">
        <Card sx={{ height: "100%", maxWidth: "270px", display: "flex", flexDirection: "column"}}>
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
            All {categoryname}
          </Typography>
        {status === "pending" ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress size={80} sx={{ margin: "25% auto" }} />
          </Box>
        ) : (
          <>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Grid container spacing={3} justifyContent="center" flexWrap="wrap" sx={{margin: "0 auto"}}>
            {cards}
          </Grid>
        </Container>
        </>
        )}
      </div>
    </>
  );
};

export default ShowCategory;
