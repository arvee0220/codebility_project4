export type NavItem = {
	text: string;
	href?: string;
	categories?: Category[];
};

export type Category = {
	category: string;
	href: string;
};
