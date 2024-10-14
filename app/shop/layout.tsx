import React from "react";
import { PropsWithChildren } from "react";

const ShopLayout: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="h-full flex flex-col">
			<main className="w-11/12 h-full flex justify-center items-start container mx-auto  mt-28 p-4">
				{children}
			</main>
		</div>
	);
};

export default ShopLayout;
