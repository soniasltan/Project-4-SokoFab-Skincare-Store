import {useState, useEffect} from "react"
import axios from "axios"
// import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

type ProductsType = {
    id: number;
    name: string;
    brand: string;
    type: string;
    price: number;
    description: string;
    image: string;
    ingredients: string;
}

const URL = process.env.REACT_APP_AXIOS_BASEURL

const ShowProducts = () => {
    const [status, setStatus] = useState<string>("idle");
    const [products, setProducts] = useState<ProductsType[]>([])

    useEffect(() => {
        const fetchProducts = async () => {
            setStatus("pending");
            const res = await axios.get(URL + "/products/")
            const data: ProductsType[] = res.data
            setStatus("resolved");
            setProducts(data)
        }
        fetchProducts()
    }, [])
    console.log(products)

let cards = products.map((product) => {
    return (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            {/* <Link to={"/products/" + product.name} style={{ color: "black" }}> */}
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
            {/* </Link> */}
          </Card>
        </Grid>
      );
    });

return (
        <>
        <div className="results">
        <p>{status === "pending" ? "Loading products..." : ""}</p>
        <Container maxWidth="lg" sx={{ mt: 7 }}>
          <Grid container spacing={4}>
            {cards}
          </Grid>
        </Container>
      </div>
        </>
    )
}

export default ShowProducts