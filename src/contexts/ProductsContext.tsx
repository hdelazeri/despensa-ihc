import {createContext, ReactNode, useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

type Product = {
    code: string
    name: string
    quantity: number
    image: string
    addedDate: Date
}

type ProductsContextData = {
    products: Product[];
    addProduct: (product: Product) => void;
    addProducts: (products: Product[]) => void;
    removeProduct: (product: Product) => Promise<boolean>;
    deleteProduct: (product: Product) => void;
}

type ProductsProviderProps = {
    children: ReactNode;
}

export const ProductsContext = createContext({} as ProductsContextData);

export function ProductsProvider({children}: ProductsProviderProps) {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function loadProducts() {
            const products = await AsyncStorage.getItem('@products');
            if (products) {
                setProducts(JSON.parse(products));
            }
        }

        loadProducts();
    }, []);

    async function updateProducts(products: Product[]) {
        const sortedProducts = products.sort((a, b) => a.addedDate.getTime() - b.addedDate.getTime())

        setProducts(sortedProducts);

        const jsonValue = JSON.stringify(sortedProducts)
        await AsyncStorage.setItem('@products', jsonValue)
    }

    async function addProducts(newProducts: Product[]) {
        const productsCopy = [...products];

        newProducts.forEach(product => {
            const idx = productsCopy.findIndex(p => p.code === product.code);

            if (idx === -1) {
                product.addedDate = new Date();
                productsCopy.push(product);
            } else {
                productsCopy[idx].quantity += product.quantity;
                productsCopy[idx].addedDate = new Date();
            }
        });

        await updateProducts(productsCopy);
    }

    async function addProduct(product: Product) {
        product.addedDate = new Date();

        const idx = products.findIndex(p => p.code === product.code);

        if (idx === -1) {
            await updateProducts([...products, product]);
        } else {
            const existing = products[idx];
            existing.quantity += product.quantity;
            existing.addedDate = new Date();
            await updateProducts([...products.slice(0, idx), existing, ...products.slice(idx + 1)]);
        }
    }

    async function removeProduct(product: Product) {
        const idx = products.findIndex(p => p.code === product.code);

        if (idx !== -1) {
            if (products[idx].quantity > 1) {
                const existing = products[idx];
                existing.quantity -= 1;
                await updateProducts([...products.slice(0, idx), existing, ...products.slice(idx + 1)]);
                return false;
            } else {
                await updateProducts([...products.slice(0, idx), ...products.slice(idx + 1)]);
                return true;
            }
        }

        return false;
    }

    async function deleteProduct(product: Product) {
        const idx = products.findIndex(p => p.code === product.code);

        if (idx !== -1) {
            await updateProducts([...products.slice(0, idx), ...products.slice(idx + 1)]);
        }
    }

    return <ProductsContext.Provider value={{products, addProduct, addProducts, removeProduct, deleteProduct}}>
        {children}
    </ProductsContext.Provider>
}