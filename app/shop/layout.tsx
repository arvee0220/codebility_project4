import React from "react";
import { PropsWithChildren } from "react";

const ShopLayout: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="min-h-screen flex flex-col">
			<main className="w-11/12 h-full flex flex-auto container mx-auto  my-auto p-4">
				{children}
			</main>
		</div>
	);
};

export default ShopLayout;
