import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../app/context/StoreContext";
import { Basket } from "../../app/models/basket";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { convertToPounds } from "../../app/util/util";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { setBasket } = useStoreContext();
  const [loading, setLoading] = useState(false);

  const handleAddItem = (productId: number): void => {
    setLoading(true);
    agent.Basket.addItemToBasket(productId)
      .then((basket) => setBasket(basket as Basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  if (loading) return <LoadingComponent message='Adding item...'/>

  return (
    <>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "secondary.main" }}>
              {product.name.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={product.name}
          titleTypographyProps={{
            sx: { fontWeight: "bold", color: "primary.main" },
          }}
        />
        <CardMedia
          sx={{
            height: 140,
            backgroundSize: "contain",
            bgcolor: "primary.light",
          }}
          image={product.pictureUrl}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom color="secondary" variant="h5">
            {convertToPounds(product.price)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.type}
          </Typography>
        </CardContent>
        <CardActions>
          <LoadingButton
            loading={loading}
            onClick={() => handleAddItem(product.id)}
            size="small"
          >
            Add to cart
          </LoadingButton>
          <Button component={Link} to={`/catalog/${product.id}`} size="small">
            View
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
