// DEPRECATED APPROACH - Unused File
// Auto Generate Projects JSON from public directory of images when in dev mode
// This is a workaround to avoid hardcoding image paths in the projects data
// Switched to using Cloudinary for image hosting + CDN,
// see portfolio_assets.ts for more info

import { portfolioAssets } from "./portfolioAssets";
export interface Project {
	id: string; // name of folder
	title: string; // name of project formatted
	description: string;
	date: string; // month year
	year: string; // year or year range
	sortDate: string; // for sorting
	coverImage: string;
	images: Array<{
		src: string;
		url?: string;
		caption?: string;
	}>;
}

const monthToNumber = (month: string): number => {
	const months: { [key: string]: number } = {
		january: 0,
		february: 1,
		march: 2,
		april: 3,
		may: 4,
		june: 5,
		july: 6,
		august: 7,
		september: 8,
		october: 9,
		november: 10,
		december: 11,
	};
	return months[month.toLowerCase()] || 0;
};

const getDateFromString = (dateStr: string): Date => {
	if (!dateStr) return new Date(0); // for class-projects
	// if Semester and Year - default to end of semester
	if (dateStr.toLowerCase().includes("spring")) {
		const year = parseInt(dateStr.split(" ")[1]);
		return new Date(year, monthToNumber("may"), 31);
	}
	return new Date(dateStr);
};

const getProjectsDetail = (path: string) => {
	const parts = path.split("/");
	const projectId = parts[parts.length - 2].toLowerCase();

	// if not a project
	if (projectId === "class-projects") {
		const relativePathCover = path.replace("..", "./src");
		const relativePathImages = path.replace("..", "../src");
		return {
			projectId: "class-projects",
			projectTitle: "Class Projects",
			projectMonthYear: "", // not needed
			projectYear: "2021-2024",
			relativePathCover,
			relativePathImages,
		};
	}

	const projectName = parts[parts.length - 2];
	const projectIdDetails = projectName.split("-");
	const projectTitle = projectIdDetails
		.slice(0, projectIdDetails.length - 2)
		.join(" ");
	const projectMonthYear = projectIdDetails
		.slice(projectIdDetails.length - 2)
		.join(" ");
	const projectYear = projectIdDetails[projectIdDetails.length - 1];
	const relativePathCover = path.replace("..", "./src");
	const relativePathImages = path.replace("..", "../src");
	return {
		projectId,
		projectTitle,
		projectMonthYear,
		projectYear,
		relativePathCover,
		relativePathImages,
	};
};

// Update whenever
const additional: { [key: string]: { [key: string]: string } } = {
	"jesus-christ-superstar-fall-2024": {
		desc: "Scenic Charge",
		sortDate: "November,2024",
	},
	"sophisticated-ladies-spring-2024": {
		desc: "Scenic Charge",
		sortDate: "April,2024",
	},
	"spring-awakening-fall-2023": {
		desc: "Scenic Artist",
		sortDate: "November,2023",
	},
	"marie-antoinette-spring-2024": {
		desc: "Scenic Artist",
		sortDate: "March,2024",
	},
	"msu-haunted-house-fall-2024": {
		desc: "Scenic Artist",
		sortDate: "October,2024",
	},
	"pride-&-prejudice-fall-2024": {
		desc: "Scenic Artist",
		sortDate: "October,2024",
	},
	"anna-in-the-tropics-fall-2023": {
		desc: "Scenic Artist",
		sortDate: "October,2023",
	},
	"class-projects": {
		desc: "Projects completed while attending Montclair State University",
	},
};

export const generateImageUrls = async (): Promise<Project[]> => {
	const projectImages = import.meta.glob(
		"./../../public/assets/projects/**/*.{jpg,png,PNG,jpeg,webp}"
	);

	const projectsMap: { [key: string]: Project } = {};

	for (const path in projectImages) {
		await projectImages[path]();
		const {
			projectId,
			projectTitle,
			projectMonthYear,
			projectYear,
			relativePathCover,
			relativePathImages,
		} = getProjectsDetail(path);

		// create project if it doesn't exist
		if (!projectsMap[projectId]) {
			projectsMap[projectId] = {
				id: projectId,
				title: projectTitle,
				description: additional[projectId].desc || "",
				date: projectMonthYear,
				year: projectYear,
				sortDate: additional[projectId].sortDate || projectMonthYear,
				coverImage: relativePathCover,
				images: [],
			};
		}

		// add image to project
		projectsMap[projectId].images.push({
			src: relativePathImages,
			caption: "",
		});
	}

	const sortedProjects = Object.values(projectsMap).sort((a, b) => {
		if (a.id === "class-projects") return 1;
		if (b.id === "class-projects") return -1;
		return (
			getDateFromString(b.sortDate).getTime() -
			getDateFromString(a.sortDate).getTime()
		);
	});

	return Object.values(sortedProjects);
};

export const getProjects = async (): Promise<Project[]> => {
	if (import.meta.env.DEV) {
		const projects = await generateImageUrls();
		return projects;
	} else {
		return portfolioAssets;
	}
};
