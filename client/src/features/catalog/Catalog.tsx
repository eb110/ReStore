import { useEffect } from "react";
import ProductList from "./ProductList";
import LoadingComponent from "../../app/layout/LoadingComponent";
import NotFound from "../../app/errors/NotFound";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const dispatch = useAppDispatch();
  const {status, productsLoaded} = useAppSelector(state => state.catalog);

  useEffect(() => {
    if(!productsLoaded) void dispatch(fetchProductsAsync());
  }, [dispatch, productsLoaded]);

  if (status === 'pendingFetchProducts') return <LoadingComponent message='Loading products...'/>
  if (!products) return <NotFound />

  return <>{products && <ProductList products={products} />}</>;
}
