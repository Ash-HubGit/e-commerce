import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2";

const initialState = {
  cart: [],
  cartItemCount: () => 0,
  addToCart: () => null,
  removeFromCart: () => null,
  increaseQuantity: () => null,
  decreaseQuantity: () => null,
};

const CartContext = createContext(initialState);

const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(initialState.cart);

  const cartItemCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const addToCart = (product) => {
    const productIdx = cart.findIndex((item) => item.product.id === product.id);
    if (productIdx !== -1) {
      increaseQuantity(product.id);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "The product added to your basket!",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.product.id !== productId));
  };

  const increaseQuantity = (productId) => {
    const copy = cart.slice();
    const productIdx = copy.findIndex((item) => item.product.id === productId);
    if (productIdx !== -1) {
      copy[productIdx].quantity += 1;
      setCart(copy);
    }
  };

  const decreaseQuantity = (productId) => {
    const copy = cart.slice();
    const productIdx = copy.findIndex((item) => item.product.id === productId);
    if (productIdx !== -1 && copy[productIdx].quantity > 1) {
      copy[productIdx].quantity -= 1;
      setCart(copy);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItemCount,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { useCart, CartProvider };
