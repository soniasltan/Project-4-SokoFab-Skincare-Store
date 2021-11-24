export type ProductsType = {
    id: number;
    name: string;
    brand: string;
    category: number;
    price: number;
    description: string;
    image: string;
    ingredients: string;
    in_stock: boolean;
    slug: string;
    quantity: number;
    comments: string[];
}

export type AccountType = {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
}