import { motion } from "framer-motion";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Layout() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const location = useLocation();

	const navigation = [
		{ name: "Home", href: "/" },
		{ name: "About", href: "/about" },
		{ name: "Portfolio", href: "/portfolio" },
		{ name: "Contact", href: "/contact" },
	];

	return (
		<div className="min-h-screen bg-sky-100">
			<nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex-shrink-0 flex items-center">
							<Link to="/" className="font-serif text-2xl text-primary">
								Eva Aviles
							</Link>
						</div>

						{/* Desktop Navigation */}
						<div className="hidden md:flex items-center space-x-8">
							{navigation.map((item) => (
								<Link
									key={item.name}
									to={item.href}
									className={`${
										location.pathname === item.href
											? "text-secondary"
											: "text-primary hover:text-accent"
									} transition-colors duration-200`}
								>
									{item.name}
								</Link>
							))}
						</div>

						{/* Mobile Navigation Button */}
						<div className="md:hidden flex items-center">
							<button
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								className="text-primary p-2"
							>
								{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
							</button>
						</div>
					</div>
				</div>

				{/* Mobile Navigation Menu */}
				{isMenuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className="md:hidden"
					>
						<div className="px-2 pt-2 pb-3 space-y-1 bg-white/80 backdrop-blur-sm">
							{navigation.map((item) => (
								<Link
									key={item.name}
									to={item.href}
									className={`${
										location.pathname === item.href
											? "text-secondary"
											: "text-primary hover:text-accent"
									} block px-3 py-2 text-base font-medium transition-colors duration-200`}
									onClick={() => setIsMenuOpen(false)}
								>
									{item.name}
								</Link>
							))}
						</div>
					</motion.div>
				)}
			</nav>

			<main className="pt-16">
				<Outlet />
			</main>

			<footer className="bg-primary text-white py-8 mt-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<p className="font-serif text-xl mb-2">Eva Aviles</p>
						<p className="text-sm text-gray-400">Scenic Artist</p>
						<p className="text-sm text-gray-400 mt-4">
							© {new Date().getFullYear()} All rights reserved
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
