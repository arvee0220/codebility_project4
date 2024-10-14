"use client";
import ItemCard from "@/components/ItemCard";
import { ShopItem } from "@/lib/types/types";
import { useEffect, useState } from "react";

const ShopPage: React.FC = () => {
	const [shopItems, setShopItems] = useState<ShopItem[] | null>(null);
	const [cart, setCart] = useState<ShopItem[]>([]);

	useEffect(() => {
		const fetchShopItem = async () => {
			try {
				const data: ShopItem[] = await fetch("https://fakestoreapi.com/products").then(
					(res) => res.json()
				);

				console.log(data);

				const clothingData = data.filter(({ category }) => category === "men's clothing");

				return setShopItems(clothingData);
			} catch (error) {
				console.log(error);
				throw Error("Failed to fetch");
			}
		};

		fetchShopItem();
	}, []);

	console.log("Shop Items: ", shopItems);

	const addToCart = (item: ShopItem) => {
		setCart((prevCart) => [...prevCart, item]); // Add item to cart
	};

	console.log("Cart Items: ", cart);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-auto">
			{shopItems?.map(({ id, title, price, description, image, category }) => (
				<ItemCard
					key={id}
					value={{ title, price, description, image, category }}
					onAddToCart={() =>
						addToCart({ id, title, price, description, image, category })
					}
				/>
			))}
		</div>
	);
};

export default ShopPage;
