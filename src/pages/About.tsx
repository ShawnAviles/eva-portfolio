import { motion } from "framer-motion";
import resume from "../assets/resume.pdf";
import { Palette, Hammer, Brush, FileSpreadsheet } from "lucide-react";
import { CloudinaryImage } from "../components/CloudinaryImage";
import { aboutAssets } from "../data/aboutAssets";

export default function About() {
	const experiences = [
		{
			year: "2023-Present",
			role: "Student Scenic Charge",
			company: "Montclair State University",
			description:
				"Led scenic painting and design execution for productions like 'Jesus Christ Superstar' and 'Sophisticated Ladies', collaborating with designers to bring artistic visions to life.",
		},
		{
			year: "2022-2023",
			role: "Scenic Painter",
			company: "Montclair State University",
			description:
				"Contributed to productions such as 'Pride & Prejudice', 'Marie Antoinette', and 'Spring Awakening', mastering diverse painting and texturing techniques.",
		},
		{
			year: "2021-2022",
			role: "ASM/PSM",
			company: "Black Box PAC & Montclair State University",
			description:
				"Stage managed operations for productions like 'The Curious Incident of the Dog in the Nighttime' and 'The Names We Gave Him (Premiere)'.",
		},
	];

	const skills = [
		{
			icon: <Brush className="w-6 h-6" />,
			title: "Scenic Painting",
			description:
				"Expertise in faux finishes, faux metal leafing, historic painting techniques, and texture creation.",
		},
		{
			icon: <Hammer className="w-6 h-6" />,
			title: "Carpentry & Construction",
			description:
				"Proficient in drop construction, industrial sewing, and subtractive sculpting.",
		},
		{
			icon: <Palette className="w-6 h-6" />,
			title: "Artistic Skills",
			description:
				"Skilled in color mixing, charcoal drawing, and digital photography.",
		},
		{
			icon: <FileSpreadsheet className="w-6 h-6" />,
			title: "Administrative Proficiency",
			description: "Experienced in financial tracking/budgeting.",
		},
	];

	return (
		<div className="min-h-screen">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<h1 className="fancy-title mb-6">About Me</h1>
				</motion.div>

				<div className="grid md:grid-cols-2 gap-12 mb-16">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<CloudinaryImage
							image={aboutAssets.image1}
							height={500}
							width={587}
							className="w-full h-[500px] object-cover rounded-lg shadow-lg"
						/>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="flex flex-col justify-center"
					>
						<h2 className="text-3xl font-caudex mb-6">My Journey</h2>
						<p className="text-gray-600 mb-6">
							Eva Aviles is a recent graduate from Montclair State University,
							where she earned a BFA in Theatre: Design, Technology, and
							Management with a focus in Stage Management and Scenic Painting.
							She has a strong passion for visual arts and loves to bring
							creative designs to life in theater, film, and themed
							environments.
						</p>
						<p className="text-gray-600 mb-6">
							During her studies, Eva honed her skills through various projects
							and gaining hands-on experience in painting sets of her peers
							design.
						</p>
						<p className="text-gray-600">
							Eva is based in the NJ/NYC area and is eager to start her
							professional journey in the scenic industry. She is always looking
							to contribute to innovative productions and continue to learn and
							grow as an artist.
						</p>
					</motion.div>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6 }}
					className="mb-16"
				>
					<h2 className="text-3xl font-caudex text-center mb-12">
						Skills & Expertise
					</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{skills.map((skill, index) => (
							<div
								key={index}
								className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
							>
								<div className="text-primary mb-4">{skill.icon}</div>
								<h3 className="font-caudex text-xl mb-2">{skill.title}</h3>
								<p className="text-gray-600">{skill.description}</p>
							</div>
						))}
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.8 }}
				>
					<div className="flex flex-col justify-center items-center mb-12">
						<h2 className="text-3xl font-caudex text-center mb-4">
							Experience
						</h2>
						<a
							className="btn btn-primary"
							href={resume}
							download="Eva_Aviles_Resume.pdf"
						>
							Download Resume
						</a>
					</div>
					<div className="space-y-8">
						{experiences.map((exp, index) => (
							<div
								key={index}
								className="flex flex-col md:flex-row items-start"
							>
								<div className="w-32 font-caudex flex-shrink-0 text-primary">
									{exp.year}
								</div>
								<div className="flex-grow">
									<h3 className="font-caudex text-xl mb-2">{exp.role}</h3>
									<p className="text-accent mb-2">{exp.company}</p>
									<p className="text-gray-600">{exp.description}</p>
								</div>
							</div>
						))}
					</div>
				</motion.div>
			</div>
		</div>
	);
}
