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
	const [cartCount, setCartCount] = useState(0);
	const [cartTotal, setCartTotal] = useState(0);

	useEffect(() => {
		const storedCart = localStorage.getItem("cartItems");
		if (storedCart) {
			setCartItems(JSON.parse(storedCart));
		}
	}, []);

	// Save cart items to localStorage whenever the cartItems state changes
	useEffect(() => {
		localStorage.setItem("cartItems", JSON.stringify(cartItems));

		const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
		setCartCount(newCartCount);

		const newCartTotal = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price,
			0
		);
		setCartTotal(newCartTotal);
	}, [cartItems]);

	const addToCart = (productToAdd: CartItem) => {
		console.log("Adding to cart:", productToAdd);
		setCartItems((prevItems) => {
			const existingCartItem = prevItems.find((cartItem) => cartItem.id === productToAdd.id);
			console.log("Existing cart item:", existingCartItem);
			if (existingCartItem) {
				console.log("Updating quantity for:", existingCartItem);
				return prevItems.map((cartItem) =>
					cartItem.id === productToAdd.id
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				);
			}
			console.log("Adding new item to cart.");
			return [...prevItems, { ...productToAdd, quantity: 1 }];
		});
	};

	const removeFromCart = (id: number) => {
		setCartItems(cartItems.filter((item) => item.id !== id));
	};

	const clearCartItem = (cartItemToClear: CartItem) => {
		return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
	};

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addToCart,
				removeFromCart,
				clearCartItem,
				cartCount,
				cartTotal,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
