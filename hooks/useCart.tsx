import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number,
    cartProducts: CartProductType[] | null
    handleAddProductToCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleQtyIncrease: (product: CartProductType) => void;
    handleQtyDecrease: (product: CartProductType) => void;
    handleClearCart: () => void;

};

export const CartContext = createContext<CartContextType | null>(null);

interface Props{
    [propName: string]: any;
}

export const CartContextProvider = (props:Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);
    useEffect(() =>{
        const cartItems: any = localStorage.getItem('ShopifyCartItems');
        const cProducts: CartProductType[] | null = JSON.parse(cartItems)

        setCartProducts(cProducts)
    },[])
    const handleAddProductToCart = useCallback((product: CartProductType) =>{
            setCartProducts((prev)=>{
                let updatedCart;

                if(prev){
                    updatedCart = [...prev, product]
                }else{
                    updatedCart = [product]
                }

                toast.success("Product Added to Cart")
                localStorage.setItem('ShopifyCartItems', JSON.stringify(updatedCart));

                return updatedCart;
            })
    },[]);

    const handleRemoveProductFromCart = useCallback((
        product: CartProductType
    ) => {
        if(cartProducts){
            const filteredProducts = cartProducts.filter((item) => {return item.id != product.id})
            setCartProducts(filteredProducts)
            toast.success("Product removed from Cart")
            localStorage.setItem('ShopifyCartItems', JSON.stringify(filteredProducts));
            
        }
    }, [cartProducts]
    );

    const handleQtyIncrease = useCallback((product: CartProductType) => {
        let updatedCart;
        if(product.quantity === 99)
    {
        return toast.error('ooops! Maximum Reached');
    }
       if(cartProducts){
        updatedCart = [...cartProducts]
        const existingindex = cartProducts.findIndex((item) => item.id === product.id);
        if(existingindex > -1){
            updatedCart[existingindex].quantity = ++updatedCart[existingindex].quantity;
        }
        setCartProducts(updatedCart)
        localStorage.setItem('ShopifyCartItems', JSON.stringify(updatedCart))
       }

    }, [cartProducts]);

    const handleQtyDecrease = useCallback((product: CartProductType) => {
        let updatedCart;
        if(product.quantity === 1)
    {
        return toast.error('ooops! Minimum Reached');
    }
       if(cartProducts){
        updatedCart = [...cartProducts]
        const existingindex = cartProducts.findIndex((item) => item.id === product.id);
        if(existingindex > -1){
            updatedCart[existingindex].quantity = --updatedCart[existingindex].quantity;
        }
        setCartProducts(updatedCart)
        localStorage.setItem('ShopifyCartItems', JSON.stringify(updatedCart))
       }

    }, [cartProducts]);

    const handleClearCart = useCallback(() => {
        setCartProducts(null)
        setCartTotalQty(0)
        localStorage.setItem('ShopifyCartItems', JSON.stringify(null));

    }, [cartProducts]);
    

    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleQtyIncrease,
        handleQtyDecrease,
        handleClearCart,
    };
    return <CartContext.Provider value={value} {...props}/>
};


export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartContextProvider");
    }
    return context;
}