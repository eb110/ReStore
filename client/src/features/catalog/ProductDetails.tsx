import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { convertToPounds } from "../../app/util/util";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  addBasketItemAsync,
  removeBasketItemAsync,
} from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails() {
  const { basket, status } = useAppSelector((state) => state.basket);
  const { status: productStatus } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, +id!)
  );
  const [quantity, setQuantity] = useState<number>(0);
  const item = basket?.items.find((item) => item.productId === product?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    if (!product) void dispatch(fetchProductAsync(+id!));
  }, [dispatch, id, item, product]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = +event.target.value;
    if (value >= 0) setQuantity(value);
  };

  const handleUpdateCart = (): void => {
    if (!item || item.quantity < quantity) {
      const updatedQuantity = item ? quantity - item?.quantity : quantity;
      void dispatch(
        addBasketItemAsync({
          productId: product.id,
          quantity: updatedQuantity,
        })
      );
    } else {
      const updatedQuantity = item.quantity - quantity;
      void dispatch(
        removeBasketItemAsync({
          productId: product.id,
          quantity: updatedQuantity,
        })
      );
    }
  };

  if (productStatus === "pendingFetchProduct")
    return <LoadingComponent message="Loading product..." />;
  if (!product) return <NotFound />;

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color={"secondary"}>
          {convertToPounds(product.price)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in Cart"
              fullWidth
              value={quantity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              disabled={
                item?.quantity === quantity || (!item && quantity === 0)
              }
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
              onClick={handleUpdateCart}
              loading={status.includes(
                "pending"
              )}
            >
              {item ? "Update Quantity" : "Add to Cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
