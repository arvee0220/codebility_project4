"use client";
import ItemCard from "@/components/ItemCard";
import { ShopItem } from "@/lib/types/types";
import { useEffect, useState } from "react";

const ShopPage: React.FC = () => {
	const [shopItems, setShopItems] = useState<ShopItem[] | null>(null);

	useEffect(() => {
		const fetchShopItem = async () => {
			try {
				const data: ShopItem[] = await fetch("https://fakestoreapi.com/products").then(
					(res) => res.json()
				);

				console.log(data);

				const clothingData = data.filter(
					({ category }) =>
						category === "men's clothing" || category === "women's clothing"
				);

				return setShopItems(clothingData);
			} catch (error) {
				console.log(error);
				throw Error("Failed to fetch");
			}
		};

		fetchShopItem();
	}, []);

	console.log("Shop Items: ", shopItems);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-auto">
			{shopItems?.map(({ id, title, price, description, image, category }) => (
				<ItemCard key={id} value={{ id, title, price, description, image, category }} />
			))}
		</div>
	);
};

export default ShopPage;
