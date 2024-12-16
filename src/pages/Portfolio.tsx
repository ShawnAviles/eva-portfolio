import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { useState, useEffect } from "react";
import { Project, getProjects } from "../data/projects";

export default function Portfolio() {
	const [projects, setProjects] = useState<Project[]>([]);

	useEffect(() => {
		const fetchProject = async () => {
			const generated = await getProjects();
			console.log(generated);
			setProjects(generated);
		};
		fetchProject();
	}, []);

	return (
		<div className="min-h-screen">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">
						Portfolio
					</h1>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{projects.map((project) => (
						<ProjectCard
							key={project.id}
							id={project.id}
							title={project.title}
							image={project.coverImage}
							year={project.year}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
