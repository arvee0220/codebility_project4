"use client";
import { ShopItem } from "@/lib/types/types";
import Image from "next/image";
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
		<div className="relative grid grid-cols-3 gap-2 my-auto">
			{shopItems?.map(({ id, title, price, description, image }) => (
				<div
					key={id}
					className="h-[300px] w-[200px] flex flex-col justify-center items-center"
				>
					<div className="h-[200px] w-[100px] relative">
						<Image
							src={image}
							alt="Item Image"
							fill
							priority
							sizes="(max-width: 300px) 100vw, 300px"
							className="object-fill"
						/>
					</div>
					<h2>{title}</h2>
					<p className="overflow-scroll">{description}</p>
					<p>{price}</p>
					<button>Add To Cart</button>
				</div>
			))}
		</div>
	);
};

export default ShopPage;
