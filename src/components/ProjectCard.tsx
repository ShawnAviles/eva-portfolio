import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
	id: string;
	title: string;
	image: string;
	year: string;
}

export default function ProjectCard({
	id,
	title,
	image,
	year,
}: ProjectCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="group relative overflow-hidden rounded-xl"
		>
			<Link to={`/portfolio/${id}`}>
				<img
					loading="lazy"
					src={image}
					alt={title}
					className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
					<div className="absolute bottom-0 left-0 right-0 p-6">
						<h3 className="text-white text-xl font-serif">{title}</h3>
						<p className="text-white text-sm italic mb-2">{year}</p>
						<p className="inline-flex items-center gap-2 text-white hover:text-sky-200 transition-colors">
							<Eye size={20} />
							View More
						</p>
					</div>
				</div>
			</Link>
		</motion.div>
	);
}
