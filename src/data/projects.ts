export interface Project {
	id: string; // name of folder
	title: string; // name of project formatted
	description: string;
	date: string; // month year
	year: string; // year or year range
	coverImage: string;
	images: Array<{
		src: string;
		caption: string;
	}>;
}

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
const description: { [key: string]: string } = {
	"jesus-christ-superstar-fall-2024": "Scenic Charge",
	"sophisticated-ladies-spring-2024": "Scenic Charge",
	"spring-awakening-fall-2023": "Scenic Artist",
	"marie-antoinette-spring-2024": "Scenic Artist",
	"msu-haunted-house-fall-2024": "Scenic Artist",
	"pride-&-prejudice-fall-2024": "Scenic Artist",
	"anna-in-the-tropics-fall-2023": "Scenic Artist",
	"class-projects":
		"Projects completed while attending Montclair State University",
};

export const generateImageUrls = async (): Promise<Project[]> => {
	const projectImages = import.meta.glob(
		"./../assets/projects/**/*.{jpg,png,PNG,jpeg,webp}"
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
				description: description[projectId] || "",
				date: projectMonthYear,
				year: projectYear,
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
	console.log(projectsMap);
	return Object.values(projectsMap);
};
