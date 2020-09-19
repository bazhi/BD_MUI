import React from "react";
import PropTypes from "prop-types";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';

import SelfAligningImage from "shared/components/SelfAligningImage";

function LoadImage(props) {
	const {item, onDelete, onEdit} = props;

	return (
		<SelfAligningImage
			src={item.image}
			title={item.name}
			id={"" + item.id}
			options={[
				{
					name: "Edit",
					onClick: onEdit,
					icon: <EditIcon/>,
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
