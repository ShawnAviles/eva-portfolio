import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CloudinaryImage } from "../components/CloudinaryImage";
import { homeAssets } from "../data/homeAssets";

export default function Home() {
	return (
		<div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, ease: "backIn" }}
					>
						<h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary mb-6">
							Eva Aviles
						</h1>
						{/* <div className="flex justify-center items-center h-44 w-[2/3] bg-cover bg-center bg-brush-stroke-pattern mb-8"> */}
						<p className="text-4xl md:text-6xl text-sky-600 font-arizonia font-bold mb-8">
							Scenic Artist
						</p>
						{/* </div> */}
						<div className="flex gap-4">
							<Link to="/portfolio" className="btn btn-primary gap-2">
								View My Work
								<ArrowRight size={20} />
							</Link>
							<Link to="/contact" className="btn btn-outline">
								Get in Touch
							</Link>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="grid grid-cols-2 gap-4"
					>
						<div className="space-y-4">
							<CloudinaryImage
								image={homeAssets.image1}
								height={192}
								width={240}
								className="w-full h-48 object-cover rounded-lg"
							/>
							<CloudinaryImage
								image={homeAssets.image2}
								height={256}
								width={240}
								className="w-full h-64 object-cover rounded-lg"
							/>
						</div>
						<div className="pt-8">
							<CloudinaryImage
								image={homeAssets.image3}
								className="w-full h-80 object-cover rounded-lg"
							/>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
