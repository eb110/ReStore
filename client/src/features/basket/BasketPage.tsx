import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";
import { useState } from "react";
import agent from "../../app/api/agent";
import { Basket } from "../../app/models/basket";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { convertToPounds } from "../../app/util/util";
import { Link } from "react-router-dom";

export default function BasketPage() {
  const { basket, setBasket, removeItem } = useStoreContext();
  const [status, setStatus] = useState({
    loading: false,
    name: "",
  });

  if (!basket)
    return <Typography variant="h3">Your basket is empty</Typography>;

  const increaseQuantity = (productId: number, name: string): void => {
    setStatus({ loading: true, name });
    agent.Basket.addItemToBasket(productId, 1)
      .then((basket) => setBasket(basket as Basket))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: true, name: "" }));
  };

  const decreaseQuantity = (
    productId: number,
    name: string,
    quantity = 1
  ): void => {
    setStatus({ loading: true, name });
    agent.Basket.removeItemFromBasket(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: true, name: "" }));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((basketItem) => (
              <TableRow
                key={basketItem.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img
                      src={basketItem.pictureUrl}
                      alt={basketItem.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{basketItem.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {convertToPounds(basketItem.price)}
                </TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={
                      status.loading &&
                      status.name === `decrease${basketItem.productId}`
                    }
                    color="error"
                    onClick={() =>
                      decreaseQuantity(
                        basketItem.productId,
                        `decrease${basketItem.productId}`
                      )
                    }
                  >
                    <Remove />
                  </LoadingButton>
                  {basketItem.quantity}
                  <LoadingButton
                    loading={
                      status.loading &&
                      status.name === `add${basketItem.productId}`
                    }
                    color="secondary"
                    onClick={() =>
                      increaseQuantity(
                        basketItem.productId,
                        `add${basketItem.productId}`
                      )
                    }
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  {convertToPounds(basketItem.price * basketItem.quantity)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={
                      status.loading &&
                      status.name === `remove${basketItem.productId}`
                    }
                    color="error"
                    onClick={() =>
                      decreaseQuantity(
                        basketItem.productId,
                        `remove${basketItem.productId}`,
                        basketItem.quantity
                      )
                    }
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary basketItems={basket.items} />
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
