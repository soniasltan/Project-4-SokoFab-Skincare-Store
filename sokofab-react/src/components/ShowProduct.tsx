import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../axiosCtrl";
import { useParams } from "react-router-dom";
import { ProductsType, BagItemsType, TabPanelProps } from "./Types";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import FormControl from "@mui/material/FormControl";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    action: {
      disabledBackground: "white",
      disabled: "black",
    },
  },
});

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, height: "250px", overflow: "scroll"}}>
          <Typography variant="body2">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ShowProducts = () => {
  let { productslug } = useParams();
  const [status, setStatus] = useState<string>("idle");
  const [product, setProduct] = useState<ProductsType>();
  const [qty, setQty] = useState<number>(1);
  const [bag, setBag] = useState<BagItemsType[]>();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    const fetchProductDetail = async () => {
      setStatus("pending");
      const res = await axios.get(`${baseURL}/products/${productslug}/`);
      const data: ProductsType = res.data;
      setStatus("resolved");
      setProduct(data);
    };
    fetchProductDetail();
  }, [productslug]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleIncrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (product?.quantity) {
      if (product?.quantity > qty + 1) {
        setQty(qty + 1);
      }
    }
  };

  const handleDecrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (qty >= 1) {
      setQty(qty - 1);
    }
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (bag && product) {
      setBag([
        ...bag,
        {
          name: product.name,
          brand: product.brand,
          image: product.image,
          price: product.price,
          quantity: qty,
        },
      ]);
    } else if (product) {
      setBag([
        {
          name: product.name,
          brand: product.brand,
          image: product.image,
          price: product.price,
          quantity: qty,
        },
      ]);
    }
    console.log("bag", bag);
    localStorage.setItem("bagItems", JSON.stringify(bag));
  };

  console.log("product", product);

  return (
    <>
      {status === "pending" ? (
        "Loading item details"
      ) : (
        <>
          <Grid container component="main" sx={{ height: "80vh" }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: `url(${product?.image})`,
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  <strong>{product?.brand.toUpperCase()}</strong>
                </Typography>
                <Typography component="h2" variant="h5">
                  {product?.name}
                </Typography>
                <Typography component="h6" variant="subtitle1">
                  ${product?.price}
                </Typography>
                {!product?.quantity ? (
                  <Button disabled variant="contained">
                    OUT OF STOCK
                  </Button>
                ) : (
                  <>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <ButtonGroup
                        size="small"
                        aria-label="small outlined button group"
                      >
                        <Button variant="contained" onClick={handleIncrement}>
                          +
                        </Button>
                        <ThemeProvider theme={theme}>
                          <Button disabled>{qty}</Button>
                        </ThemeProvider>
                        {qty === 1 ? (
                          <Button
                            disabled
                            variant="contained"
                            onClick={handleDecrement}
                          >
                            -
                          </Button>
                        ) : (
                          <Button variant="contained" onClick={handleDecrement}>
                            -
                          </Button>
                        )}
                      </ButtonGroup>
                      <Button variant="contained" onClick={handleSubmit}>
                        ADD TO BAG
                      </Button>
                    </FormControl>
                  </>
                )}
              </Box>
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleTabChange}
                    centered
                  >
                    <Tab label="Description" {...a11yProps(0)} />
                    <Tab label="Ingredients" {...a11yProps(1)} />
                    <Tab label="Reviews" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  {product?.description}
                </TabPanel>
                <TabPanel value={value} index={1}>
                  {product?.ingredients.toUpperCase()}
                </TabPanel>
                <TabPanel value={value} index={2}>
                  Reviews here sigh
                </TabPanel>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default ShowProducts;
