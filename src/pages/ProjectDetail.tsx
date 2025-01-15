import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { portfolioAssets as projects } from "../data/portfolio_assets";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { CloudinaryImage } from "../components/CloudinaryImage";
import { cldToUrl } from "../lib/cloudinary";

export default function ProjectDetail() {
	const { id } = useParams();
	const [isOpen, setIsOpen] = useState(false);
	const [photoIndex, setPhotoIndex] = useState(0);

	const project = projects.find((p) => p.id === id);

	if (!project) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-serif mb-4">Project not found</h2>
					<Link to="/portfolio" className="text-sky-600 hover:text-sky-700">
						Return to Portfolio
					</Link>
				</div>
			</div>
		);
	}

	const slides = project.images.map((image) => {
		return {
			src: image.src ? cldToUrl(image.src) : "",
			alt: image.caption || "",
			description: image.caption || "",
		};
	});

	return (
		<div className="min-h-screen">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6 }}
				>
					<Link
						to="/portfolio"
						className="inline-flex items-center text-sky-600 hover:text-sky-700 mb-8"
					>
						<ArrowLeft size={20} className="mr-2" />
						Back to Portfolio
					</Link>

					<h1 className="font-serif text-4xl text-primary mb-4">
						{project.title}
					</h1>
					<p className="text-gray-600 max-w-3xl mb-2 text-xl">
						{project.description}
					</p>
					<p className="text-gray-600 max-w-3xl mb-12 italic">{project.date}</p>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{project.images.map((image, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								className="cursor-pointer group relative"
								onClick={() => {
									setPhotoIndex(index);
									setIsOpen(true);
								}}
							>
								<CloudinaryImage
									image={image.src}
									width={384}
									height={288}
									className="w-full h-72 object-cover rounded-lg transition-all duration-300 group-hover:scale-105 hover:brightness-50"
								/>
								{image.caption && (
									<p className="text-white text-center px-4">{image.caption}</p>
								)}
							</motion.div>
						))}
					</div>
				</motion.div>

				<Lightbox
					open={isOpen}
					close={() => setIsOpen(false)}
					index={photoIndex}
					slides={slides}
				/>
			</div>
		</div>
	);
}
