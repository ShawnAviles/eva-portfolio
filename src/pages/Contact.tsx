import { motion } from "framer-motion";
import { Mail, MapPin, Send, Check } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { cn } from "../lib/utils";

const EMAIL = "evaavilesscenic@gmail.com";

// Define the form schema with Zod
const contactSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email("Invalid email address"),
	subject: z.string().min(1, "Subject is required"),
	message: z.string().min(1, "Message is required"),
});

const sendEmail = async (content: {
	name: string;
	email: string;
	subject: string;
	message: string;
}) => {
	try {
		await emailjs.send(
			import.meta.env.VITE_EMAILJS_SERVICE_ID,
			import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
			content,
			{
				publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
			}
		);
	} catch (error) {
		console.error("Error sending email:", error);
	}
};

export default function Contact() {
	const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">(
		"idle"
	);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormStatus("sending");
		// Simulate form submission
		const form = e.currentTarget;
		const formData = new FormData(form);

		// Convert FormData to a plain object
		const data = Object.fromEntries(formData.entries());

		try {
			// Validate the data
			const validatedData = contactSchema.parse(data);
			await sendEmail(validatedData);
			form.reset();
			setFormStatus("sent");
		} catch (error) {
			if (error instanceof z.ZodError) {
				// Handle validation errors
				const errorMessages = error.errors.map(
					(err) => `${err.path}: ${err.message}`
				);
				alert(
					`Please fix your inputs and try again:\n${errorMessages.join("\n")}`
				);
			} else {
				console.error("Error:", error);
			}
		}
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
									name="name"
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
									name="email"
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
									name="subject"
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
									name="message"
									required
									rows={6}
									className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
								></textarea>
							</div>

							<button
								type="submit"
								disabled={formStatus !== "idle"}
								className={cn(
									"btn btn-primary w-full flex items-center justify-center gap-2",
									formStatus === "sent" && "bg-green-500"
								)}
							>
								{formStatus === "idle" && (
									<>
										<Send size={20} />
										Send Message
									</>
								)}
								{formStatus === "sending" && "Sending..."}
								{formStatus === "sent" && <>Message Sent!</>}
							</button>
						</form>

						{formStatus === "sent" && (
							<div className="flex items-center justify-center pt-4 text-green-700">
								Successfully Sent Message!
								<Check size={20} />
							</div>
						)}
					</motion.div>
				</div>
			</div>
		</div>
	);
}
