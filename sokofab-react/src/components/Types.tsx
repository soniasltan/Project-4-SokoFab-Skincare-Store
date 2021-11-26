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

export type BagItemsType = {
    id: number;
    name: string;
    brand: string;
    image: string;
    price: number;
    quantity: number;
}

export type TabPanelProps = {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

export type HeaderProps = {
    sections: ReadonlyArray<{
        title: string;
        url: string;
      }>;
      title: string;
}
