import React, { Fragment, useCallback, useState } from "react";
import { Typography, withStyles } from "@material-ui/core";
import Dropzone from "shared/components/Dropzone";
import PropTypes from "prop-types";
import ImageCropperDialog from "shared/components/ImageCropperDialog";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({

});

function ImageUpload(props) {
	const {width, name, classes} = props;
	
	const [imageFile, setImageFile] = useState(null);
	const [cropperFile, setCropperFile] = useState(null);
	
	const onCropperClose = useCallback(() => {
		setCropperFile(null);
	}, [setCropperFile]);
	
	const acceptDrop = useCallback((file) => {
		setImageFile(file);
	}, [setImageFile]);
	
	const onCrop = useCallback((dataUrl) => {
		const file = {...cropperFile};
		file.preview = dataUrl;
		acceptDrop(file);
		setCropperFile(null);
	}, [acceptDrop, cropperFile, setCropperFile]);
	
	const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
		const file = acceptedFiles[0];
		file.preview = URL.createObjectURL(file);
		file.key = new Date().getTime();
		setCropperFile(file);
	}, []);
	
	return (
		<Paper variant="outlined" >
			<ImageCropperDialog
				open={!!cropperFile}
				src={cropperFile ? cropperFile.preview : ""}
				onCrop={onCrop}
				onClose={onCropperClose}
				aspectRatio={1}
			/>
			<Dropzone onDrop={onDrop} accept="image/png, image/jpeg" style={{
				width: width ? width : 100,
				height: width ? width : 100,
			}}>
				{
					imageFile && (<img
						alt="uploaded item"
						src={imageFile.preview}
						border={1}
					/>)
				}
				{
					!imageFile && (
						<Typography>
							{name}
						</Typography>
					)
				}
			</Dropzone>
		</Paper>
	);
}

ImageUpload.propTypes = {
	theme: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	width: PropTypes.number,
	name: PropTypes.string,
}

export default withStyles(styles, {withTheme: true})(ImageUpload);
