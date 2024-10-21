
'use client';
import { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';


const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('cart', []);
  const [user, setUser] = useLocalStorage('user', null);

  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.asin === product.asin);
      if (existingItem) {
        return prevCart.map((item) =>
          item.asin === product.asin
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, [setCart]);

  const removeFromCart = useCallback((asin) => {
    setCart((prevCart) => prevCart.filter((item) => item.asin !== asin));
  }, [setCart]);

  const updateQuantity = useCallback((asin, newQuantity) => {
    // set min quantity to 1
    if (newQuantity < 1) {
      
      newQuantity = 1;
    }

    // set max quantity to 10
    if (newQuantity > 10) {
      newQuantity = 10;
    }

    // when quantity is 0, remove the item from the cart
    // if (newQuantity === 0) {
    //   removeFromCart(asin);
    //   return;
    // }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.asin === asin ? { ...item, quantity: newQuantity } : item
      )
    );
  }, [setCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  const login = useCallback((userData) => {
    setUser(userData);
  }, [setUser]);

  const logout = useCallback(() => {
    setUser(null);
    clearCart();
  }, [setUser, clearCart]);

   
  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      user,
      login,
      logout,
      setUser
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
