import React from "react";
import { PropsWithChildren } from "react";

const ShopLayout: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-1 container mx-auto p-4">{children}</main>
		</div>
	);
};

export default ShopLayout;
