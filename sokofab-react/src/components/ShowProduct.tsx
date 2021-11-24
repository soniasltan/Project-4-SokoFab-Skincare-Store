import * as React from 'react'
import {useState, useEffect} from "react"
import axios from "axios"
import {baseURL} from "../axiosCtrl"
import {useParams} from 'react-router-dom'
import { ProductsType } from './Types'
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const ShowProducts = () => {
    let {productslug} = useParams()
    const [status, setStatus] = useState<string>("idle");
    const [product, setProduct] = useState<ProductsType>()

    useEffect(() => {
        const fetchProductDetail = async () => {
            setStatus("pending");
            const res = await axios.get(`${baseURL}/products/${productslug}/`)
            const data: ProductsType = res.data
            setStatus("resolved");
            setProduct(data)
        }
        fetchProductDetail()
    }, [productslug])
    console.log(product)

    return(
        <>
        <Grid container component="main" sx={{ height: '80vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${product?.image})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              {product?.brand}
            </Typography>
            <Typography component="h2" variant="h5">
              {product?.name}
            </Typography>
          </Box>
        </Grid>
      </Grid>
        </>
    )
}

export default ShowProducts