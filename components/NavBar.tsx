"use client";
import { useState, useEffect } from "react";
import { lightLogo, darkLogo } from "@/lib/constants/images";
import Image from "next/image";
import { Switch } from "./ui/switch";
import { NavItem } from "@/lib/types/types";

const navItems: NavItem[] = [{ text: "Shop" }, { text: "About" }, { text: "Contact" }];

export default function NavBar() {
	const [theme, setTheme] = useState<boolean>(false);
	const [hasScrolled, setHasScrolled] = useState<boolean>(false);
	// const [toggleMenu, setToggleMenu] = useState<boolean>(false); for smaller device

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

	return (
		<section
			className={`w-full top-0 sticky flex justify-center items-center ${
				hasScrolled ? "shadow-lg" : ""
			}`}
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
				<div className="w-2/6 flex justify-evenly items-center">
					<ul className="w-4/6 flex justify-evenly items-center">
						{navItems.map(({ text }, idx) => (
							<li key={idx}>{text}</li>
						))}
					</ul>

					{/* Theme */}
					<Switch onCheckedChange={toggleTheme} checked={theme} />
				</div>
			</div>
		</section>
	);
}
