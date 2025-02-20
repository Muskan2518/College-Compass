import React, { createContext, useContext, useState, useEffect } from 'react';

// Assuming ts_eamcet_colleges is an array of objects with 'id' and 'name' properties
// Adjust the import path as needed based on your project structure


const BookmarkContext = createContext();
const CART_KEY = 'cart';
const EMPTY_CART = { items: [] };

export function BookmarkProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem(CART_KEY);
      return storedCart ? JSON.parse(storedCart) : EMPTY_CART;
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
      return EMPTY_CART;
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addItem = (college) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: [...prevCart.items, college]
    }));
  };

  const removeItem = (id) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.filter((item) => item.id !== id)
    }));
  };

  return (
    <BookmarkContext.Provider value={{ cart, addItem, removeItem }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmark() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmark must be used within a BookmarkProvider');
  }
  return context;
}
