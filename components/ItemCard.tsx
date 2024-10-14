// components/ItemCard.tsx

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { ItemCardProps } from "@/lib/types/types";
import { Button } from "./ui/button";
import Link from "next/link";
import { useCart } from "@/lib/context/CartContext";

const ItemCard: React.FC<ItemCardProps> = ({ value: { id, title, price, description, image } }) => {
	const { addToCart } = useCart();

	const handleAddToCart = () => {
		addToCart({ id, title, price, image });
	};

	return (
		<Card className="h-[380px] w-[300px] flex flex-col">
			<Link href={"/itemDetails"} className="rounded-md">
				<CardHeader className="h-[220px]">
					<div className="h-[150px] w-[100%] relative">
						<Image
							src={image}
							alt="Item Image"
							fill
							priority
							sizes="(max-width: 300px) 100vw, 300px"
							className="rounded-md"
						/>
					</div>
					<CardTitle>{title}</CardTitle>
				</CardHeader>
			</Link>
			<CardContent className="flex flex-col gap-2">
				<CardDescription className="h-[60px] scrollbar overflow-y-scroll overflow-x-hidden mt-4">
					{description}
				</CardDescription>
				<p>{price}</p>
				<Button className="w-full" size={"sm"} onClick={handleAddToCart}>
					Add To Cart
				</Button>
			</CardContent>
		</Card>
	);
};

export default ItemCard;
