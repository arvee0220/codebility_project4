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
	value: {
		id: number;
		title: string;
		price: number;
		description: string;
		image: string;
		category: string;
	};
}

// Cart Items
export interface CartItem {
	id: number;
	title: string;
	price: number;
	image: string;
	quantity: number;
}

export interface CartContextType {
	cartItems: CartItem[];
	addToCart: (item: CartItem) => void;
	removeFromCart: (id: number) => void;
	clearCartItem: (cartItemToClear: CartItem) => CartItem[];
	cartCount: number;
	cartTotal: number;
}
