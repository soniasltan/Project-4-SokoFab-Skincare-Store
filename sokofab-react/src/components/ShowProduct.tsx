import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../axiosCtrl";
import { useParams, useNavigate } from "react-router-dom";
import { ProductsType, BagItemsType, TabPanelProps } from "./Types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

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
        <Box sx={{ p: 3, height: "250px", overflow: "scroll" }}>
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
  let navigate = useNavigate()
  const [status, setStatus] = useState<string>("idle");
  const [product, setProduct] = useState<ProductsType>();
  const [qty, setQty] = useState<number>(1);
  const [bag, setBag] = useState([] as BagItemsType[])
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

  const handleSelect = (event: SelectChangeEvent) => {
    setQty(parseInt(event.target.value))
  };

  const handleSubmit = () => {
    if (product) {
        const exists = bag.find(item => item.id === product.id)
        if (exists) {
          setBag(bag.map(item =>
            item.id === product.id ? {...exists, quantity: exists.quantity + qty}
            : item))
        } else {
          setBag([...bag, {...product, quantity: qty}])
        }
      }
};
localStorage.setItem("bagItems", JSON.stringify(bag))

  return (
    <>
      {status === "pending" ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress size={80} sx={{ margin: "20% auto" }} />
        </Box>
      ) : (
        <>
          <Box
            component={Paper}
            square
            sx={{
              width: "90%",
              mx: "auto",
              mt: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Link href={"/brands/"+product?.brand} underline="none">
            <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
              <strong>{product?.brand.toUpperCase()}</strong>
            </Typography>
              </Link>
            <Typography component="h2" variant="h5">
              {product?.name}
            </Typography>
            <Typography component="h6" variant="subtitle1">
              ${product?.price}
            </Typography>
            <img height="250px" src={product?.image} alt={product?.slug} />
            {!product?.quantity ? (
              <Button disabled variant="contained" sx={{ m: 1, mb: 2 }}>
                OUT OF STOCK
              </Button>
            ) : (
              <>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    value={qty.toString()}
                    onChange={handleSelect}
                    displayEmpty
                    sx={{height:"36.5px"}}
                  >
                    {[...Array(product?.quantity).keys()].map((x) => (
                      <MenuItem key={x + 1} value={x + 1}>
                        {x + 1}
                      </MenuItem>
                    ))}
                  </Select>
                  <Button
                    variant="contained"
                    sx={{ mb: 2, mt: 1 }}
                    onClick={handleSubmit}
                  >
                    ADD TO BAG
                  </Button>
                </FormControl>
              </>
            )}
          </Box>
          <Box component={Paper} square sx={{ width: "90%", margin: "0 auto" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={value} onChange={handleTabChange} centered>
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
        </>
      )}
    </>
  );
};

export default ShowProducts;
