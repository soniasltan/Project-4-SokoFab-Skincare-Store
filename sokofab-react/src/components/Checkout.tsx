import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const Checkout = () => {
  return (
    <>
    <Container sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <Typography variant="h5" align="center" sx={{ mt: "1em" }}>
        Thank you for your order!
      </Typography>
      <Button href="/" variant="contained" sx={{ mt: 3, mb: 2, mx: "auto", textAlign: "center"}}>
        Return to homepage
      </Button>
    </Container>
    </>
  );
};

export default Checkout;
 