import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import SelfAligningImage from "../../../shared/components/SelfAligningImage";

function LoadImage(props) {
	const {post, onDelete} = props;
	const [src, setSrc] = useState("");
	
	const dynLoadImage = useCallback(() => {
		post.importImage.then((mod) => {
			setSrc(mod.default);
		});
	}, [post.importImage, setSrc]);
	
	useEffect(() => {
		dynLoadImage();
	}, [dynLoadImage]);
	
	return (
		<SelfAligningImage
			src={src}
			title={post.name}
			timeStamp={post.timestamp}
			options={[
				{
					name: "Delete",
					onClick: onDelete,
					icon: <DeleteIcon />,
				},
			]}
		/>
	);
}

LoadImage.propTypes = {
	post: PropTypes.object.isRequired,
	onDelete: PropTypes.func.isRequired,
};

export default LoadImage;
