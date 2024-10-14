export type NavItem = {
	text: string;
	href?: string;
	categories?: Category[];
};

export type Category = {
	category: string;
	href: string;
};

export interface ShopItem {
	id: number;
	title: string;
	price: number;
	description: string;
	image: string;
	category: string;
}

export interface ItemCardProps {
	value: { title: string; price: number; description: string; image: string; category: string };
	onAddToCart: () => void;
}

// Cart Items
export interface CartItem {
	id: number;
	title: string;
	price: number;
	image: string;
}

export interface CartContextType {
	cartItems: CartItem[];
	addToCart: (item: CartItem) => void;
	removeFromCart: (id: number) => void;
}
