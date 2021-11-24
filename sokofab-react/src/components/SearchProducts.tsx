import * as React from "react"
import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"
import {baseURL} from "../axiosCtrl"
import { ProductsType } from "./Types"
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const SearchProducts = () => {
    let {keyword} = useParams()
    const [status, setStatus] = useState<string>("idle");
    const [products, setProducts] = useState<ProductsType[]>([])

    useEffect(() => {
        const fetchSearch = async () => {
            setStatus("pending");
            const res = await axios.get(baseURL + "/products/search?keyword="+ keyword)
            const data: ProductsType[] = res.data
            setStatus("resolved");
            setProducts(data)
        }
        fetchSearch()
    }, [keyword])
    console.log(products)

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
    return(
        <>
        <div className="results">
        <p>{status === "pending" ? "Searching products..." : ""}</p>
        <Container maxWidth="lg" sx={{ mt: 7 }}>
          <Grid container spacing={4}>
            {cards}
          </Grid>
        </Container>
      </div>
        </>
    )
}

export default SearchProducts