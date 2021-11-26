import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductsType } from "./Types";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const Bag = () => {
  const [status, setStatus] = useState<string>("idle");
  const bagItems = JSON.parse(localStorage.getItem("bagItems")!);
  let navigate = useNavigate();

  const clearCart = () => {
    localStorage.clear();
    window.location.reload();
  };

  let orderPrice = 0;
    for (let i = 0; i < bagItems?.length; i++) {
      let itemPrice = bagItems[i]?.quantity * bagItems[i]?.price;
      orderPrice = orderPrice + itemPrice;
    }
    console.log(orderPrice);

  const totalItems = bagItems
    ?.map((item: ProductsType) => item.quantity)
    ?.reduce((a: number, c: number) => {
      return a + c;
    }, []);


    let products = bagItems?.map((item: ProductsType, index: number) => {
      return (
        <Grid item xs={12} md={6}> 
          <Card sx={{ display: "flex" }}>
            <CardMedia
              component="img"
              sx={{ width: 160, display: { xs: "none", sm: "block" } }}
              image={item?.image}
              alt={item?.slug}
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
                {item?.brand} - {item?.name}
              </Typography>
              <Typography variant="h6" paragraph sx={{ mb: -1 }}>
                Qty: {item.quantity}
              </Typography>
              <Typography variant="h6" paragraph>
                Price: ${item.price * item.quantity}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    });
  return (
    <>
      <Typography variant="h5" align="center" sx={{ mt: "1em" }}>
        Shopping Bag
      </Typography>
      {(!bagItems || bagItems.length) === 0 ? (
        <>
        <Container sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <Typography variant="body1" align="center" sx={{ mt: "1em" }}>
          No products currently in bag!
        </Typography>
        <Button
          href="/products"
          variant="contained"
          sx={{ m: 1, mb: 2 }}
        >
          Back to Products
        </Button>
        </Container>
      </>
      ) : (
        <>
          <Box
            component={Paper}
            square
            sx={{
              width: "50%",
              mx: "auto",
              mt: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid container spacing={4}>
              {products}
            </Grid>
          </Box>
          <Box
            component={Paper}
            square
            sx={{
              width: "50%",
              mx: "auto",
              mt: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {totalItems === 1 ? (
              <>
                <Typography variant="h5" align="center" sx={{ mt: "1em" }}>
                  Order Subtotal for (1) Product:
                </Typography>
                <Typography variant="h5" align="center" sx={{ mt: "1em" }}>
                  ${orderPrice}
                </Typography>
                <Button
                  href="/checkout"
                  variant="contained"
                  sx={{ m: 1, mb: 2 }}
                >
                  Check out
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="inherit"
                  onClick={clearCart}
                >
                  Clear cart
                </Button>
              </>
            ) : (
              <>
                <Typography variant="h5" align="center" sx={{ mt: "1em" }}>
                  Order Subtotal for ({totalItems}) Products:
                </Typography>
                <Typography variant="h5" align="center" sx={{ mt: "1em" }}>
                  ${orderPrice}
                </Typography>
                <Button
                  href="/checkout"
                  variant="contained"
                  sx={{ m: 1, mb: 2 }}
                >
                  Check out
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="inherit"
                  onClick={clearCart}
                >
                  Clear cart
                </Button>
              </>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default Bag;
