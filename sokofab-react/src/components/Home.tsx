import * as React from "react"
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";

const Home = () => {
    return (
        <>
        <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(https://img.freepik.com/free-photo/different-type-moisturizer-with-leaves-white-background_23-2147818090.jpg?size=626&ext=jpg)`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src="https://img.freepik.com/free-photo/different-type-moisturizer-with-leaves-white-background_23-2147818090.jpg?size=626&ext=jpg" alt="homepage-feature" />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.2)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              Cult-favourite skincare products curated for your needs
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              Find your next favourites today
            </Typography>
            <Link href="/products" underline="none">
            <Button size="small" color="inherit" variant="contained">
                View all products
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Paper>
        </>
    )
}

export default Home