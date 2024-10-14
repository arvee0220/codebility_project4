// components/ItemCard.tsx

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { ItemCardProps } from "@/lib/types/types";
import { Button } from "./ui/button";

const ItemCard: React.FC<ItemCardProps> = ({ value: { title, price, description, image } }) => {
	return (
		<Card className="h-[380px] w-[300px] flex flex-col">
			<CardHeader className="h-[220px]">
				<div className="h-[150px] w-[100%] relative">
					<Image
						src={image}
						alt="Item Image"
						fill
						priority
						sizes="(max-width: 300px) 100vw, 300px"
						className="object-fill rounded-md"
					/>
				</div>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				<CardDescription className="h-[60px] scrollbar overflow-y-scroll overflow-x-hidden mt-4">
					{description}
				</CardDescription>
				<p>{price}</p>
				<Button className="w-full" size={"sm"}>
					Add To Cart
				</Button>
			</CardContent>
		</Card>
	);
};

export default ItemCard;
