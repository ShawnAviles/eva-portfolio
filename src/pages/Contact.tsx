import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";

const EMAIL = "evaavilesscenic@gmail.com";

export default function Contact() {
	const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">(
		"idle"
	);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setFormStatus("sending");
		// Simulate form submission
		setTimeout(() => {
			setFormStatus("sent");
		}, 1500);
	};

	return (
		<div className="min-h-screen bg-sky-100">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<h1 className="fancy-title mb-6">Get in Touch</h1>
				</motion.div>

				<div className="grid md:grid-cols-3 gap-12">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<h2 className="text-2xl font-caudex mb-8">Contact Information</h2>

						<div className="space-y-6 mb-8">
							<div className="flex items-center gap-4">
								<Mail className="w-5 h-5 text-primary" />
								<div>
									<p className="font-caudex">Email</p>
									<a
										href={`mailto:${EMAIL}`}
										className="text-accent hover:text-primary transition-colors"
									>
										{EMAIL}
									</a>
								</div>
							</div>

							<div className="flex items-center gap-4">
								<MapPin className="w-5 h-5 text-primary" />
								<div>
									<p className="font-caudex">Location</p>
									<p className="text-gray-600">NYC Metropolitan Area</p>
								</div>
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="md:col-span-2"
					>
						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<label htmlFor="name" className="block font-caudex mb-2">
									Name
								</label>
								<input
									type="text"
									id="name"
									required
									className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
								/>
							</div>

							<div>
								<label htmlFor="email" className="block font-caudex mb-2">
									Email
								</label>
								<input
									type="email"
									id="email"
									required
									className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
								/>
							</div>

							<div>
								<label htmlFor="subject" className="block font-caudex mb-2">
									Subject
								</label>
								<input
									type="text"
									id="subject"
									required
									className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
								/>
							</div>

							<div>
								<label htmlFor="message" className="block font-caudex mb-2">
									Message
								</label>
								<textarea
									id="message"
									required
									rows={6}
									className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
								></textarea>
							</div>

							<button
								type="submit"
								disabled={formStatus !== "idle"}
								className="btn btn-primary w-full flex items-center justify-center gap-2"
							>
								{formStatus === "idle" && (
									<>
										<Send size={20} />
										Send Message
									</>
								)}
								{formStatus === "sending" && "Sending..."}
								{formStatus === "sent" && "Message Sent!"}
							</button>
						</form>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
