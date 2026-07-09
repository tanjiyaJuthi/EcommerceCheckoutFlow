import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);

    const addToCart = (course) => {
        if (!cart) {
            setCart({
                ...course,
                quantity: 1
            });

            toast.success("Added to cart!");
            return;
        }

        if (cart.id === course.id) {
            setCart({
                ...cart,
                quantity: cart.quantity + 1
            });

            toast.success("Cart updated!");
        } else {
            toast.warning("Can not add more than one course!");
        }
    };

    const increase = () => {
        setCart({
            ...cart,
            quantity: cart.quantity + 1
        });
    };

    const decrease = () => {
        if (cart.quantity === 1) {
            setCart(null);
            toast.info("Cart Empty");
            return;
        }

        setCart({
            ...cart,
            quantity: cart.quantity - 1
        });
    };

    const removeFromCart = () => {
        setCart(null);
        toast.success("Course removed from cart!");
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                increase,
                decrease,
                removeFromCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;