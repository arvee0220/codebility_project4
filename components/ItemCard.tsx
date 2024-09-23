// components/ItemCard.tsx

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ItemCardProps } from "@/lib/types/types";

const ItemCard: React.FC<ItemCardProps> = ({
	value: { title, price, description, image, category },
}) => {
	return (
		<Card className="h-[400px] w-[300px] flex flex-col justify-between">
			<div className="h-[200px] w-[100%] relative">
				<Image
					src={image}
					alt="Item Image"
					fill
					priority
					sizes="(max-width: 300px) 100vw, 300px"
					className="object-fill"
				/>
			</div>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription className="overflow-hidden">{description}</CardDescription>
				<p>{price}</p>
			</CardContent>
			<CardFooter>
				<button>Add To Cart</button>
			</CardFooter>
			<h3>{category}</h3>
		</Card>
	);
};

export default ItemCard;
