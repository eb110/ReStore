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
import { Product } from "../../app/models/product";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { convertToPounds } from "../../app/util/util";
import { useStoreContext } from "../../app/context/StoreContext";
import { LoadingButton } from "@mui/lab";
import { Basket } from "../../app/models/basket";

export default function ProductDetails() {
  const { basket, setBasket, removeItem } = useStoreContext();

  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const item = basket?.items.find((item) => item.productId === product?.id);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (item) setQuantity(item.quantity);

    id &&
      agent.Catalog.details(+id)
        .then((product) => setProduct(product as Product))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
  }, [id, item]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const value = +event.target.value;
    if (value >= 0) setQuantity(value);
  };

  const handleUpdateCart = (): void => {
    setSubmitting(true);
    if (!item || item.quantity < quantity) {
      const updatedQuantity = item ? quantity - item?.quantity : quantity;
      product?.id &&
        agent.Basket.addItemToBasket(product?.id, updatedQuantity)
          .then((basket) => setBasket(basket as Basket))
          .catch((error) => console.log(error))
          .finally(() => setSubmitting(false));
    } else {
      const updatedQuantity = item.quantity - quantity;
      product?.id &&
        agent.Basket.removeItemFromBasket(product?.id, updatedQuantity)
          .then(() => removeItem(product.id, updatedQuantity))
          .catch((error) => console.log(error))
          .finally(() => setSubmitting(false));
    }
  };

  if (loading) return <LoadingComponent message="Loading product..." />;
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
              disabled={item?.quantity === quantity || !item && quantity === 0}
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
              onClick={handleUpdateCart}
              loading={submitting}
            >
              {item ? "Update Quantity" : "Add to Cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
