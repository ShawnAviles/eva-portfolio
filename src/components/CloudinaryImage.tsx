import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";

interface CloudinaryImageProps {
	image: string;
}

const cld = new Cloudinary({
	cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME },
});

const CloudinaryImage: React.FC<CloudinaryImageProps> = ({ image }) => {
	const img = cld
		.image(image)
		.format("auto") // Optimize delivery by resizing and applying auto-format and auto-quality
		.quality("auto")
		.resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio

	return <AdvancedImage cldImg={img} />;
};

export default CloudinaryImage;
