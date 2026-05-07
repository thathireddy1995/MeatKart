import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchCart, updateCart } from "@/lib/api";
import { toast } from "sonner";

type CartItem = {
  productId: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [phone, setPhone] = useState<string | null>(null);

  // Load user and sync periodically
  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          if (user.phone !== phone) {
            setPhone(user.phone);
            console.log("[CART] User detected:", user.phone);
          }
        } catch (e) {
          console.error("Failed to parse user", e);
        }
      } else if (phone) {
        setPhone(null);
        setItems([]);
      }
    };

    checkUser();
    const interval = setInterval(checkUser, 1000);
    return () => clearInterval(interval);
  }, [phone]);

  // Fetch cart from backend when phone is available
  useEffect(() => {
    if (phone) {
      console.log("[CART] Fetching saved items for:", phone);
      fetchCart(phone)
        .then((data) => {
          if (Array.isArray(data)) {
            setItems(data);
          }
        })
        .catch(console.error);
    }
  }, [phone]);

  // Save cart to backend whenever items change
  useEffect(() => {
    if (phone && items.length >= 0) {
      updateCart(phone, items).catch(console.error);
    }
  }, [items, phone]);

  const addToCart = (productId: string) => {
    if (!phone) {
      toast.error("Please login to add items to cart");
      return;
    }
    
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
    toast.success("Added to cart");
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const decreaseQuantity = (productId: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing && existing.quantity > 1) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prev.filter((i) => i.productId !== productId);
    });
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, decreaseQuantity, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
