"use client";
import { useState, useEffect } from "react";
import { lightLogo, darkLogo } from "@/lib/constants/images";
import Image from "next/image";
import { Switch } from "./ui/switch";
import { NavItem } from "@/lib/types/types";
import { MenuIcon, ShoppingCartIcon, X } from "lucide-react";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "./ui/navigation-menu";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from "./ui/dropdown-menu";

import { Button } from "./ui/button";
import { useCart } from "@/lib/context/CartContext";

const navItems: NavItem[] = [
	{
		text: "Shop",
		categories: [
			{ category: "All", href: "/shop" },
			{ category: "Men", href: "/shop/men" },
			{ category: "Women", href: "/shop/women" },
		],
	},
	{ text: "About", href: "/about" },
	{ text: "Contact", href: "/contact" },
];

export default function NavBar() {
	const [theme, setTheme] = useState<boolean>(false);
	const [hasScrolled, setHasScrolled] = useState<boolean>(false);
	const [toggleMenu, setToggleMenu] = useState<boolean>(false);
	const [openSubMenus, setOpenSubMenus] = useState<number[]>([]);

	const { cartItems } = useCart();

	// Add shadow effect on navbar once page is scrolled
	useEffect(() => {
		const handleScroll = () => {
			// Check if the scroll position is greater than 0
			if (window.scrollY > 0) {
				setHasScrolled(true);
			} else {
				setHasScrolled(false);
			}
		};
		window.addEventListener("scroll", handleScroll);

		// Clean up event listener on component unmount
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const toggleTheme = () => {
		setTheme(!theme);

		if (theme) {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		} else {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		}
	};

	useEffect(() => {
		const storedTheme = localStorage.getItem("theme");
		if (storedTheme === "dark") {
			document.documentElement.classList.add("dark");
			setTheme(true);
		}
	}, []);

	const menuToggler = () => {
		setToggleMenu(!toggleMenu);
	};

	const toggleSubMenu = (index: number) => {
		// Toggle submenu visibility by updating the openSubMenus array
		if (openSubMenus.includes(index)) {
			setOpenSubMenus(openSubMenus.filter((i) => i !== index));
		} else {
			setOpenSubMenus([...openSubMenus, index]);
		}
	};

	return (
		<section
			className={`w-full top-0 fixed flex flex-col justify-center items-center bg-background ${
				hasScrolled ? "shadow-lg bg-background" : "bg-background/0"
			} z-10`}
		>
			<div className="w-11/12 h-28 flex justify-between items-center gap-4">
				{/* Brand Logo */}
				<div className="relative w-40 h-28 flex justify-center items-center">
					<Link href="/">
						<Image
							src={theme ? darkLogo : lightLogo}
							alt="Brand Logo"
							fill
							className="object-contain"
						/>
					</Link>
				</div>

				{/* Larger viewport */}

				<NavigationMenu className="hidden md:flex justify-between items-center w-2/6 max-w-screen-[400px] gap-4">
					<NavigationMenuList className="w-4/6 flex justify-evenly items-center gap-4 flex-shrink-0">
						{navItems.map(({ text, categories, href }, idx) => (
							<NavigationMenuItem
								key={idx}
								className="flex justify-center items-center gap-4"
							>
								{categories ? (
									<NavigationMenuTrigger>{text}</NavigationMenuTrigger>
								) : href ? (
									<Link href={href} legacyBehavior passHref>
										<NavigationMenuLink className="text-center">
											{text}
										</NavigationMenuLink>
									</Link>
								) : null}

								{categories && (
									<NavigationMenuContent>
										<ul className="grid w-[400px] gap-3 p-4 md:w-[200px] md:grid-cols-1 lg:w-[300px]">
											{categories.map(({ category, href }, idx) => (
												<li key={idx}>
													<Link href={href}>{category}</Link>
												</li>
											))}
										</ul>
									</NavigationMenuContent>
								)}
							</NavigationMenuItem>
						))}
					</NavigationMenuList>

					{/* Theme */}
					<div className="flex justify-evenly items-center min-w-24 max-w-32">
						<Switch onCheckedChange={toggleTheme} checked={theme} />

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<ShoppingCartIcon />
							</DropdownMenuTrigger>

							<DropdownMenuContent className="w-[400px] mr-14">
								<DropdownMenuLabel>My Cart</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup className="overflow-y-scroll">
									{cartItems.length === 0 ? (
										<p className="p-2">Your cart is empty</p>
									) : (
										cartItems.map((item) => (
											<div key={item.id} className="p-2">
												<div className="flex justify-between">
													<Image
														src={item.image}
														alt={item.title}
														width={40}
														height={40}
														className="rounded-sm"
													/>
													<p className="text-xs">{item.title}</p>
													<p className="text-xs">${item.price}</p>
												</div>
												<div className="text-xs">{item.quantity}</div>
											</div>
										))
									)}
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<Button className="w-full">Checkout</Button>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</NavigationMenu>

				<div className="md:hidden flex gap-4">
					<Switch onCheckedChange={toggleTheme} checked={theme} />
					{/* Menu toggler */}
					{toggleMenu === true ? (
						<X onClick={menuToggler} />
					) : (
						<MenuIcon onClick={menuToggler} />
					)}

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<ShoppingCartIcon />
						</DropdownMenuTrigger>

						<DropdownMenuContent className="w-[350px] mr-4">
							<DropdownMenuLabel>My Cart</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup className="overflow-y-scroll">
								{cartItems.length === 0 ? (
									<p className="p-2">Your cart is empty</p>
								) : (
									cartItems.map((item) => (
										<div key={item.id} className="p-2">
											<div className="flex justify-between">
												<div className="flex justify-start">
													<Image
														src={item.image}
														alt={item.title}
														width={40}
														height={40}
														className="rounded-sm"
													/>
													<p className="text-xs">{item.title}</p>
												</div>
												<p className="text-xs">${item.price}</p>
											</div>

											<div className="text-xs">{item.quantity}</div>
										</div>
									))
								)}
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<Button className="w-full">Checkout</Button>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				{/* Cart icon */}
			</div>
			{/* Mobile Menu */}
			{toggleMenu && (
				<div className="block w-11/12 md:hidden overflow-hidden bg-background">
					<ul className="w-full flex flex-col justify-evenly items-start p-4 gap-4">
						{navItems.map(({ text, categories, href }, idx) => (
							<li key={idx} className="w-full">
								{/* Main link or toggle categories */}
								{categories ? (
									<div
										className="flex justify-between w-full"
										onClick={() => toggleSubMenu(idx)}
									>
										<p className="text-lg font-medium cursor-pointer">{text}</p>
										{/* Indicate if submenu is open */}
										{openSubMenus.includes(idx) ? (
											<X size={16} />
										) : (
											<MenuIcon size={16} />
										)}
									</div>
								) : (
									<Link href={href || "#"} className="text-lg font-medium">
										{text}
									</Link>
								)}

								{/* Toggle subcategories */}
								{categories && openSubMenus.includes(idx) && (
									<ul className="flex flex-col gap-2 pl-4">
										{categories.map(({ category, href }, idx) => (
											<li key={idx}>
												<Link href={href} className="text-sm">
													{category}
												</Link>
											</li>
										))}
									</ul>
								)}
							</li>
						))}
					</ul>
				</div>
			)}
		</section>
	);
}
