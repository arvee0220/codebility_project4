"use client";
import { useState, useEffect } from "react";
import { lightLogo, darkLogo } from "@/lib/constants/images";
import Image from "next/image";
import { Switch } from "./ui/switch";
import { NavItem } from "@/lib/types/types";
import { MenuIcon, X } from "lucide-react";

const navItems: NavItem[] = [
	{ text: "Shop", href: "/shop" },
	{ text: "About", href: "/about" },
	{ text: "Contact", href: "/contact" },
];

export default function NavBar() {
	const [theme, setTheme] = useState<boolean>(false);
	const [hasScrolled, setHasScrolled] = useState<boolean>(false);
	const [toggleMenu, setToggleMenu] = useState<boolean>(false);

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

	const menuToggler = () => {
		setToggleMenu(!toggleMenu);
	};

	useEffect(() => {
		const storedTheme = localStorage.getItem("theme");
		if (storedTheme === "dark") {
			document.documentElement.classList.add("dark");
			setTheme(true);
		}
	}, []);

	return (
		<section
			className={`w-full top-0 fixed flex flex-col justify-center items-center bg-background ${
				hasScrolled ? "shadow-lg" : ""
			} z-10`}
		>
			<div className="w-11/12 h-28 flex justify-between items-center">
				<div className="relative w-40 h-28 flex justify-center items-center">
					<Image
						src={theme ? darkLogo : lightLogo}
						alt="Brand Logo"
						fill
						className="object-contain"
					/>
				</div>

				{/* Larger viewport */}
				<div className="hidden w-2/6 md:flex justify-evenly items-center">
					<ul className="w-4/6 flex justify-evenly items-center">
						{navItems.map(({ text }, idx) => (
							<li key={idx}>{text}</li>
						))}
					</ul>

					{/* Theme */}
					<Switch onCheckedChange={toggleTheme} checked={theme} />
				</div>

				<div className="md:hidden flex gap-4">
					<Switch onCheckedChange={toggleTheme} checked={theme} />
					{/* Menu toggler */}
					{toggleMenu === true ? (
						<X onClick={menuToggler} />
					) : (
						<MenuIcon onClick={menuToggler} />
					)}
				</div>
			</div>
			{/* Mobile */}
			{toggleMenu && (
				<div className="block w-11/12 md:hidden overflow-hidden">
					<ul className="w-full flex flex-col justify-evenly items-start p-4 gap-4">
						{navItems.map(({ text }, idx) => (
							<li key={idx}>{text}</li>
						))}
					</ul>
				</div>
			)}
		</section>
	);
}
