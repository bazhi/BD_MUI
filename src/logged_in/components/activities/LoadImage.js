import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';

import SelfAligningImage from "shared/components/SelfAligningImage";

function LoadImage(props) {
	const {item, onDelete, onEdit} = props;
	const [src, setSrc] = useState("");
	
	const dynLoadImage = useCallback(() => {
		item.importImage.then((mod) => {
			setSrc(mod.default);
		});
	}, [item.importImage, setSrc]);
	
	useEffect(() => {
		dynLoadImage();
	}, [dynLoadImage]);
	
	return (
		<SelfAligningImage
			src={src}
			title={item.name}
			id={""+item.id}
			timeStamp={item.timestamp}
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
	item: PropTypes.object.isRequired,
	onDelete: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
};

export default LoadImage;
