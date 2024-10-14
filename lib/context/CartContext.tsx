"use client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { CartContextType, CartItem } from "../types/types";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	useEffect(() => {
		const storedCart = localStorage.getItem("cartItems");
		if (storedCart) {
			setCartItems(JSON.parse(storedCart));
		}
	}, []);

	// Save cart items to localStorage whenever the cartItems state changes
	useEffect(() => {
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
	}, [cartItems]);

	const addToCart = (item: CartItem) => {
		setCartItems([...cartItems, item]);
	};

	const removeFromCart = (id: number) => {
		setCartItems(cartItems.filter((item) => item.id !== id));
	};

	return (
		<CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
			{children}
		</CartContext.Provider>
	);
};
