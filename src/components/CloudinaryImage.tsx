import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage, placeholder } from "@cloudinary/react";
import { cld } from "../lib/cloudinary";

interface CloudinaryImageProps extends React.HTMLAttributes<HTMLDivElement> {
	image: string;
	width?: number | null | string;
	height?: number | null | string;
}

export const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
	image,
	width = null,
	height = null,
	...props
}) => {
	let img;
	if (width === null || height === null) {
		img = cld.image(image).format("auto").quality("auto");
	} else {
		img = cld
			.image(image)
			.format("auto") // Optimize delivery by resizing and applying auto-format and auto-quality
			.quality("auto")
			.resize(auto().gravity(autoGravity()).width(width).height(height)); // Transform the image: auto-crop to square aspect_ratio
	}

	return (
		<AdvancedImage
			cldImg={img}
			plugins={[placeholder({ mode: "blur" })]}
			{...props}
		/>
	);
};
