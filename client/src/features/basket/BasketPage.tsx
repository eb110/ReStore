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
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { convertToPounds } from "../../app/util/util";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";

export default function BasketPage() {
  const dispatch = useAppDispatch();

  const { basket, status } = useAppSelector((state) => state.basket);

  if (!basket)
    return <Typography variant="h3">Your basket is empty</Typography>;

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
                      status === "pendingRemoveItem" + basketItem.productId.toString() + 'rem'
                    }
                    color="error"
                    onClick={() =>
                      void dispatch(
                        removeBasketItemAsync({
                          productId: basketItem.productId,
                          quantity: 1,
                          name: 'rem'
                        })
                      )
                    }
                  >
                    <Remove />
                  </LoadingButton>
                  {basketItem.quantity}
                  <LoadingButton
                    loading={
                      status === "pendingAddItem" + basketItem.productId.toString()
                    }
                    color="secondary"
                    onClick={(): void =>
                      void dispatch(
                        addBasketItemAsync({
                          productId: basketItem.productId,
                          quantity: 1,
                        })
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
                      status ===
                      "pendingRemoveItem" +
                        basketItem.productId.toString() +
                        "del"
                    }
                    color="error"
                    onClick={() =>
                      void dispatch(
                        removeBasketItemAsync({
                          productId: basketItem.productId,
                          quantity: basketItem.quantity,
                          name: 'del'
                        })
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
          <BasketSummary />
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
