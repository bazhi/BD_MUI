import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';

import SelfAligningImage from "shared/components/SelfAligningImage";

function LoadImage(props) {
	const {post, onDelete, onEdit} = props;
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
			id={""+post.id}
			timeStamp={post.timestamp}
			options={[
				{
					name: "Edit",
					onClick: onEdit,
					icon: <EditIcon />,
				},
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
	onEdit: PropTypes.func.isRequired,
};

export default LoadImage;
