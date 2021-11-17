import {useState, useEffect} from "react"

type ProductsType = {
    id: number;
    name: string;
    brand: string;
    type: string;
    price: number;
}

const ShowProducts = () => {
    const [products, setProducts] = useState<ProductsType[]>([])

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("http://localhost:8000/products/")
            const products: ProductsType[] = await response.json()
            setProducts(products)
        }
        fetchProducts()
    }, [])

    return (
        <ul>
            {products.map((product) => (
                <li key={product.id}>{product.name}</li>
            ))}
        </ul>
    )
}

export default ShowProducts