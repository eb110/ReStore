import { useEffect, useState } from "react";
import { Product } from "../../app/models/product"
import ProductList from "./ProductList";
import axios from 'axios';

export default function Catalog() {

    const [products, setProducts] = useState<Product[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        axios.get(`http://localhost:5000/api/products`)
            .then(response => setProducts(response.data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <h3>loading...</h3>
    if (!products) return <h3>products not found</h3>

    return (
        <>
            {products && <ProductList products={products} />}
        </>
    )
}