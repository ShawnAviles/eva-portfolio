import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import homeImage1 from "../assets/home/home_1.jpg";
import homeImage2 from "../assets/home/home_2.jpeg";
import homeImage3 from "../assets/home/home_3.jpeg";

export default function Home() {
	return (
		<div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
					>
						<h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary mb-6">
							Eva Aviles
						</h1>
						{/* <div className="flex justify-center items-center h-44 w-[2/3] bg-cover bg-center bg-brush-stroke-pattern mb-8"> */}
						<p className="text-4xl md:text-6xl text-sky-600 font-arizonia font-bold mb-8">
							Scenic Artist
						</p>
						{/* </div> */}
						<p className="text-gray-600 mb-8 max-w-lg">
							Transforming spaces into captivating visual stories through the
							art of scenic design. With a passion for creating immersive
							environments that bring productions to life.
						</p>
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
							<img
								src={homeImage1}
								alt="Profile Picture 1"
								className="w-full h-48 object-cover rounded-lg"
							/>
							<img
								src={homeImage2}
								alt="Profile Picuture 2"
								className="w-full h-64 object-cover rounded-lg"
							/>
						</div>
						<div className="pt-8">
							<img
								src={homeImage3}
								alt="Profile Picture 3"
								className="w-full h-80 object-cover rounded-lg"
							/>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
